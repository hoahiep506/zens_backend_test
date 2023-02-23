import env from 'dotenv';
import express, { Express } from 'express';
import jokeRouter from './router/joke';
const cors = require('cors');

env.config();
const app: Express = express();
app.use(cors());
const port = process.env.PORT;

app.use(express.json());
app.use('/api', jokeRouter);

app.listen(port, () => {
  console.log(`Express running → ${port}`);
});
