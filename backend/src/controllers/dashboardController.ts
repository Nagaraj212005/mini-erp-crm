import { Request, Response } from "express";
import * as dashboardService from "../services/dashboardService";

export const getSummary = async (req: Request, res: Response) => {
  try {
    const data = await dashboardService.getSummary();

    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Failed to load dashboard summary",
    });
  }
};

export const getRecentSales = async (req: Request, res: Response) => {
  try {
    const data = await dashboardService.getRecentSales();

    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Failed to load recent sales",
    });
  }
};

export const lowStock = async (req: Request, res: Response) => {
  try {
    const data = await dashboardService.getLowStockProducts();

    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Failed to load low stock products",
    });
  }
};

export const monthlySales = async (req: Request, res: Response) => {
  try {
    const data = await dashboardService.getMonthlySales();

    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Failed to load monthly sales",
    });
  }
};