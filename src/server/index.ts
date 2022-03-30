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

// console.log('user:', ROUTES.USER, 'attack:', ROUTES.ATTACK);

app.get('*', (req, res) => {
    // console.log(req);
    res.json({ ok: true });
});

// app.post('*', (req, res) => {
//     console.log(req);
//     res.json({ ok: true });
// });

const port = process.env.PORT || 4000;
const url = process.env.REACT_APP_API_URL;

// console.log('attack url:', url + ROUTES.ATTACK);
// console.log('user url:', url + ROUTES.USER);

app.listen(port, () => {
    console.log(`\n Server is running on ${url}\n`);
});