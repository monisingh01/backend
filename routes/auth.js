import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);


router.post("/create", authMiddleware, createStudent);
router.get("/all", authMiddleware, getAllStudents);
router.get("/:id", authMiddleware, getSingleStudent);
router.put("/update/:id", authMiddleware, updateStudent);
router.delete("/delete/:id", authMiddleware, deleteStudent);

export default router;
