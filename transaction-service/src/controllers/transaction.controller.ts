import { Service } from 'typedi';
import TransactionService from '../services/transaction.service';
import { Request, Response } from 'express';


@Service()
export default class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    async topUp(req: Request, res: Response) {
        try {
            const { sourceCustomerId, amount } = req.body;
            const response = await this.transactionService.topUp(sourceCustomerId, amount);
            res.status(response.statusCode).json(response);
        } catch (error: any) {
            res.status(error.statusCode).json(error);
        }
    }

    async purchase(req: Request, res: Response) {
        try {
            const { sourceCustomerId, amount } = req.body;
            const response = await this.transactionService.purchase(sourceCustomerId, amount);
            res.status(response.statusCode).json(response);
        } catch (error: any) {
            res.status(error.statusCode).json(error);
        }
    }

    async refund(req: Request, res: Response) {
        try {
            const { sourceCustomerId, amount } = req.body;
            const response = await this.transactionService.refund(sourceCustomerId, amount);
            res.status(response.statusCode).json(response);
        } catch (error: any) {
            res.status(error.statusCode).json(error);
        }
    }

    async transfer(req: Request, res: Response) {
        try {
            const { sourceCustomerId, targetCustomerId, amount } = req.body;
            const response = await this.transactionService.transfer(sourceCustomerId, targetCustomerId, amount);
            res.status(response.statusCode).json(response);
        } catch (error: any) {
            res.status(error.statusCode).json(error);
        }
    }
}
