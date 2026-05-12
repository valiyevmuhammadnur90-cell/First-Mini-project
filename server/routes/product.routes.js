import express from "express";
import productModel from "../model/product.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const products = await productModel.find();
  res.json(products);
});

router.post("/", async (req, res) => {
  const { name, price } = req.body;
  const product = await productModel.create({ name, price });

  res.json({ message: "Product created", product });
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const updated = await productModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.json({ message: "Product updated", updated });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await productModel.findByIdAndDelete(id);

  res.json({ message: "Product deleted", id: deleted._id });
});

export default router;
