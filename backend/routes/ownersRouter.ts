import express from "express";
import ownerModel from "../models/ownerModel";

const router = express.Router();

router.post("/create", async function (req, res) {
  try {
    const { fullName, email, password } = req.body;
    let owners = await ownerModel.find();

    if (owners.length > 0) {
      return res
        .status(403)
        .send("You don't have permission to create a new owner.");
    }

    const createdOwner = await ownerModel.create({
      fullName,
      email,
      password,
    });
    return res.status(201).json(createdOwner);
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred while creating the owner.");
  }
});
export default router;
