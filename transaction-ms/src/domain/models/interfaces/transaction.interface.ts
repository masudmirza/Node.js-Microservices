import mongoose, { Document } from "mongoose";
import { TransactionStatus } from "../../enums/transaction-status";
import { TransactionType } from "../../enums/transaction-type";

export default interface ITransaction extends Document {
  sourceCustomer: mongoose.Types.ObjectId;
  targetCustomer: mongoose.Types.ObjectId;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
}
