import sendResponse from "../helpers/sendResponse.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

// Create a new user
const createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendResponse(res, "User already exists.", null, true, 400);
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, name, password: hashedPassword });

    sendResponse(res, "User created successfully", user, false, 201);
  } catch (error) {
    console.error(error);
    sendResponse(res, error.message, null, true, 500);
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    console.log("finding users");
    const users = await User.find();
    if (!users || users.length === 0) {
      return sendResponse(res, "No users found.", null, true, 404);
    }
    sendResponse(res, "Users retrieved successfully", users);
  } catch (error) {
    console.error(error);
    sendResponse(res, error.message, null, true, 500);
  }
};

// Get a specific user by ID
const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return sendResponse(res, "User not found.", null, true, 404);
    }
    sendResponse(res, "User retrieved successfully", user);
  } catch (error) {
    console.error(error);
    sendResponse(res, error.message, null, true, 500);
  }
};

// Update a specific user's details
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).exec();

    if (!updatedUser) {
      return sendResponse(res, "User not found.", null, true, 404);
    }

    sendResponse(res, "User updated successfully", updatedUser);
  } catch (error) {
    console.error(error);
    sendResponse(res, error.message, null, true, 500);
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return sendResponse(res, "User not found.", null, true, 404);
    }

    sendResponse(res, "User deleted successfully");
  } catch (error) {
    console.error(error);
    sendResponse(res, error.message, null, true, 500);
  }
};

// Get a current user
const getCurrentUser = async (req, res) => {
  try {
    const tokenUser = req.user;
    const Model = tokenUser._doc.role === "teacher" ? Teacher : Student;
    const user = await Model.findById(tokenUser._doc._id)
      .populate({
        path: "section",
        populate: [{ path: "batch" }, { path: "teacher" }, { path: "course" }],
      })
      .populate({
        path: "courses",
        populate: [
          {
            path: "batch",
            populate: [{ path: "course" }, { path: "branch" }],
          },
          {
            path: "course",
          },
        ],
      });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getCurrentUser,
};
