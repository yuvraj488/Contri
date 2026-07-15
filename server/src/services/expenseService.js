const Expense = require("../models/Expense");
const Group = require("../models/Group");
const AppError = require("../utils/AppError");

// =========================
// Create Expense
// =========================
const createExpense = async (expenseData, userId) => {
  const {
    groupId,
    title,
    amount,
    paidBy,
    participants,
    notes,
  } = expenseData;

  // Basic Validation
  if (!groupId || !title?.trim() || !paidBy) {
    throw new AppError("All required fields must be provided.", 400);
  }

  if (!amount || amount <= 0) {
    throw new AppError("Amount must be greater than zero.", 400);
  }

  if (!Array.isArray(participants) || participants.length === 0) {
    throw new AppError("At least one participant is required.", 400);
  }

  // Find Group
  const group = await Group.findById(groupId);

  if (!group || !group.isActive) {
    throw new AppError("Group not found.", 404);
  }

  // Create member lookup
  const memberIds = new Set(
    group.members.map((member) => member.toString())
  );

  // User must belong to group
  if (!memberIds.has(userId.toString())) {
    throw new AppError("You are not a member of this group.", 403);
  }

  // Paid By must belong to group
  if (!memberIds.has(paidBy.toString())) {
    throw new AppError("Selected payer is not a group member.", 403);
  }

  // Participants must belong to group
  const allParticipantsValid = participants.every((participant) =>
    memberIds.has(participant.toString())
  );

  if (!allParticipantsValid) {
    throw new AppError("Invalid participants selected.", 403);
  }

  // Create Expense
  const expense = await Expense.create({
    group: groupId,
    title,
    amount,
    paidBy,
    participants,
    notes,
    createdBy: userId,
  });

  return {
    success: true,
    message: "Expense added successfully.",
    expense: {
      id: expense._id,
      title: expense.title,
      amount: expense.amount,
      paidBy: expense.paidBy,
      participantCount: expense.participants.length,
    },
  };
};

// =========================
// Get Group Expenses
// =========================
const getGroupExpenses = async (groupId, userId) => {
  const group = await Group.findById(groupId);

  if (!group || !group.isActive) {
    throw new AppError("Group not found.", 404);
  }

  const memberIds = new Set(
    group.members.map((member) => member.toString())
  );

  if (!memberIds.has(userId.toString())) {
    throw new AppError("You are not a member of this group.", 403);
  }

  const expenses = await Expense.find({ group: groupId })
    .populate("paidBy", "fullName")
    .sort({ createdAt: -1 });

  return {
    success: true,
    expenses: expenses.map((expense) => ({
      id: expense._id,
      title: expense.title,
      amount: expense.amount,
      paidBy: expense.paidBy,
      participantCount: expense.participants.length,
      createdAt: expense.createdAt,
    })),
  };
};

// =========================
// Update Expense
// =========================
const updateExpense = async (expenseId, expenseData, userId) => {
  const {
    title,
    amount,
    paidBy,
    participants,
    notes,
  } = expenseData;

  // Basic Validation
  if (!title?.trim() || !paidBy) {
    throw new AppError("All required fields must be provided.", 400);
  }

  if (!amount || amount <= 0) {
    throw new AppError("Amount must be greater than zero.", 400);
  }

  if (!Array.isArray(participants) || participants.length === 0) {
    throw new AppError("At least one participant is required.", 400);
  }

  // Find Expense
  const expense = await Expense.findById(expenseId);

  if (!expense) {
    throw new AppError("Expense not found.", 404);
  }

  // Find Group
  const group = await Group.findById(expense.group);

  if (!group || !group.isActive) {
    throw new AppError("Group not found.", 404);
  }

  const memberIds = new Set(
    group.members.map((member) => member.toString())
  );

  // User must belong to group
  if (!memberIds.has(userId.toString())) {
    throw new AppError("You are not a member of this group.", 403);
  }

  // Only expense creator or group creator can edit
  const isExpenseCreator =
    expense.createdBy.toString() === userId.toString();

  const isGroupCreator =
    group.createdBy.toString() === userId.toString();

  if (!isExpenseCreator && !isGroupCreator) {
    throw new AppError(
      "You are not authorized to edit this expense.",
      403
    );
  }

  // Paid By validation
  if (!memberIds.has(paidBy.toString())) {
    throw new AppError("Selected payer is not a group member.", 403);
  }

  // Participants validation
  const allParticipantsValid = participants.every((participant) =>
    memberIds.has(participant.toString())
  );

  if (!allParticipantsValid) {
    throw new AppError("Invalid participants selected.", 403);
  }

  // Update Expense
  expense.title = title;
  expense.amount = amount;
  expense.paidBy = paidBy;
  expense.participants = participants;
  expense.notes = notes;

  await expense.save();

  return {
    success: true,
    message: "Expense updated successfully.",
  };
};

// =========================
// Delete Expense
// =========================
const deleteExpense = async (expenseId, userId) => {
  // Find Expense
  const expense = await Expense.findById(expenseId);

  if (!expense) {
    throw new AppError("Expense not found.", 404);
  }

  // Find Group
  const group = await Group.findById(expense.group);

  if (!group || !group.isActive) {
    throw new AppError("Group not found.", 404);
  }

  const memberIds = new Set(
    group.members.map((member) => member.toString())
  );

  // User must belong to group
  if (!memberIds.has(userId.toString())) {
    throw new AppError("You are not a member of this group.", 403);
  }

  // Only expense creator or group creator can delete
  const isExpenseCreator =
    expense.createdBy.toString() === userId.toString();

  const isGroupCreator =
    group.createdBy.toString() === userId.toString();

  if (!isExpenseCreator && !isGroupCreator) {
    throw new AppError(
      "You are not authorized to delete this expense.",
      403
    );
  }

  await Expense.findByIdAndDelete(expenseId);

  return {
    success: true,
    message: "Expense deleted successfully.",
  };
};

module.exports = {
  createExpense,
  getGroupExpenses,
  updateExpense,
  deleteExpense,
};