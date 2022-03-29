import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import userRouter from './routers/user'
import attackRouter from './routers/attack'

import { ROUTES } from './config/paths';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(ROUTES.USER, userRouter);
app.use(ROUTES.ATTACK, attackRouter);

app.get('*', (req, res) => {
    res.json({ ok: true });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`\n Server is running on http://localhost:${port}\n`);
});