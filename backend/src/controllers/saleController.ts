import { Request, Response } from "express";
import * as saleService from "../services/saleService";

export const createSaleController = async (
  req: Request,
  res: Response
) => {
  try {
    const { customerId, items } = req.body;

    const createdById = (req as any).user.id;

    const sale = await saleService.createSale(
      customerId,
      createdById,
      items
    );

    return res.status(201).json({
      message: "Sale created successfully",
      data: sale,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || "Failed to create sale",
    });
  }
};

export const getSalesController = async (
  req: Request,
  res: Response
) => {
  try {
    const sales = await saleService.getSales();

    return res.status(200).json(sales);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Failed to fetch sales",
    });
  }
};