import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.MONGO_CONNECTION_STRING;

export default async function connectToDB() {
    try {
      await mongoose.connect(dbUrl!);
      console.log('Connected to the Database');
    } catch (error) {
      console.error(error);
    }
};