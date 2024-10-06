import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import CustomerService from '../services/customer.service';

@Service()
export default class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    async createCustomer(req: Request, res: Response) {
        try {
            const response = await this.customerService.createCustomer(req.body);
            res.status(response.statusCode).json(response);
        } catch (error: any) {
            res.status(error.statusCode).json(error);
        }
    }

    async getCustomer(req: Request, res: Response) {
        try {
            const response = await this.customerService.getCustomer(req.params.id);
            res.status(response.statusCode).json(response);
        } catch (error: any) {
            res.status(error.statusCode).json(error);
        }
    }
}
