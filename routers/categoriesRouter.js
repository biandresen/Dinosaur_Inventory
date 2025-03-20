import { Router } from "express";
import { categoriesController } from "../controllers/categoriesController.js";
import { notFoundHandler } from "../middlewares/notFound.js";

export const categoriesRouter = Router();

categoriesRouter.get(
  "/new-category",
  categoriesController.getNewCategoriesForm
);
categoriesRouter.get("/:id", categoriesController.getCategoriesById);
categoriesRouter.get("/", categoriesController.getAllCategories);

categoriesRouter.post("/new-category", categoriesController.postNewCategory);

categoriesRouter.use(notFoundHandler);
