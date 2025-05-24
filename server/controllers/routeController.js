import Route from "../models/routeModel.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

// Create a new route
export const createRoute = catchAsyncErrors(async (req, res, next) => {
  const { fromCity, toCity, car, totalPrice } = req.body;

  if (!fromCity || !toCity || !car || totalPrice === undefined) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const route = await Route.create({ fromCity, toCity, car, totalPrice });

  res.status(201).json({
    success: true,
    route,
  });
});

// Get all routes
export const getAllRoutes = catchAsyncErrors(async (req, res, next) => {
  const routes = await Route.find()
    .populate("fromCity")
    .populate("toCity")
    .populate("car");

  res.status(200).json({
    success: true,
    routes,
  });
});

// Get route by ID
export const getRouteById = catchAsyncErrors(async (req, res, next) => {
  const route = await Route.findById(req.params.id)
    .populate("fromCity")
    .populate("toCity")
    .populate("car");

  if (!route) {
    return next(new ErrorHandler("Route not found", 404));
  }

  res.status(200).json({
    success: true,
    route,
  });
});

// Update route
export const updateRoute = catchAsyncErrors(async (req, res, next) => {
  const { fromCity, toCity, car, totalPrice } = req.body;

  let route = await Route.findById(req.params.id);
  if (!route) {
    return next(new ErrorHandler("Route not found", 404));
  }

  route.fromCity = fromCity || route.fromCity;
  route.toCity = toCity || route.toCity;
  route.car = car || route.car;
  route.totalPrice = totalPrice !== undefined ? totalPrice : route.totalPrice;

  await route.save();

  res.status(200).json({
    success: true,
    route,
  });
});

// Delete route
export const deleteRoute = catchAsyncErrors(async (req, res, next) => {
  const route = await Route.findById(req.params.id);
  if (!route) {
    return next(new ErrorHandler("Route not found", 404));
  }

  await route.deleteOne();

  res.status(200).json({
    success: true,
    message: "Route deleted successfully",
  });
});
