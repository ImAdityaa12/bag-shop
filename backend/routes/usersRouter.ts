import express from "express";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";
import {
  registerContoller,
  loginController,
  logoutController,
} from "../controllers/authController";
const router = express.Router();
router.post("/register", registerContoller);
router.post("/login", loginController);
router.get("/logout", logoutController);

export default router;
