import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this Email ID",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    });

    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({
        message: "User is not registered with this Email ID",
      });
    }

    const isMatch = await bcrypt.compare(password, userExist.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect Password",
      });
    }

    const token = jwt.sign(
      { id: userExist._id, email: userExist.email, role: userExist.role },
      process.env.SECRETKEY,
      { expiresIn: "2d" }
    );

    return res.status(200).json({
      success: true,
      message: "User Login Successfully",
      token,
      user: { id: userExist._id, name: userExist.name, email: userExist.email, role: userExist.role },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({
      error: error.message,
    });
  }
};


import Student from "../models/Student.js";


export const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Student Created Successfully",
      student,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();

    return res.status(200).json({
      success: true,
      students,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const getSingleStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Student Updated Successfully",
      student,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Student Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};




