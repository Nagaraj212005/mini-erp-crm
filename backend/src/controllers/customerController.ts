import { Request, Response } from "express";
import * as customerService from "../services/customerService";

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await customerService.createCustomer(req.body);

    return res.status(201).json({
      message: "Customer created successfully",
      data: customer,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Error creating customer",
    });
  }
};

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await customerService.getAllCustomers();

    return res.status(200).json(customers);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Error fetching customers",
    });
  }
};

export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const customer = await customerService.getCustomerById(
      Number(req.params.id)
    );

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    return res.status(200).json(customer);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Error fetching customer",
    });
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await customerService.updateCustomer(
      Number(req.params.id),
      req.body
    );

    return res.status(200).json({
      message: "Customer updated successfully",
      data: customer,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Error updating customer",
    });
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    await customerService.deleteCustomer(Number(req.params.id));

    return res.status(200).json({
      message: "Customer deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Error deleting customer",
    });
  }
};