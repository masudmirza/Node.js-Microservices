import { Router } from "express";
import { Service } from "typedi";
import CustomerRoute from "./customer.route";

@Service()
export default class AppRoutes {
  router: Router;

  constructor(private readonly customerRoute: CustomerRoute) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use("/customers", this.customerRoute.router);
  }
}
