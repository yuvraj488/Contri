const express = require("express");

const settlementController = require("../controllers/settlementController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post(
  "/groups/:groupId/settlements",
  settlementController.createSettlement
);

router.get(
  "/groups/:groupId/settlements",
  settlementController.getSettlementHistory
);

module.exports = router;