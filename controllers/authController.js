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
