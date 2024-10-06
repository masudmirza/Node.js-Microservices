import { Schema, model } from 'mongoose';
import { TransactionType } from '../enums/transaction-type';
import ITransaction from './interfaces/transaction.interface';

const TransactionSchema = new Schema<ITransaction>(
    {
        sourceCustomerId: { type: Schema.Types.ObjectId, required: true },
        targetCustomerId: { type: Schema.Types.ObjectId, required: true },
        amount: { type: Number, required: true },
        type: { type: String, enum: TransactionType, required: true },
    },
    {
        timestamps: true,
    }
);

export const Transaction = model<ITransaction>('Transaction', TransactionSchema);
