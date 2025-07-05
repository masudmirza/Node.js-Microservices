import { Router } from "express";
import { Service } from "typedi";
import TransactionRouter from "./transaction.route";

@Service()
export default class AppRoutes {
  router: Router;

  constructor(private readonly transactionRouter: TransactionRouter) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use("/transactions", this.transactionRouter.router);
  }
}
