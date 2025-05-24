import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
  fromCity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    required: true,
  },
  toCity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    required: true,
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
}, { timestamps: true });

const Route = mongoose.model("Route", routeSchema);

export default Route;
