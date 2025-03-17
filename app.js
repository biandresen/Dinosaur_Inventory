import express from "express";
import "dotenv/config";
import { indexRouter } from "./routers/indexRouter.js";

const PORT = process.env.PORT || 4600;
const app = express();

// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Set view engine
app.set("view engine", "ejs");

// Routes
app.use("/", indexRouter);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
