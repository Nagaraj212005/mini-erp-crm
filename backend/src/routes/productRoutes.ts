import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("ADMIN", "MANAGER", "EMPLOYEE"),
  createProduct
);

router.get("/", authenticate, getAllProducts);

router.get("/:id", authenticate, getProductById);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN", "MANAGER", "EMPLOYEE"),
  updateProduct
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN", "MANAGER"),
  deleteProduct
);

export default router;