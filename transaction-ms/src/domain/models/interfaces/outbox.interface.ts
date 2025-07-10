import { Document } from "mongoose";
import { KafkaTopic } from "../../enums/kafka-topic";

export default interface IOutbox extends Document {
  topic: KafkaTopic;
  key: string;
  payload: Object;
  sent: boolean;
}
