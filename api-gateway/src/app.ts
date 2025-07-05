import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { config } from "./config";

const app = express();

app.use(
  "/customer",
  createProxyMiddleware({
    target: config.CUSTOMER_MS_URL,
    changeOrigin: true,
    pathRewrite: { "^/customer": "" },
  }),
);

app.use(
  "/transaction",
  createProxyMiddleware({
    target: config.TRANSACTION_MS_URL,
    changeOrigin: true,
    pathRewrite: { "^/transaction": "" },
  }),
);

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
