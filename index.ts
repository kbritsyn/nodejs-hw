import express, { json } from 'express';
import { apiRouter } from './api';
import { db } from './api/db';

async function assertDatabaseConnectionOk() {
    try {
        await db.sequelize.authenticate();
        console.log('Database connection OK!');
    } catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error.message);
        process.exit(1);
    }
}

async function init() {
    await assertDatabaseConnectionOk();
    const port = process.env.PORT || 3005;

    const app = express();

    app.use(json());
    app.use('/api', apiRouter);

    app.listen(port, () => {
        console.log(`Server is running at ${port}`);
    });
}

init();
