import prisma from "../config/prisma";

export const createProduct = async (data: {
  name: string;
  description?: string;
  sku?: string;
  category?: string;
  price: number;
  stock: number;
  minStock?: number;
  warehouse?: string;
}) => {
  return await prisma.product.create({
    data,
  });
};

export const getAllProducts = async () => {
  return await prisma.product.findMany({
    orderBy: {
      id: "asc",
    },
  });
};

export const getProductById = async (id: number) => {
  return await prisma.product.findUnique({
    where: { id },
  });
};

export const updateProduct = async (
  id: number,
  data: {
    name?: string;
    description?: string;
    sku?: string;
    category?: string;
    price?: number;
    stock?: number;
    minStock?: number;
    warehouse?: string;
  }
) => {
  return await prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id: number) => {
  return await prisma.product.delete({
    where: { id },
  });
};

