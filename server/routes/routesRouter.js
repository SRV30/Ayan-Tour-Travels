import express from "express";
import {
  createRoute,
  getAllRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
} from "../controllers/routeController.js";
import { auth, admin } from "../middleware/auth.js";

const routeRouter = express.Router();

routeRouter.post("/", auth, admin, createRoute);
routeRouter.get("/", getAllRoutes);
routeRouter.get("/:id", getRouteById);
routeRouter.put("/:id", auth, admin, updateRoute);
routeRouter.delete("/:id", auth, admin, deleteRoute);

export default routeRouter;
