const settlementService = require("../services/settlementService");

const createSettlement = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const { receivedBy, amount } = req.body;

    const userId = req.user._id;

    const result = await settlementService.createSettlement(
      groupId,
      userId,
      receivedBy,
      Number(amount)
    );

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getSettlementHistory = async (req, res, next) => {
  try {
    const { groupId } = req.params;

    const userId = req.user._id;

    const result = await settlementService.getSettlementHistory(
      groupId,
      userId
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSettlement,
  getSettlementHistory,
};