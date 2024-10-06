import mongoose, { Document } from 'mongoose';
import { TransactionType } from '../../enums/transaction-type';

export default interface ITransaction extends Document {
    sourceCustomerId: mongoose.Types.ObjectId;
    targetCustomerId: mongoose.Types.ObjectId;
    amount: number;
    type: TransactionType;
}
