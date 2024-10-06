import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.join(__dirname, './proto/customer.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const customerProto: any = grpc.loadPackageDefinition(packageDefinition).customer;

const client = new customerProto.CustomerService('localhost:50051', grpc.credentials.createInsecure());

export const getCustomerInfo = (id: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        client.GetCustomerInfo({ id }, (error: any, response: any) => {
            if (error) {
                return reject(error);
            }
            return resolve(response);
        });
    });
};

export const increaseCustomerBalance = (id: string, amount: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        client.increaseCustomerBalance({ id, amount }, (error: any, response: any) => { // Ensure correct casing
            if (error) {
                return reject(error);
            }
            return resolve(response);
        });
    });
};

export const decreaseCustomerBalance = (id: string, amount: number): Promise<any> => {
    return new Promise((resolve, reject) => {
        client.decreaseCustomerBalance({ id, amount }, (error: any, response: any) => {
            if (error) {
                return reject(error);
            }
            return resolve(response);
        });
    });
};
