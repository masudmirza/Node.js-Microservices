// src/index.ts
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
dotenv.config();

const app = express();


app.use('/customer-proxy', createProxyMiddleware({
    target: process.env.CUSTOMER_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/customer-proxy': '' },
}));

app.use('/transaction-proxy', createProxyMiddleware({
    target: process.env.TRANSACTION_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/transactions': '' },
}));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Proxy server running on port ${PORT}`);
});
