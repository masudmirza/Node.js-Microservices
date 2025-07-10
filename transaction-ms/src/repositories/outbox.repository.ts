import { ClientSession } from "mongoose";
import { Service } from "typedi";
import IOutboxRepository from "./interfaces/outbox-repository.interface";
import IOutbox from "../domain/models/interfaces/outbox.interface";
import { Outbox } from "../domain/models/outbox.model";

@Service()
export default class OutboxRepository implements IOutboxRepository {
  async create(outboxData: Partial<IOutbox>, session: ClientSession): Promise<IOutbox> {
    const outbox = new Outbox(outboxData);
    return await outbox.save({ session });
  }
}
