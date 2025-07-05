import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: Number(process.env.PORT),
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
};
