import express from "express";
import upload from "../config/multer-config";
import productModel from "../models/productModel";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import userModel from "../models/userModel";
const router = express.Router();
router.get("/", async function (req: Request, res: Response) {
  if (!req.headers.authorization) {
    return res.status(401).send("Authorization header is missing");
  }

  try {
    const products = await productModel.find();
    const { email } = jwt.decode(req.headers.authorization.split(" ")[1]) as {
      email: string;
      id: string;
      iat: number;
    };
    const user = await userModel.findOne({ email });
    const productsWithLikeStatus = products.map((product) => {
      const isLiked = product.likedBy.includes(user?.id);
      return { ...product.toObject(), isLiked };
    });
    return res.status(200).json(productsWithLikeStatus);
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
