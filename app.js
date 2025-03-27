import express from "express";
import "dotenv/config";
import { indexRouter } from "./routers/indexRouter.js";
import { dinosaursRouter } from "./routers/dinosaursRouter.js";
import { categoriesRouter } from "./routers/categoriesRouter.js";
import { authRouter } from "./routers/authRouter.js";

const PORT = process.env.PORT; // || 4600;
const app = express();

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

// Set view engine
app.set("view engine", "ejs");

// Routes
app.use("/dinosaurs", dinosaursRouter);
app.use("/categories", categoriesRouter);
app.use("/auth", authRouter);
app.use("/", indexRouter);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
