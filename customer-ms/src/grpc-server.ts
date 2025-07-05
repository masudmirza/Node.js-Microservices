import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { Service } from "typedi";
import CustomerService from "./services/customer.service";
import { ErrorCode } from "./enums/error-code";

const PROTO_PATH = path.join(__dirname, "./proto/customer.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const customerProto: any = grpc.loadPackageDefinition(packageDefinition).customer;

@Service()
export class GrpcServer {
  constructor(private readonly customerService: CustomerService) {}

  start() {
    const server = new grpc.Server();
    server.addService(customerProto.CustomerService.service, {
      GetCustomerInfo: this.getCustomerInfo.bind(this),
      IncreaseCustomerBalance: this.increaseCustomerBalance.bind(this),
      DecreaseCustomerBalance: this.decreaseCustomerBalance.bind(this),
    });
    const port = "50051";
    server.bindAsync(
      `0.0.0.0:${port}`,
      grpc.ServerCredentials.createInsecure(),
      (err, bindPort) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`gRPC server is running on port ${bindPort}`);
        server.start();
      },
    );
  }

  async getCustomerInfo(call: any, callback: any) {
    const { id } = call.request;
    try {
      const customer = await this.customerService.getCustomer(id);
      if (!customer) {
        return callback({
          code: grpc.status.NOT_FOUND,
          message: ErrorCode.CUSTOMER_NOT_FOUND,
        });
      }

      const response = customer.data;

      return callback(null, response);
    } catch (error) {
      return callback({
        code: grpc.status.INTERNAL,
        message: ErrorCode.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async increaseCustomerBalance(call: any, callback: any) {
    const { id, amount } = call.request;
    try {
      const customer = await this.customerService.increaseCustomerBalance(id, amount);
      const response = customer.data;
      return callback(null, response);
    } catch (error) {
      return callback({
        code: grpc.status.INTERNAL,
        message: ErrorCode.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async decreaseCustomerBalance(call: any, callback: any) {
    const { id, amount } = call.request;
    try {
      const customer = await this.customerService.decreaseCustomerBalance(id, amount);
      const response = customer.data;
      return callback(null, response);
    } catch (error) {
      return callback({
        code: grpc.status.INTERNAL,
        message: ErrorCode.INTERNAL_SERVER_ERROR,
      });
    }
  }
}

export default GrpcServer;
