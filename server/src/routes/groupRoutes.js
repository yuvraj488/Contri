const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const groupController = require("../controllers/groupController");

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  groupController.createGroup
);

router.get(
  "/my-groups",
  authMiddleware,
  groupController.getMyGroups
);

module.exports = router;