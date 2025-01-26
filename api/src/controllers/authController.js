import User from "../models/userModel.js";
import { generateAccessToken } from "../helpers/generateToken.js";
import sendResponse from "../helpers/sendResponse.js";
import bcrypt from "bcryptjs";
// Get a specific user by ID
const login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    // Find user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return sendResponse(res, "User not found", null, true, 404);
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return sendResponse(res, "Invalid password", null, true, 401);
    }
    const token = generateAccessToken(user);
    if (!token) {
      return sendResponse(res, "Error generating token", null, true, 500);
    // }
    // if (isPasswordValid) {
    //   return sendResponse(
    //     res,
    //     "Change Your Password",
    //     { changePass: true },
    //     true,
    //     200
    //   );
    // }

    sendResponse(res, "User found", { user, token });
  } catch (error) {
    console.error(error);
    sendResponse(res, "Error finding user", null, true, 500);
  }
};

const register = async (req, res) => {
  try {
    const { email } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return sendResponse(res, "User already exists", null, true, 400);
    }
    const hashedPassword = await bcrypt.hash("Saylani@loan", 10);
    // Create new user
    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();
    const token = generateAccessToken(newUser);
    if (!token) {
      return sendResponse(res, "Error generating token", null, true, 500);
    }
    sendResponse(res, "User registered successfully", { user: newUser, token });
  } catch (error) {
    console.error(error);
    sendResponse(res, "Error registering user", null, true, 500);
  }
};

export { login, register };
