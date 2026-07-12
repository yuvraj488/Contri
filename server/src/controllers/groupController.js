const asyncHandler = require("../utils/asyncHandler");
const groupService = require("../services/groupService");

const createGroup = asyncHandler(async (req, res) => {
  const response = await groupService.createGroup(
    req.body,
    req.user._id
  );

  return res.status(201).json(response);
});

const getMyGroups = asyncHandler(async (req, res) => {
  const response = await groupService.getMyGroups(req.user._id);

  return res.status(200).json(response);
});

module.exports = {
  createGroup,
  getMyGroups,
};