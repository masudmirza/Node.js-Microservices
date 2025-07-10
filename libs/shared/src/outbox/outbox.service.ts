import { ClientSession } from "mongoose";
import IOutbox from "./outbox.interface";
import { Outbox } from "./outbox.model";

export const createOutbox = async (
  body: Partial<IOutbox>,
  session: ClientSession,
): Promise<IOutbox> => {
  const result = new Outbox(body);
  return await result.save({ session });
};
