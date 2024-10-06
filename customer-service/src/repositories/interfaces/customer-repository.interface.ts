import ICustomer from "../../models/interfaces/customer.interface";

export default interface ICustomerRepository {
    create(customerData: Partial<ICustomer>): Promise<ICustomer>;
    findById(id: string): Promise<ICustomer | null>;
    updateBalance(id: string, balance: number): Promise<ICustomer | null>;
}
