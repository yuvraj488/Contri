const groupService = require("../services/groupService");
const groupDashboardService = require("../services/groupDashboardService");

const createGroup = async (req, res, next) => {
  try {
    const result = await groupService.createGroup(
      req.body,
      req.user.id
    );

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getMyGroups = async (req, res, next) => {
  try {
    const result = await groupService.getMyGroups(
      req.user.id
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getGroupDashboard = async (req, res, next) => {
  try {
    const result =
      await groupDashboardService.getGroupDashboard(
        req.params.groupId,
        req.user.id
      );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createGroup,
  getMyGroups,
  getGroupDashboard,
};