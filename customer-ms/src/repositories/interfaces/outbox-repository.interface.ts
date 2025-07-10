import { ClientSession } from "mongoose";
import IOutbox from "../../domain/models/interfaces/outbox.interface";

export default interface IOutboxRepository {
  create(transactionData: Partial<IOutbox>, session: ClientSession): Promise<IOutbox>;
}
