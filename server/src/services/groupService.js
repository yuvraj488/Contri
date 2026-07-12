const Group = require("../models/Group");
const AppError = require("../utils/AppError");
const generateInviteCode = require("../utils/generateInviteCode");

const createGroup = async (groupData, userId) => {
  const { name, description } = groupData;

  // Validate input
  if (!name?.trim()) {
    throw new AppError("Group name is required.", 400);
  }

  let inviteCode;
  let existingGroup;

  // Generate a unique invite code
  do {
    inviteCode = generateInviteCode();
    existingGroup = await Group.findOne({ inviteCode });
  } while (existingGroup);

  const group = await Group.create({
    name,
    description,
    createdBy: userId,
    members: [userId],
    inviteCode,
  });

  return {
    success: true,
    message: "Group created successfully.",
    group,
  };
};

module.exports = {
  createGroup,
};