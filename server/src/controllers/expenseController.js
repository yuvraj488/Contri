const asyncHandler = require("../utils/asyncHandler");
const expenseService = require("../services/expenseService");

const createExpense = asyncHandler(async (req, res) => {
  const response = await expenseService.createExpense(
    req.body,
    req.user._id
  );

  return res.status(201).json(response);
});

const getGroupExpenses = asyncHandler(async (req, res) => {
  const response = await expenseService.getGroupExpenses(
    req.params.groupId,
    req.user._id
  );

  return res.status(200).json(response);
});

const updateExpense = asyncHandler(async (req, res) => {
  const response = await expenseService.updateExpense(
    req.params.expenseId,
    req.body,
    req.user._id
  );

  return res.status(200).json(response);
});

const deleteExpense = asyncHandler(async (req, res) => {
  const response = await expenseService.deleteExpense(
    req.params.expenseId,
    req.user._id
  );

  return res.status(200).json(response);
});

module.exports = {
  createExpense,
  getGroupExpenses,
  updateExpense,
  deleteExpense,
};