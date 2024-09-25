import { mongoose } from "mongoose";

const productSchema = new mongoose.Schema({
  image: String,
  name: String,
  price: Number,
  discount: {
    type: Number,
    default: 0,
  },
  bgColor: String,
  panelColor: String,
  textColor: String,
});

export default mongoose.model("products", productSchema);
