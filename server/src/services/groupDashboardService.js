const Expense = require("../models/Expense");
const Group = require("../models/Group");
const AppError = require("../utils/AppError");
const calculateBalances = require("../utils/calculateBalances");
const generateSettlements = require("../utils/generateSettlements");

const getGroupDashboard = async (groupId, userId) => {
  // Find Group
  const group = await Group.findById(groupId)
    .populate("members", "fullName")
    .populate("createdBy", "fullName");

  if (!group || !group.isActive) {
    throw new AppError("Group not found.", 404);
  }

  // Verify Membership
  const isMember = group.members.some(
    (member) => member._id.toString() === userId.toString()
  );

  if (!isMember) {
    throw new AppError("You are not a member of this group.", 403);
  }

  // Member Lookup Map
  const memberMap = new Map();

  group.members.forEach((member) => {
    memberMap.set(member._id.toString(), member);
  });

  // Fetch Expenses
  const expenses = await Expense.find({ group: groupId })
    .populate("paidBy", "fullName")
    .populate("createdBy", "fullName")
    .populate("participants", "fullName")
    .sort({ createdAt: -1 });

  // Calculate Balances
  const balanceMap = calculateBalances(expenses);

  // Generate Settlements
  const settlements = generateSettlements(balanceMap);

  // Summary
  const toPay = [];
  const toGet = [];

  settlements.forEach((settlement) => {
    if (settlement.from === userId.toString()) {
      const receiver = memberMap.get(settlement.to);

      if (receiver) {
        toPay.push({
          id: receiver._id,
          name: receiver.fullName,
          amount: Number(settlement.amount.toFixed(2)),
        });
      }
    }

    if (settlement.to === userId.toString()) {
      const sender = memberMap.get(settlement.from);

      if (sender) {
        toGet.push({
          id: sender._id,
          name: sender.fullName,
          amount: Number(settlement.amount.toFixed(2)),
        });
      }
    }
  });

  const totalToPay = Number(
    toPay
      .reduce((sum, member) => sum + member.amount, 0)
      .toFixed(2)
  );

  const totalToGet = Number(
    toGet
      .reduce((sum, member) => sum + member.amount, 0)
      .toFixed(2)
  );

  // Expense Summaries
  const expenseSummaries = expenses.map((expense) => ({
    id: expense._id,

    title: expense.title,

    amount: Number(expense.amount.toFixed(2)),

    paidBy: {
      id: expense.paidBy._id,
      name: expense.paidBy.fullName,
    },

    participantCount: expense.participants.length,

    participantNames: expense.participants.map(
      (participant) => participant.fullName
    ),

    createdBy: {
      id: expense.createdBy._id,
      name: expense.createdBy.fullName,
    },

    createdAt: expense.createdAt,
  }));

  // Group Members
  const groupMembers = group.members.map((member) => ({
    id: member._id,
    name: member.fullName,
  }));

  return {
    success: true,

    group: {
      id: group._id,
      name: group.name,
      description: group.description,
      memberCount: groupMembers.length,
      createdAt: group.createdAt,
    },

    summary: {
      toPay: {
        total: totalToPay,
        members: toPay,
      },

      toGet: {
        total: totalToGet,
        members: toGet,
      },
    },

    members: groupMembers,

    expenses: expenseSummaries,
  };
};

module.exports = {
  getGroupDashboard,
};