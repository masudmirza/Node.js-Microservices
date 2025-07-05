import mongoose from "mongoose";
import { config } from "../config";

export default async function connectToDB() {
  try {
    console.log(config.MONGO_CONNECTION_STRING);

    await mongoose.connect(config.MONGO_CONNECTION_STRING!);
    console.log("Connected to the Database");
  } catch (error) {
    console.error(error);
  }
}
