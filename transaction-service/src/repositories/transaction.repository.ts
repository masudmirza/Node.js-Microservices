import { Service } from 'typedi';
import ITransactionRepository from './interfaces/transaction-repository.interface';
import ITransaction from '../models/interfaces/transaction.interface';
import { TransactionType } from '../enums/transaction-type';
import { Transaction } from '../models/transaction.model';

@Service()
export default class TransactionRepository implements ITransactionRepository {

    async create(transactionData: Partial<ITransaction>): Promise<ITransaction> {
        const transaction = new Transaction(transactionData);
        return await transaction.save();
    }

    async findById(id: string): Promise<ITransaction | null> {
        return await Transaction.findById(id).exec();
    }

    async update(id: string, updateData: Partial<ITransaction>): Promise<ITransaction | null> {
        return await Transaction.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }

    async getLast(id: string, type: TransactionType): Promise<ITransaction> {
        console.log(id)
        console.log(type);
        ;
        
        const transaction = await Transaction.find({ sourceCustomerId: id, type }).sort({ createdAt: -1 }).limit(1);
        console.log(transaction);
        
        return transaction[0];
    }
}
