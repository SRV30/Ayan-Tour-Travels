import City from "../models/cityModel.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createCity = catchAsyncErrors(async (req, res, next) => {
  const { city, state, country } = req.body;
  if (!city || !state || !country) {
    return next(new ErrorHandler("Please provide city, state and country", 400));
  }
  const newCity = await City.create({ city, state, country });
  res.status(201).json({ success: true, city: newCity });
});

export const getAllCities = catchAsyncErrors(async (req, res) => {
  const cities = await City.find();
  res.status(200).json({ success: true, cities });
});

export const getCityById = catchAsyncErrors(async (req, res, next) => {
  const city = await City.findById(req.params.id);
  if (!city) return next(new ErrorHandler("City not found", 404));
  res.status(200).json({ success: true, city });
});

export const updateCity = catchAsyncErrors(async (req, res, next) => {
  const { city, state, country } = req.body;
  const updatedCity = await City.findByIdAndUpdate(
    req.params.id,
    { city, state, country },
    { new: true, runValidators: true }
  );
  if (!updatedCity) return next(new ErrorHandler("City not found", 404));
  res.status(200).json({ success: true, city: updatedCity });
});

export const deleteCity = catchAsyncErrors(async (req, res, next) => {
  const city = await City.findByIdAndDelete(req.params.id);
  if (!city) return next(new ErrorHandler("City not found", 404));
  res.status(200).json({ success: true, message: "City deleted" });
});
