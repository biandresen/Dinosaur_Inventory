import { Router } from "express";
import { dinosaurController } from "../controllers/dinosaursController.js";

export const dinosaursRouter = Router();

dinosaursRouter.get("/", dinosaurController.getAllDinosaurs);
dinosaursRouter.get("/:id", dinosaurController.getDinosaurById);
