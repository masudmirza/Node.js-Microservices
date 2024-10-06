import ITransaction from '../../models/interfaces/transaction.interface';
import CustomResponse from '../../utils/custom-response';

export default interface ITransactionService {
    topUp(sourceCustomerId: string, amount: number): Promise<CustomResponse<ITransaction>>;
    purchase(sourceCustomerId: string, amount: number): Promise<CustomResponse<ITransaction>>;
    refund(sourceCustomerId: string, amount: number): Promise<CustomResponse<ITransaction>>;
    transfer(sourceCustomerId: string, targetCustomerId: string, amount: number): Promise<CustomResponse<ITransaction>>;
}
