import { Router } from "express";
import {
  createSaleController,
  getSalesController,
} from "../controllers/saleController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticate, createSaleController);
router.get("/", authenticate, getSalesController);

export default router;