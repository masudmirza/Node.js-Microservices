import { Service } from 'typedi';
import { Customer } from '../models/customer.model';
import ICustomerRepository from './interfaces/customer-repository.interface';
import ICustomer from '../models/interfaces/customer.interface';

@Service()
export default class CustomerRepository implements ICustomerRepository {
    async create(customerData: Partial<ICustomer>): Promise<ICustomer> {
        const customer = new Customer(customerData);
        return customer.save();
    }

    async findById(id: string): Promise<ICustomer | null> {
        return Customer.findById(id);
    }

    async updateBalance(id: string, balance: number): Promise<ICustomer | null> {
        const customer = await Customer.findById(id);
        
        if (!customer) return null;
        customer.updateBalance(balance);
        return customer.save();
    }
}
