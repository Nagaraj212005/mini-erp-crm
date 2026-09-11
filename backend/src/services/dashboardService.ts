import prisma from "../config/prisma";

export const getSummary = async () => {
  const totalCustomers = await prisma.customer.count();

  const activeCustomers = await prisma.customer.count({
    where: {
      status: "Active",
    },
  });

  const totalProducts = await prisma.product.count();

  const lowStockProducts = await prisma.product.count({
    where: {
      stock: {
        lte: 10,
      },
    },
  });

  const totalSales = await prisma.sale.count();

  const revenue = await prisma.sale.aggregate({
    _sum: {
      totalAmount: true,
    },
  });

  return {
    totalCustomers,
    activeCustomers,
    totalProducts,
    lowStockProducts,
    totalSales,
    totalRevenue: revenue._sum.totalAmount || 0,
  };
};

export const getRecentSales = async () => {
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
    take: 5,
  });
};

export const getLowStockProducts = async () => {
  return await prisma.product.findMany({
    where: {
      stock: {
        lte: 10,
      },
    },
    orderBy: {
      stock: "asc",
    },
  });
};

export const getMonthlySales = async () => {
  return await prisma.sale.findMany({
    select: {
      id: true,
      totalAmount: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};