import { Router } from "express";

import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController";

import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/roleMiddleware";

const router = Router();

// Create Customer (ADMIN, MANAGER, EMPLOYEE)
router.post(
  "/",
  authenticate,
  authorize("ADMIN", "MANAGER", "EMPLOYEE"),
  createCustomer
);

// Get All Customers (Any logged-in user)
router.get(
  "/",
  authenticate,
  getAllCustomers
);

// Get Customer By ID (Any logged-in user)
router.get(
  "/:id",
  authenticate,
  getCustomerById
);

// Update Customer (ADMIN, MANAGER, EMPLOYEE)
router.put(
  "/:id",
  authenticate,
  authorize("ADMIN", "MANAGER", "EMPLOYEE"),
  updateCustomer
);

// Delete Customer (Only ADMIN)
router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  deleteCustomer
);

export default router;