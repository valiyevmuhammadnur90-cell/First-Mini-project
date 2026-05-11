import "dotenv/config";
import express from "express";
import { connectDB } from "./config/connectDB.js";

const DB_URI = process.env.DB_URI;
if (!DB_URI) {
  console.log("DB_URI not found from .env");
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  }),
);

connectDB(DB_URI);
app.listen(3000, () => {
  console.log("http://localhost:3000");
});
