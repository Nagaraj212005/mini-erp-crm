import { Router } from "express";
import {
  registerUserController,
  loginUser,
} from "../controllers/userController";

const router = Router();

router.post("/register", registerUserController);
router.post("/login", loginUser);

export default router;