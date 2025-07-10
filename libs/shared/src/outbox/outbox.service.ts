import IOutbox from "./outbox.interface";
import { Outbox } from "./outbox.model";

export const createOutbox = async (body: Partial<IOutbox>): Promise<IOutbox> => {
  return await Outbox.create(body);
};
