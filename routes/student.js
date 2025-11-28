import express from "express";
import { getProfile, updateProfile } from "../controllers/studentController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/view-profile/:id", authMiddleware, getProfile);
router.put("/update-profile/:id", authMiddleware, updateProfile);

export default router;
