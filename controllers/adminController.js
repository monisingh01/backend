import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "Student" }).select("-password");
    return res.status(200).json({
      success: true,
      message: "Students fetched successfully",
      students,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(409).json({
      error: error.message,
    });
  }
};

export const addStudent = async (req, res) => {
  const { name, email, password, course } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new User({
      name: name,
      email: email,
      password: hashedPassword,
      course: course,
      role: "Student",
    });

    await newStudent.save();

    return res.status(201).json({
      success: true,
      message: "Student added successfully",
      newStudent,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(409).json({
      error: error.message,
    });
  }
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, email, course } = req.body;
  try {
    const student = await User.findByIdAndUpdate(
      id,
      { name, email, course },
      { new: true }
    ).select("-password");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(409).json({
      error: error.message,
    });
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await User.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(409).json({
      error: error.message,
    });
  }
};
