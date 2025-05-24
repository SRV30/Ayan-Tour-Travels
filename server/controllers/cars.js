import Car from "../models/carModel.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";

export const createCar = catchAsyncErrors(async (req, res, next) => {
  const { name, type, pricePerKm } = req.body;
  if (!name || !type || !pricePerKm) {
    return next(
      new ErrorHandler("Please provide name, type and pricePerKm", 400)
    );
  }

  if (!req.file) {
    return res.status(400).json({
      message: "No image file provided",
      success: false,
      error: true,
    });
  }

  const upload = await uploadImage(req.file);
  if (!upload || !upload.secure_url) {
    return res.status(500).json({
      message: "Image upload failed",
      success: false,
      error: true,
    });
  }

  const images = [{ public_id: upload.public_id, url: upload.secure_url }];

  const car = await Car.create({ name, type, pricePerKm, images });
  res.status(201).json({ success: true, car });
});

export const getAllCars = catchAsyncErrors(async (req, res) => {
  const cars = await Car.find();
  res.status(200).json({ success: true, cars });
});

export const getCarById = catchAsyncErrors(async (req, res, next) => {
  const car = await Car.findById(req.params.id);
  if (!car) return next(new ErrorHandler("Car not found", 404));
  res.status(200).json({ success: true, car });
});

export const updateCar = catchAsyncErrors(async (req, res, next) => {
  const car = await Car.findById(req.params.id);
  if (!car) return next(new ErrorHandler("Car not found", 404));

  const { name, type, pricePerKm } = req.body;

  if (req.file) {
    for (const image of car.images) {
      await deleteImage(image.public_id);
    }

    const upload = await uploadImage(req.file.buffer);
    if (!upload || !upload.secure_url) {
      return res.status(500).json({
        message: "Image upload failed",
        success: false,
        error: true,
      });
    }

    car.images = [{ public_id: upload.public_id, url: upload.secure_url }];
  }

  car.name = name || car.name;
  car.type = type || car.type;
  car.pricePerKm = pricePerKm || car.pricePerKm;

  await car.save();
  res.status(200).json({ success: true, car });
});

export const deleteCar = catchAsyncErrors(async (req, res, next) => {
  const car = await Car.findById(req.params.id);
  if (!car) return next(new ErrorHandler("Car not found", 404));

  for (const image of car.images) {
    await deleteImage(image.public_id);
  }
  await car.deleteOne();
  res.status(200).json({ success: true, message: "Car deleted" });
});
