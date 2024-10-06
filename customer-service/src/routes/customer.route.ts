import { Router } from 'express';
import { Service } from 'typedi';
import CustomerController from '../controllers/customer.controller';

@Service()
export default class CustomerRoute {
    public router: Router;

    constructor(private customerController: CustomerController) {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/', this.customerController.createCustomer.bind(this.customerController));
        this.router.get('/:id', this.customerController.getCustomer.bind(this.customerController));
        this.router.put('/:id/balance', this.customerController.updateCustomerBalance.bind(this.customerController));
    }
}
