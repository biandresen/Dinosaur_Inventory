import express from "express";
import { authController } from "../controllers/authController.js";

export const authRouter = express.Router();

authRouter.post("/check-password", authController.checkAdminPassword);
