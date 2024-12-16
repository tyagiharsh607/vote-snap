import { Router } from "express";
import { createClash, createClashItems, deleteClash, getClashById, getClashes, updateClash, } from "../controllers/clashControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = Router();
router.post("/", authMiddleware, createClash);
router.get("/", authMiddleware, getClashes);
router.get("/:id", getClashById);
router.put("/:id", authMiddleware, updateClash);
router.delete("/:id", authMiddleware, deleteClash);
// Items
router.post("/items", authMiddleware, createClashItems);
export default router;
