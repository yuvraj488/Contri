const signup = async (userData) => {
    console.log(userData);
  return {
    success: true,
    message: "Signup service reached.",
    data: userData,
  };
};

module.exports = {
  signup,
};