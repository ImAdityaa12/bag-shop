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
import jwt from "jsonwebtoken";
import {
  addFavItemsController,
  removeFavItemsController,
} from "../controllers/favItemController";
const router = express.Router();
router.post("/register", registerContoller);
router.post("/login", loginController);
router.get("/logout", logoutController);
router.post("/addFavItems", addFavItemsController);
router.post("/removeFavItem", removeFavItemsController);
export default router;
