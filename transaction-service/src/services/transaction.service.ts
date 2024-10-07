import { Service } from 'typedi';
import ITransactionService from './interfaces/transaction-service.interface';
import TransactionRepository from '../repositories/transaction.repository';
import CustomResponse from '../utils/custom-response';
import ITransaction from '../models/interfaces/transaction.interface';
import { decreaseCustomerBalance, getCustomerInfo, increaseCustomerBalance } from '../customer-grpc-client';
import CustomError from '../utils/custom-error';
import { ErrorCode } from '../enums/error-code';
import mongoose from 'mongoose';
import { TransactionType } from '../enums/transaction-type';

@Service()
export default class TransactionService implements ITransactionService {
    constructor(private readonly transactionRepository: TransactionRepository) {}

    async topUp(sourceCustomerId: string, amount: number): Promise<CustomResponse<ITransaction>> {
        try {
            const customer = await getCustomerInfo(sourceCustomerId);

            if (!customer) {
                throw new CustomError(404, ErrorCode.SOURCE_CUSTOMER_NOT_FOUND);
            }

            await increaseCustomerBalance(sourceCustomerId, amount);

            const transactionData = {
                sourceCustomerId: new mongoose.Types.ObjectId(sourceCustomerId),
                targetCustomerId: new mongoose.Types.ObjectId(sourceCustomerId),
                amount,
                type: TransactionType.TOP_UP,
            };

            const result = await this.transactionRepository.create(transactionData);

            return new CustomResponse<ITransaction>(201, result);
        } catch (error: any) {
            throw new CustomError(error.statusCode || 500, error.errorCode || ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

    async purchase(sourceCustomerId: string, amount: number): Promise<CustomResponse<ITransaction>> {
        try {
            const customer = await getCustomerInfo(sourceCustomerId);
            if (!customer) {
                throw new CustomError(404, ErrorCode.SOURCE_CUSTOMER_NOT_FOUND);
            }
            if (customer.balance < amount) {
                throw new CustomError(400, ErrorCode.INSUFFICIENT_BALANCE);
            }

            await decreaseCustomerBalance(sourceCustomerId, amount);

            const transactionData = {
                sourceCustomerId: new mongoose.Types.ObjectId(sourceCustomerId),
                targetCustomerId: new mongoose.Types.ObjectId(sourceCustomerId),
                amount,
                type: TransactionType.PURCHASE,
            };

            const result = await this.transactionRepository.create(transactionData);

            return new CustomResponse<ITransaction>(201, result);
        } catch (error: any) {
            throw new CustomError(error.statusCode || 500, error.errorCode || ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

    async refund(sourceCustomerId: string, amount: number): Promise<CustomResponse<ITransaction>> {
        try {
            const transaction = await this.transactionRepository.getLast(sourceCustomerId, TransactionType.PURCHASE);

            if (!transaction) {
                throw new CustomError(404, ErrorCode.PURCHASE_NOT_FOUND);
            }
            if (transaction.amount < amount) {
                throw new CustomError(400, ErrorCode.REFUND_AMOUNT_EXCEEDS_PURCHASE_AMOUNT);
            }

            await increaseCustomerBalance(sourceCustomerId, amount);

            const refundData = {
                sourceCustomerId: new mongoose.Types.ObjectId(sourceCustomerId),
                targetCustomerId: new mongoose.Types.ObjectId(sourceCustomerId),
                amount,
                type: TransactionType.REFUND,
            };

            const result = await this.transactionRepository.create(refundData);

            return new CustomResponse<ITransaction>(201, result);
        } catch (error: any) {
            throw new CustomError(error.statusCode || 500, error.errorCode || ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

    async transfer(sourceCustomerId: string, targetCustomerId: string, amount: number): Promise<CustomResponse<ITransaction>> {
        try {
            const sourceCustomer = await getCustomerInfo(sourceCustomerId);
            const targetCustomer = await getCustomerInfo(targetCustomerId);

            if (!sourceCustomer) {
                throw new CustomError(404, ErrorCode.SOURCE_CUSTOMER_NOT_FOUND);
            }
            if (!targetCustomer) {
                throw new CustomError(404, ErrorCode.TARGET_CUSTOMER_NOT_FOUND);
            }
            if (sourceCustomer.balance < amount) {
                throw new CustomError(400, ErrorCode.INSUFFICIENT_BALANCE);
            }

            await increaseCustomerBalance(sourceCustomerId, amount);
            await decreaseCustomerBalance(targetCustomerId, amount);

            const transactionData = {
                sourceCustomerId: new mongoose.Types.ObjectId(sourceCustomerId),
                targetCustomerId: new mongoose.Types.ObjectId(targetCustomerId),
                amount,
                type: TransactionType.TRANSFER,
            };

            const result = await this.transactionRepository.create(transactionData);

            return new CustomResponse<ITransaction>(201, result);
        } catch (error: any) {
            throw new CustomError(error.statusCode || 500, error.errorCode || ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }
}
