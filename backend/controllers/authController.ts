import { Request, Response } from "express";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken";

export default async function authController(req: Request, res: Response) {
  try {
    const { fullName, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await userModel.create({ fullName, email, password: hash });
    const token = generateToken(email, user);
    res.cookie("token", token);
    return res.status(201).json("User created successfully");
  } catch (error) {
    return res.status(500).send("An error occurred while creating the user.");
  }
}
