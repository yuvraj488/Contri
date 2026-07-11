const authService = require("../services/authService");

const signup = async (req, res) => {
  try {
    const response = await authService.signup(req.body);

    return res.status(201).json(response);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const response = await authService.login(req.body);

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};

module.exports = {
  signup,
  login,
  getProfile,
};