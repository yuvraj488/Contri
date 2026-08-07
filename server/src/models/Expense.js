const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },

    paidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Equal or Custom split
    splitType: {
      type: String,
      enum: ["equal", "custom"],
      default: "equal",
      required: true,
    },

    // Used for equal split
    participants: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      required: true,
      validate: {
        validator: (participants) => participants.length > 0,
        message: "At least one participant is required.",
      },
    },

    // Used only when splitType === "custom"
    customSplits: {
      type: [
        {
          member: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },

          amount: {
            type: Number,
            required: true,
            min: 0,
          },
        },
      ],
      default: [],
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;