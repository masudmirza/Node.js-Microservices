import { Service } from "typedi";
import { CustomError } from "../utils/custom-error";
import { CustomResponse } from "../utils/custom-response";
import ICustomerService from "./interfaces/customer-service.interface";
import ICustomer from "../models/interfaces/customer.interface";
import { ErrorCode } from "../enums/error-code";
import CustomerRepository from "../repositories/customer.repository";

@Service()
export default class CustomerService implements ICustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async createCustomer(body: Partial<ICustomer>): Promise<CustomResponse<ICustomer>> {
    try {
      const result = await this.customerRepository.create(body);

      return new CustomResponse<ICustomer>(201, result);
    } catch (error: any) {
      throw new CustomError(
        error.statusCode || 500,
        error.errorCode || ErrorCode.INTERNAL_SERVER_ERROR,
      );
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
      throw new CustomError(
        error.statusCode || 500,
        error.errorCode || ErrorCode.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async increaseCustomerBalance(
    id: string,
    amount: number,
  ): Promise<CustomResponse<ICustomer>> {
    try {
      const updatedCustomer = await this.customerRepository.increaseBalance(id, amount);

      if (!updatedCustomer) {
        throw new CustomError(404, ErrorCode.CUSTOMER_NOT_FOUND);
      }

      return new CustomResponse<ICustomer>(200, updatedCustomer);
    } catch (error: any) {
      throw new CustomError(
        error.statusCode || 500,
        error.errorCode || ErrorCode.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async decreaseCustomerBalance(
    id: string,
    amount: number,
  ): Promise<CustomResponse<ICustomer>> {
    try {
      const updatedCustomer = await this.customerRepository.decreaseBalance(id, amount);

      if (!updatedCustomer) {
        throw new CustomError(404, ErrorCode.CUSTOMER_NOT_FOUND);
      }

      return new CustomResponse<ICustomer>(200, updatedCustomer);
    } catch (error: any) {
      throw new CustomError(
        error.statusCode || 500,
        error.errorCode || ErrorCode.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
