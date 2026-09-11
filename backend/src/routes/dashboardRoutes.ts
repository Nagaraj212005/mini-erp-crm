import { Router } from "express";
import { authenticate } from "../middleware/authMiddleware";
import {
  getSummary,
  getRecentSales,
  lowStock,
  monthlySales
} from "../controllers/dashboardController";

const router = Router();

router.get("/summary", authenticate, getSummary);
router.get("/recent-sales", authenticate, getRecentSales);
router.get("/low-stock", authenticate, lowStock);
router.get("/monthly-sales", authenticate, monthlySales);

export default router;