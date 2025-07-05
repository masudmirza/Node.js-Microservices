import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT,
  CUSTOMER_MS_URL: process.env.CUSTOMER_MS_URL,
  TRANSACTION_MS_URL: process.env.TRANSACTION_MS_URL,
};
