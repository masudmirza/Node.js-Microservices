import { Schema, model } from "mongoose";
import { KafkaTopic } from "../enums/kafka-topic";
import IOutbox from "./interfaces/outbox.interface";

const OutboxSchema = new Schema<IOutbox>(
  {
    topic: { type: String, enum: KafkaTopic, required: true },
    key: { type: String, required: true },
    payload: { type: Object, required: true },
    sent: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Outbox = model<IOutbox>("Outbox", OutboxSchema);
