import { Router } from "express";
import { dinosaurController } from "../controllers/dinosaursController.js";
import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";
import { notFoundHandler } from "../middlewares/notFound.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads")); // Store files in public/uploads
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Ensure unique file names
  },
});

// Initialize multer
const upload = multer({ storage }); // Store uploaded files in the "uploads"

export const dinosaursRouter = Router();

dinosaursRouter.get("/new-dino", dinosaurController.getNewDinoForm);
dinosaursRouter.get("/:id", dinosaurController.getDinosaurById);
dinosaursRouter.get("/", dinosaurController.getDinosaurs);

dinosaursRouter.post(
  "/new-dino",
  upload.single("image"),
  dinosaurController.postNewDino
);
dinosaursRouter.post(
  "/edit/:id",
  upload.single("image"),
  dinosaurController.editDino
);

dinosaursRouter.use(notFoundHandler);
