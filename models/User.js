import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
    },
    expTime: {
      type: Date,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    expenses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Expense",
      },
    ],
    invitedGroupExpenses: [
      {
        type: Schema.Types.ObjectId,
        ref: "GroupExpense",
      },
    ],
    acceptedGroupExpenses: [
      {
        type: Schema.Types.ObjectId,
        ref: "GroupExpense",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
