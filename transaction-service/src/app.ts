import express, { Express } from 'express';
import dotenv from 'dotenv';
import connectToDB from './helpers/db';

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT;

connectToDB();

app.listen(port, () => {
    console.log(`Server running on the http://localhost:${port}`);
})