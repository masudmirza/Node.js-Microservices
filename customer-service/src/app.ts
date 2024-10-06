import 'reflect-metadata';
import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import connectToDB from './helpers/db.helper';
import { Container } from 'typedi';
import AppRoutes from './routes/route';

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT;

connectToDB();

const appRoutes = Container.get(AppRoutes);
app.use('/api/v1', appRoutes.router);


app.listen(port, () => {
    console.log(`Server running on http://127.0.0.1:${port}`);
});
