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

const getMyGroups = async (userId) => {
  const groups = await Group.find(
    {
      members: userId,
      isActive: true,
    },
    "name description inviteCode members"
  );

  return {
    success: true,
    groups: groups.map((group) => ({
      id: group._id,
      name: group.name,
      description: group.description,
      inviteCode: group.inviteCode,
      memberCount: group.members.length,
    })),
  };
};

const joinGroup = async (inviteCode, userId) => {
  // Validate input
  if (!inviteCode?.trim()) {
    throw new AppError("Invite code is required.", 400);
  }

  // Find active group
  const group = await Group.findOne({
    inviteCode: inviteCode.toUpperCase(),
    isActive: true,
  });

  if (!group) {
    throw new AppError("Invalid invite code.", 404);
  }

  // Check if user is already a member
  const isMember = group.members.some(
    (member) => member.toString() === userId.toString()
  );

  if (isMember) {
    throw new AppError("You are already a member of this group.", 409);
  }

  // Add member
  group.members.push(userId);

  await group.save();

  return {
    success: true,
    message: "Joined group successfully.",
    group: {
      id: group._id,
      name: group.name,
      description: group.description,
      inviteCode: group.inviteCode,
      memberCount: group.members.length,
    },
  };
};

module.exports = {
  createGroup,
  getMyGroups,
  joinGroup,
};