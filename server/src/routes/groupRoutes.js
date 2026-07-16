const express = require("express");
const router = express.Router();

const groupController = require("../controllers/groupController");
const authMiddleware = require("../middlewares/authMiddleware");

// Create Group
router.post(
  "/",
  authMiddleware,
  groupController.createGroup
);

// Get My Groups
router.get(
  "/",
  authMiddleware,
  groupController.getMyGroups
);

// Group Dashboard
router.get(
  "/:groupId",
  authMiddleware,
  groupController.getGroupDashboard
);

module.exports = router;