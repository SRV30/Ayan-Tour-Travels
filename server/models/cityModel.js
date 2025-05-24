import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true });

const City = mongoose.model("City", citySchema);

export default City;
