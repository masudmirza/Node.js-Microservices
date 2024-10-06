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

CustomerSchema.methods.updateBalance = function (amount: number) {
    this.balance += amount;
};

export const Customer = model<ICustomer>('Customer', CustomerSchema);
