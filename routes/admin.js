import express from "express";
import { getAllStudents, addStudent, updateStudent, deleteStudent } from "../controllers/adminController.js";
import { authMiddleware, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.get("/get-all-students", authMiddleware, adminOnly, getAllStudents);
router.post("/create-student", authMiddleware, adminOnly, addStudent);
router.put("/update-student/:id", authMiddleware, adminOnly, updateStudent);
router.delete("/student/:id", authMiddleware, adminOnly, deleteStudent);

export default router;
