const bcrypt = require("bcrypt");

const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const signup = async (userData) => {
    
  const { fullName, email, password } = userData;

 if (
  !fullName?.trim() ||
  !email?.trim() ||
  !password?.trim()
) {
  throw new Error("All fields are required.");
}

  // Check if user already exists
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists.");
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

  if (!email?.trim() || !password?.trim()) {
  throw new Error("Email and password are required.");
}

  // Find user
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  // Compare password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password.");
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