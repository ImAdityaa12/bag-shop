import { mongoose } from "mongoose";

const ownerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    minLength: 3,
    trim: true,
  },
  email: String,
  password: String,
  products: {
    type: Array,
    default: [],
  },
  picture: String,
  picture: String,
});

export default mongoose.model("owner", ownerSchema);
