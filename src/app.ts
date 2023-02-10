import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import userRouter from './handlers/user.route';
import orderRouter from './handlers/order.route';
import productRouter from './handlers/product.route';

dotenv.config();
const app: Application = express();
const port = process.env.PORT || 3001;
//middleware logger
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(userRouter, orderRouter, productRouter);

app.get('/', (req: Request, res: Response): void => {
  res.send(`<h1>Welcome To StoreFront Backend</h1>`);
});

app.listen(port, () => {
  console.log(`⚡️[Server]: Server is running at http://localhost:${port}`);
});

export default app;
