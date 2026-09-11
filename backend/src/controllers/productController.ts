import { Request, Response } from "express";
import * as productService from "../services/productService";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);

    return res.status(201).json({
      message: "Product created successfully",
      data: product,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Error creating product",
    });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();

    return res.status(200).json(products);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Error fetching products",
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(
      Number(req.params.id)
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json(product);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Error fetching product",
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.updateProduct(
      Number(req.params.id),
      req.body
    );

    return res.status(200).json({
      message: "Product updated successfully",
      data: product,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Error updating product",
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await productService.deleteProduct(Number(req.params.id));

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Error deleting product",
    });
  }
};