import express from "express";
import {
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateUserDetails,
  getUserDetails,
} from "../controllers/user.js";

import { auth, admin } from "../middleware/auth.js";

const router = express.Router();

// Auth routes
router.post("/login", login);
router.get("/logout", logout);

// Forgot/reset password
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

// Authenticated user routes
router.put("/password/update", auth, admin, updatePassword);
router.put("/me/update", auth, admin, updateUserDetails);
router.get("/me", auth, admin, getUserDetails);

export default router;
