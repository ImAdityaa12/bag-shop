import { Request, Response } from "express";
import productModel from "../models/productModel";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

export async function addFavItemsController(req: Request, res: Response) {
  const { productId } = req.body;
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { email } = jwt.decode(req.headers.authorization.split(" ")[1]) as {
    email: string;
    id: string;
    iat: number;
  };
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      if (!user.favItems.includes(productId)) {
        const product = await productModel.findById(productId);
        if (product) {
          const newItem = {
            id: product._id,
            name: product.name,
            price: product.price,
            discount: product.discount,
            bgColor: product.bgColor,
            panelColor: product.panelColor,
            textColor: product.textColor,
          };
          user.favItems.push(newItem);
          await user.save();
        } else {
          return res.status(404).json({ message: "Product not found" });
        }
      }
      return res.json(user);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function removeFavItemsController(req: Request, res: Response) {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { email } = jwt.decode(req.headers.authorization.split(" ")[1]) as {
    email: string;
    id: string;
    iat: number;
  };
  const { productId } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const product = await productModel.findById(productId);
      if (product) {
        const items = user.favItems.filter((item) => item.id === productId);
        user.favItems = items;
        await user.save();
      }

      return res.json(user);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
