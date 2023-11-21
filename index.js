import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import initializeAdminUser from './init.js';

import UserRouter from './routers/UserRouter.js';
import AuthRouter from './routers/AuthRouter.js';
import CryptoRouter from './routers/CryptoRouter.js';
import logger from './middlewares/Logger.js';

const app = express();
const port = 4000;

mongoose.connect(process.env.DB_URI)
    .then(() => console.log('Connection to MongoDB: SUCCESS !'))
    .catch(err => console.error('Connection to MongoDB: FAILED...', err));

app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/api', AuthRouter);
app.use('/api/users', UserRouter);
app.use('/api/cryptos', CryptoRouter);

await initializeAdminUser();

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});