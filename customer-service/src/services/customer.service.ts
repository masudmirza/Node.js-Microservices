import { Service } from 'typedi';
import { CustomError } from '../utils/customer-error';
import { CustomResponse } from '../utils/custom-response';
import ICustomerService from './interfaces/customer-service.interface';
import ICustomer from '../models/interfaces/customer.interface';
import { ErrorCode } from '../enums/error-message';
import CustomerRepository from '../repositories/customer.repository';

@Service()
export default class CustomerService implements ICustomerService {
    constructor(private readonly customerRepository: CustomerRepository) {}

    async createCustomer(data: Partial<ICustomer>): Promise<CustomResponse<ICustomer>> {
        try {
            const result = await this.customerRepository.create(data);
            return new CustomResponse<ICustomer>(201, result);
        } catch (error: any) {
            throw new CustomError(error.statusCode || 500, error.code);
        }
    }
    

    async getCustomer(id: string): Promise<CustomResponse<ICustomer>> {
        try {
            const result = await this.customerRepository.findById(id);
            if (!result) {
                throw new CustomError(404, ErrorCode.CUSTOMER_NOT_FOUND);
            }
            return new CustomResponse<ICustomer>(200, result);
        } catch (error: any) {
            throw new CustomError(error.statusCode || 500, error.code);
        }
    }

    async updateCustomerBalance(id: string, amount: number): Promise<CustomResponse<ICustomer>> {
        try {
            const updatedCustomer = await this.customerRepository.updateBalance(id, amount);
            
            if (!updatedCustomer) {
                throw new CustomError(404, ErrorCode.CUSTOMER_NOT_FOUND);
            }
            return new CustomResponse<ICustomer>(200, updatedCustomer);
        } catch (error: any) {
            throw new CustomError(error.statusCode || 500, error.code);
        }
    }
}
