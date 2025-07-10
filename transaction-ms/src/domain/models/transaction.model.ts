import { Schema, model } from "mongoose";
import ITransaction from "./interfaces/transaction.interface";
import { TransactionType } from "../enums/transaction-type";
import { TransactionStatus } from "../enums/transaction-status";

const TransactionSchema = new Schema<ITransaction>(
  {
    sourceCustomer: { type: Schema.Types.ObjectId, required: true },
    targetCustomer: { type: Schema.Types.ObjectId, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: TransactionType, required: true },
    status: {
      type: String,
      enum: TransactionStatus,
      default: TransactionStatus.IN_PROGRESS,
    },
  },
  {
    timestamps: true,
  },
);

export const Transaction = model<ITransaction>("Transaction", TransactionSchema);
