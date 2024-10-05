import express from "express";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";
import {
  registerContoller,
  loginController,
  logoutController,
} from "../controllers/authController";
import productModel from "../models/productModel";
const router = express.Router();
router.post("/register", registerContoller);
router.post("/login", loginController);
router.get("/logout", logoutController);
router.post("/addFavItems", async function (req, res) {
  const { userId, productId } = req.body;
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const user = await userModel.findById(userId);
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
});
router.post("/removeFavItem", async function (req, res) {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { userId, productId } = req.body;
  try {
    const user = await userModel.findById(userId);
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
});
export default router;
