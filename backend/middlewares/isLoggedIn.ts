import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import userModel from "../models/userModel";

export async function isLoggedIn(
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.cookies.token;
    if (!token) {
      req.flash("error", "Unauthorized");
      return res.status(401).send("Unauthorized");
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY as string);
    const user = await userModel
      .findOne({
        id: (decoded as any).id,
      })
      .select("-password");
    if (!user) {
      return res.status(401).send("Unauthorized");
    }
    req.user = user;
    next();
  } catch (error) {
    req.flash("error", "Unauthorized");
    return res.status(401).send("Unauthorized");
  }
}
