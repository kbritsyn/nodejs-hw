import express, { json } from 'express';
import { apiRouter } from './api';

const app = express();

const port = 3005;

app.use(json());
app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});
