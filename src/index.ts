import * as dotenv from 'dotenv';
import 'module-alias/register';
dotenv.config();
const host : String = process.env.host || 'localhost';
const port : Number = Number(process.env.port) || 8080;


import * as express from 'express';
import { urlencoded } from 'body-parser';
const app : express.Application = express();
app.use(urlencoded({ extended: false }))


import indexRouter from './routes';
app.use(indexRouter);

app.listen(port, () => {
  console.log(`start express server in http://${host}:${port}`);
});