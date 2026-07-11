const AppError = require("../utils/AppError");
const bcrypt = require("bcrypt");

const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const signup = async (userData) => {
  const { fullName, email, password } = userData;

  // Validate input
  if (!fullName?.trim() || !email?.trim() || !password?.trim()) {
    throw new AppError("All fields are required.", 400);
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError("User already exists.", 409);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });

  // Generate JWT
  const token = generateToken(user._id);

  return {
    success: true,
    message: "Signup successful.",
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
  };
};

const login = async (userData) => {
  const { email, password } = userData;

  // Validate input
  if (!email?.trim() || !password?.trim()) {
    throw new AppError("Email and password are required.", 400);
  }

  // Find user
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("Invalid email or password.", 401);
  }

  // Compare password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password.", 401);
  }

  // Generate JWT
  const token = generateToken(user._id);

  return {
    success: true,
    message: "Login successful.",
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
  };
};

module.exports = {
  signup,
  login,
};