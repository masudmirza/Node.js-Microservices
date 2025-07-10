import { Document } from "mongoose";

export default interface IOutbox extends Document {
  topic: string;
  key: string;
  payload: Object;
  sent: boolean;
}
