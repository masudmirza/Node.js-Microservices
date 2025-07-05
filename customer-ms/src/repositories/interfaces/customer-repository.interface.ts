import ICustomer from "../../models/interfaces/customer.interface";

export default interface ICustomerRepository {
  create(body: Partial<ICustomer>): Promise<ICustomer>;
  findById(id: string): Promise<ICustomer | null>;
  increaseBalance(id: string, balance: number): Promise<ICustomer | null>;
  decreaseBalance(id: string, balance: number): Promise<ICustomer | null>;
}
