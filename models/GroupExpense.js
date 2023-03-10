import mongoose from "mongoose";

const { Schema, model } = mongoose;

const groupExpenseSchema = new Schema({
  status: {
    type: String,
    default: "active",
  },
  date: {
    type: Date,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  invitedUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  acceptedUsers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  expenses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],
});
