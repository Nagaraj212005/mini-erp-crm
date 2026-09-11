import { Request, Response } from "express";
import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  registerUser,
} from "../services/userService";

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await registerUser(
      name,
      email,
      password,
      role || "EMPLOYEE"
    );

    const { password: userPassword, ...userWithoutPassword } = user;

    res.status(201).json(userWithoutPassword);
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      error,
    });
  }
};