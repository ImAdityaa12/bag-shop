import express from "express";
import upload from "../config/multer-config";
import productModel from "../models/productModel";

const router = express.Router();
router.post("/create", upload.single("file"), async function (req, res) {
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
});
export default router;
