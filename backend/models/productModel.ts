import { Buffer } from "buffer";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  image: Buffer,
  name: String,
  price: Number,
  discount: {
    type: Number,
    default: 0,
  },
  bgColor: String,
  panelColor: String,
  textColor: String,
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
productSchema.virtual("isLiked").get(function () {
  return false; // This will be dynamically set in the API response
});
productSchema.set("toJSON", { virtuals: true });
export default mongoose.model("products", productSchema);
