import { Schema, model } from "mongoose";
import IOutbox from "./interfaces/outbox.interface";
import { KafkaTopic } from "../enums/kafka-topic";

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
