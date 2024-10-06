import { Service } from 'typedi';
import { Customer } from '../models/customer.model';
import ICustomerRepository from './interfaces/customer-repository.interface';
import ICustomer from '../models/interfaces/customer.interface';

@Service()
export default class CustomerRepository implements ICustomerRepository {
    async create(body: Partial<ICustomer>): Promise<ICustomer> {
        const customer = new Customer(body);
        return customer.save();
    }

    async findById(id: string): Promise<ICustomer | null> {
        return Customer.findById(id);
    }

    async increaseBalance(id: string, amount: number): Promise<ICustomer | null> {
        return await Customer.findByIdAndUpdate(
            id,
            { $inc: { balance: amount } },
            { new: true }
        ).exec();
    }

    async decreaseBalance(id: string, amount: number): Promise<ICustomer | null> {
        return await Customer.findByIdAndUpdate(
            id,
            { $inc: { balance: -amount } },
            { new: true }
        ).exec();
    }
}
