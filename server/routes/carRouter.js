import express from "express";
import {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
} from "../controllers/cars.js";
import { admin, auth } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router
  .route("/")
  .post(admin, auth, upload.single("image"), createCar)
  .get(getAllCars);

router
  .route("/:id")
  .get(getCarById)
  .put(admin, auth, upload.single("image"), updateCar)
  .delete(admin, auth, deleteCar);

export default router;
