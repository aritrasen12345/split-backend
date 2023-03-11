import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: Schema.Types.String,
      required: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    name: {
      type: Schema.Types.String,
      required: true,
    },
    isVerified: {
      type: Schema.Types.Boolean,
      default: false,
    },
    uniqueString: {
      type: Schema.Types.String,
    },
    expirationTime: {
      type: Schema.Types.Date,
    },
    isDeleted: {
      type: Schema.Types.Boolean,
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
