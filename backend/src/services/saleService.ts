import prisma from "../config/prisma";

export const createSale = async (
  customerId: number,
  createdById: number,
  items: {
    productId: number;
    quantity: number;
  }[]
) => {
  return await prisma.$transaction(async (tx) => {
    let totalAmount = 0;

    const saleItems: {
      productId: number;
      quantity: number;
      price: number;
    }[] = [];

    for (const item of items) {
      const product = await tx.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        throw new Error("Product not found");
      }

      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      totalAmount += product.price * item.quantity;

      saleItems.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      });

      await tx.product.update({
        where: { id: product.id },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    const sale = await tx.sale.create({
      data: {
        customerId,
        createdById,
        totalAmount,
        status: "Confirmed",
        items: {
          create: saleItems,
        },
      },
      include: {
        customer: true,
        createdBy: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    return sale;
  });
};

export const getSales = async () => {
  return await prisma.sale.findMany({
    include: {
      customer: true,
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};