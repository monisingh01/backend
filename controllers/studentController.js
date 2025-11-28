import User from "../models/User.js";

export const getProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Details fetched successfully",
      user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(409).json({
      error: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { name, email, course } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, course },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(409).json({
      error: error.message,
    });
  }
};
