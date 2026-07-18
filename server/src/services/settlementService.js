const Expense = require("../models/Expense");
const Group = require("../models/Group");
const Settlement = require("../models/Settlement");

const AppError = require("../utils/AppError");
const generateSettlementPlan = require("../utils/generateSettlementPlan");

const createSettlement = async (
  groupId,
  userId,
  receivedBy,
  amount
) => {
  // Validate amount
  if (!amount || amount <= 0) {
    throw new AppError(
      "Settlement amount must be greater than zero.",
      400
    );
  }

  // Validate group
  const group = await Group.findById(groupId);

  if (!group || !group.isActive) {
    throw new AppError("Group not found.", 404);
  }

  // Validate membership
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

  // Fetch expenses
  const expenses = await Expense.find({
    group: groupId,
  })
    .populate("participants", "fullName")
    .populate("paidBy", "fullName");

  // Fetch settlement history
  const settlementHistory = await Settlement.find({
    group: groupId,
  })
    .populate("paidBy", "fullName")
    .populate("receivedBy", "fullName");

  // Generate latest settlement plan
  const settlementPlan = generateSettlementPlan(
    expenses,
    settlementHistory
  );

  // Find outstanding settlement
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

  // Prevent over-settlement
  if (amount > outstandingSettlement.amount) {
    throw new AppError(
      "Settlement amount exceeds the outstanding balance.",
      400
    );
  }

  // Create settlement
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

module.exports = {
  createSettlement,
};