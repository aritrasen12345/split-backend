import mongoose from "mongoose";

const { Schema, model } = mongoose;

const expenseSchema = new Schema(
  {
    amount: {
      type: Schema.Types.Number,
      required: true,
    },
    date: {
      type: Schema.Types.Date,
      required: true,
    },
    paymentMethod: {
      type: Schema.Types.String,
      required: true,
      default: "other",
    },
    paymentId: {
      type: Schema.Types.String,
    },
    purpose: {
      type: Schema.Types.String,
      required: true,
    },
    receipt: {
      type: Schema.Types.String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    groupExpense: {
      type: Schema.Types.ObjectId,
      ref: "GroupExpense",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Expense", expenseSchema);
