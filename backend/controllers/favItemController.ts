import { Request, Response } from "express";
import productModel from "../models/productModel";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import mongoose from "mongoose";

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
            image: product.image,
          };
          user.favItems.push(newItem);
          product.likedBy.push(user.id);
          await user.save();
          await product.save();
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
        // const id = new mongoose.Types.ObjectId(product.id).toHexString();
        const items = user.favItems.filter(
          (item) =>
            new mongoose.Types.ObjectId(item.id).toHexString() !== productId
        );
        const userLikedIndex = product.likedBy.indexOf(user.id);
        if (userLikedIndex > -1) {
          product.likedBy.splice(userLikedIndex, 1);
          user.favItems = items;
          await product.save();
          await user.save();
          return res.json(user);
        } else {
          return res.status(404).json({ message: "Product not found" });
        }
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
export async function getFavItemsController(req: Request, res: Response) {
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
      return res.json(user.favItems);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
