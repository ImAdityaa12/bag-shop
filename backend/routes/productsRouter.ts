import express from "express";
import upload from "../config/multer-config";
import productModel from "../models/productModel";

const router = express.Router();
router.get("/", async function (req, res) {
  try {
    const products = await productModel.find();
    if (!products) {
      return res.status(404).send("No products found");
    }
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred while fetching products");
  }
});
router.post("/create", upload.single("file"), async function (req, res) {
  try {
    const { name, price, discount, bgColor, panelColor, textColor } = req.body;
    await productModel.create({
      image: req.file?.buffer,
      name,
      price,
      discount,
      bgColor,
      panelColor,
      textColor,
    });
    return res.status(201).json("Product created successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred while creating the product");
  }
});
export default router;
