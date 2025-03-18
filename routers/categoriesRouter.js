import { Router } from "express";
import { categoriesController } from "../controllers/categoriesController.js";

export const categoriesRouter = Router();

categoriesRouter.get("/", categoriesController.getAllCategories);
categoriesRouter.get("/:id", categoriesController.getCategoriesById);
