import mongoose from "mongoose";

const { Schema, model } = mongoose;

const expenseSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "other",
    },
    paymentId: {
      type: String,
    },
    purpose: {
      type: String,
      required: true,
    },
    reciept: {
      type: String,
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
