const Expense = require("../models/Expense");
const Group = require("../models/Group");
const Settlement = require("../models/Settlement");

const AppError = require("../utils/AppError");
const generateSettlementPlan = require("../utils/generateSettlementPlan");

const EPSILON = 0.01;

/* ===========================================================
   CREATE SETTLEMENT
=========================================================== */

const createSettlement = async (
  groupId,
  userId,
  receivedBy,
  amount
) => {
  if (!amount || amount <= 0) {
    throw new AppError(
      "Settlement amount must be greater than zero.",
      400
    );
  }

  const group = await Group.findById(groupId);

  if (!group || !group.isActive) {
    throw new AppError("Group not found.", 404);
  }

  const isMember = group.members.some(
    (member) => member.toString() === userId.toString()
  );

  if (!isMember) {
    throw new AppError(
      "You are not a member of this group.",
      403
    );
  }

  const isReceiverMember = group.members.some(
    (member) => member.toString() === receivedBy.toString()
  );

  if (!isReceiverMember) {
    throw new AppError(
      "Recipient is not a member of this group.",
      400
    );
  }

  if (userId.toString() === receivedBy.toString()) {
    throw new AppError(
      "You cannot settle with yourself.",
      400
    );
  }

  const expenses = await Expense.find({
    group: groupId,
  })
    .populate("participants", "fullName")
    .populate("paidBy", "fullName");

  const settlementHistory = await Settlement.find({
    group: groupId,
  })
    .populate("paidBy", "fullName")
    .populate("receivedBy", "fullName");

  const settlementPlan = generateSettlementPlan(
    expenses,
    settlementHistory
  );

  const outstandingSettlement = settlementPlan.find(
    (settlement) =>
      settlement.from === userId.toString() &&
      settlement.to === receivedBy.toString()
  );

  if (!outstandingSettlement) {
    throw new AppError(
      "No outstanding balance found for this user.",
      400
    );
  }

  if (amount > outstandingSettlement.amount + EPSILON) {
    throw new AppError(
      "Settlement amount exceeds the outstanding balance.",
      400
    );
  }

  const settlement = await Settlement.create({
    group: groupId,
    paidBy: userId,
    receivedBy,
    amount,
    createdBy: userId,
  });

  return {
    success: true,
    message: "Settlement recorded successfully.",
    settlement,
  };
};

/* ===========================================================
   GET SETTLEMENT HISTORY
=========================================================== */

const getSettlementHistory = async (groupId, userId) => {
  const group = await Group.findById(groupId);

  if (!group || !group.isActive) {
    throw new AppError("Group not found.", 404);
  }

  const isMember = group.members.some(
    (member) => member.toString() === userId.toString()
  );

  if (!isMember) {
    throw new AppError(
      "You are not a member of this group.",
      403
    );
  }

  const settlements = await Settlement.find({
    group: groupId,
  })
    .populate("paidBy", "fullName")
    .populate("receivedBy", "fullName")
    .sort({ createdAt: -1 });

  const formattedSettlements = settlements.map((settlement) => ({
    id: settlement._id,
    amount: settlement.amount,
    paidBy: {
      id: settlement.paidBy._id,
      name: settlement.paidBy.fullName,
    },
    receivedBy: {
      id: settlement.receivedBy._id,
      name: settlement.receivedBy.fullName,
    },
    createdAt: settlement.createdAt,
  }));

  return {
    success: true,
    count: formattedSettlements.length,
    settlements: formattedSettlements,
  };
};

module.exports = {
  createSettlement,
  getSettlementHistory,
};