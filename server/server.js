import "dotenv/config";
import express from "express";
import { connectDB } from "./config/connectDB.js";
import cors from "cors";
import productRoutes from "./routes/product.routes.js";

const DB_URI = process.env.DB_URI;
if (!DB_URI) {
  console.log("DB_URI not found from .env");
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://fullstackcrud-tan.vercel.app"],
  }),
);

app.use("/products", productRoutes);

connectDB(DB_URI);
app.listen(3000, () => {
  console.log("http://localhost:3000");
});
