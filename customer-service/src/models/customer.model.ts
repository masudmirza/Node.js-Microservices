import { Schema, model } from 'mongoose';
import ICustomer from './interfaces/customer.interface';

const CustomerSchema = new Schema<ICustomer>(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        birthDate: { type: Date, required: true },
        gsmNumber: { type: String, required: true },
        balance: { type: Number, default: 100 },
    },
    {
        timestamps: true,
    }
);

export const Customer = model<ICustomer>('Customer', CustomerSchema);
