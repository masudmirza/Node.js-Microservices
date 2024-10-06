import ICustomer from '../../models/interfaces/customer.interface';
import { CustomResponse } from '../../utils/custom-response';

export default interface ICustomerService {
    createCustomer(data: Partial<ICustomer>): Promise<CustomResponse<ICustomer>>;
    getCustomer(id: string): Promise<CustomResponse<ICustomer>>;
    increaseCustomerBalance(id: string, amount: number): Promise<CustomResponse<ICustomer>>;
    decreaseCustomerBalance(id: string, amount: number): Promise<CustomResponse<ICustomer>>;
}
