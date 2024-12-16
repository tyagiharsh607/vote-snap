import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUser,
  checkLogin,
  forgetPassword,
  resetPassword,
} from "../controllers/authControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { authLimiter } from "../config/rateLimit.js";

const router = Router();

router.post("/register", authLimiter, registerUser);
router.post("/login", authLimiter, loginUser);
router.get("/user", authMiddleware, getUser);
router.post("/check/login", authLimiter, checkLogin);
router.post("/forget-password", authLimiter, forgetPassword);
router.post("/reset-password", resetPassword);

export default router;
