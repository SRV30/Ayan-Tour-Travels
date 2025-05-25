import express from "express";
import {
  submitContactForm,
  getContactForms,
  deleteContactForms,
} from "../controllers/getintouchController.js";

const contactRouter = express.Router();

contactRouter.post("/submit", submitContactForm);

contactRouter.get("/", getContactForms);

contactRouter.delete("/cleanup", deleteContactForms);

export default contactRouter;
