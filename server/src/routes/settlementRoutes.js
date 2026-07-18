const express = require("express");

const settlementController = require("../controllers/settlementController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/groups/:groupId/settlements",
  authMiddleware,
  settlementController.createSettlement
);

module.exports = router;