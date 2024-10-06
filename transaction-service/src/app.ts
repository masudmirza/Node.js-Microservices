import 'reflect-metadata';
import express, { Express } from 'express';
import dotenv from 'dotenv';
import connectToDB from './helpers/db';
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
    console.log(`Server running on port ${port}`);
})