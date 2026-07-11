const asyncHandler = require("../utils/asyncHandler");
const authService = require("../services/authService");

const signup = asyncHandler(async (req, res) => {
  const response = await authService.signup(req.body);

  return res.status(201).json(response);
});

const login = asyncHandler(async (req, res) => {
  const response = await authService.login(req.body);

  return res.status(200).json(response);
});

const getProfile = asyncHandler(async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
});

module.exports = {
  signup,
  login,
  getProfile,
};