import { TransactionType } from "../../enums/transaction-type";
import ITransaction from "../../models/interfaces/transaction.interface";

export default interface ITransactionRepository {
  create(transactionData: Partial<ITransaction>): Promise<ITransaction>;
  findById(id: string): Promise<ITransaction | null>;
  update(id: string, updatedData: Partial<ITransaction>): Promise<ITransaction | null>;
  getLast(
    sourceCustomerId: string,
    type: TransactionType | null,
  ): Promise<ITransaction | null>;
}
