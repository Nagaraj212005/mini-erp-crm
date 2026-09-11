import prisma from "../config/prisma";

export const createCustomer = async (data: {
  name: string;
  email: string;
  phone?: string;
}) => {
  return await prisma.customer.create({
    data,
  });
};

export const getAllCustomers = async () => {
  return await prisma.customer.findMany({
    orderBy: {
      id: "asc",
    },
  });
};

export const getCustomerById = async (id: number) => {
  return await prisma.customer.findUnique({
    where: { id },
  });
};

export const updateCustomer = async (
  id: number,
  data: {
    name?: string;
    email?: string;
    phone?: string;
  }
) => {
  return await prisma.customer.update({
    where: { id },
    data,
  });
};

export const deleteCustomer = async (id: number) => {
  return await prisma.customer.delete({
    where: { id },
  });
};