const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const expenseController = require("../controllers/expenseController");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  expenseController.createExpense
);

router.get(
  "/group/:groupId",
  authMiddleware,
  expenseController.getGroupExpenses
);

router.put(
  "/:expenseId",
  authMiddleware,
  expenseController.updateExpense
);

router.delete(
  "/:expenseId",
  authMiddleware,
  expenseController.deleteExpense
);

module.exports = router;