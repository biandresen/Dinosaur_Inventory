import express from "express";
import "dotenv/config";

const PORT = process.env.PORT || 3000;
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
