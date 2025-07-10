import { Document } from "mongoose";

export default interface ICustomer extends Document {
  name: string;
  surname: string;
  birthDate: Date;
  gsmNumber: string;
  balance: number;
}
