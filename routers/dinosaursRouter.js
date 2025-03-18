import { Router } from "express";
import { dinosaurController } from "../controllers/dinosaursController.js";

export const dinosaursRouter = Router();

dinosaursRouter.get("/:id", dinosaurController.getDinosaurById);
dinosaursRouter.get("/", dinosaurController.getDinosaurs);
