import mongoose from "mongoose";

export default async function connectToDB(connectionString: string): Promise<void> {
  try {
    await mongoose.connect(connectionString);
    console.log("Connected to the Database");
  } catch (error) {
    console.error(error);
  }
}
