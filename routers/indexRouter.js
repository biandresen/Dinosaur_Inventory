import { Router } from "express";
import { indexController } from "../controllers/indexController.js";
import { notFoundHandler } from "../middlewares/notFound.js";

export const indexRouter = Router();

indexRouter.get("/", indexController.getHomepage);

indexRouter.use(notFoundHandler);
