import express from "express";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";
import authController from "../controllers/authController";
const router = express.Router();
router.post("/register", authController);
router.get("/", function (req, res) {
  res.send("Hello World!");
});
export default router;
