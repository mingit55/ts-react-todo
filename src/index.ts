import * as path from 'path';
import * as dotenv from 'dotenv';
import 'module-alias/register';
dotenv.config();
const host: String = process.env.host || 'localhost';
const port: Number = Number(process.env.port) || 8080;

import * as express from 'express';
import { urlencoded } from 'body-parser';
const app: express.Application = express();
app.set('views', path.resolve(__dirname, 'views'));
app.set('view eingine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(urlencoded({ extended: false }));
app.use('/static', express.static(path.resolve(__dirname, 'static')));

import indexRouter from './routes';
app.use(indexRouter);

app.listen(port, () => {
  console.log(`start express server in http://${host}:${port}`);
});
