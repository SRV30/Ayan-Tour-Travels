import express from "express";
import {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity,
} from "../controllers/city.js";
import { auth, admin } from "../middleware/auth.js";

const cityRouter = express.Router();

cityRouter.route("/").post(auth, admin, createCity).get(getAllCities);

cityRouter
  .route("/:id")
  .get(getCityById)
  .put(auth, admin, updateCity)
  .delete(auth, admin, deleteCity);

export default cityRouter;
