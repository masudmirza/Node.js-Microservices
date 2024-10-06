import { Router } from 'express';
import { Service } from 'typedi';
import TransactionRouter from './transaction.route';

@Service()
export default class AppRoutes {
    public router: Router;

    constructor(private transactionRouter: TransactionRouter) {        
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.use('/transactions', this.transactionRouter.router);
    }
}
