import { Router } from "express";
import authRouter from "./authRoutes.js";
import verifyRoutes from "./verifyRoutes.js";
import clashRoutes from "./clashRoutes.js";

const router = Router();

router.use("/api/auth", authRouter);
router.use("/", verifyRoutes);
router.use("/api/clash", clashRoutes);

export default router;
