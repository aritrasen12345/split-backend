import mongoose from "mongoose";

const { Schema, model } = mongoose;

const groupExpenseSchema = new Schema({
  status: {
    type: Schema.Types.String,
    default: "active",
  },
  date: {
    type: Schema.Types.Date,
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
