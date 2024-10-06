import express from "express";
import {
  registerContoller,
  loginController,
  logoutController,
} from "../controllers/authController";
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
