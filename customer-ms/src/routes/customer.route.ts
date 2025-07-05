import { Router } from "express";
import { Service } from "typedi";
import CustomerController from "../controllers/customer.controller";

@Service()
export default class CustomerRoute {
  router: Router;

  constructor(private readonly customerController: CustomerController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/",
      this.customerController.createCustomer.bind(this.customerController),
    );
    this.router.get(
      "/:id",
      this.customerController.getCustomer.bind(this.customerController),
    );
  }
}
