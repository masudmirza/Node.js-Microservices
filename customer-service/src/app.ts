import 'reflect-metadata';
import express, { Express } from 'express';
import dotenv from 'dotenv';
import connectToDB from './helpers/db.helper';
import { Container } from 'typedi';
import AppRoutes from './routes/route';
import GrpcServer from './grpc-server';

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT;

connectToDB();

const appRoutes = Container.get(AppRoutes);
app.use('/api/v1', appRoutes.router);

const grpcServer = Container.get(GrpcServer);
grpcServer.start();


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
