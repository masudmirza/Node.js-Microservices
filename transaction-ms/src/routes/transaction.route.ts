import { Router } from "express";
import { Service } from "typedi";
import TransactionController from "../controllers/transaction.controller";

@Service()
export default class TransactionRouter {
  router: Router;

  constructor(private readonly transactionController: TransactionController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/top-up",
      this.transactionController.topUp.bind(this.transactionController),
    );
    this.router.post(
      "/purchase",
      this.transactionController.purchase.bind(this.transactionController),
    );
    this.router.post(
      "/refund",
      this.transactionController.refund.bind(this.transactionController),
    );
    this.router.post(
      "/transfer",
      this.transactionController.transfer.bind(this.transactionController),
    );
  }
}
