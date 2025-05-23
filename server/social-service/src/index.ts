import cors from 'cors';
import dotenv from 'dotenv'
import {Express} from 'express';
import express from 'express';

import socialPool from './config/db';
import socialRoutes from './routes/socialRoutes';
import cookieParser from 'cookie-parser';

dotenv.config({path: '../../.env'});

// Initialize Express app for social services
const socialServiceApp: Express = express();

const port: string|Number|undefined = process.env.SOCIAL_SERVICE_PORT;

// Middleware
socialServiceApp.use(cors());
socialServiceApp.use(cookieParser())
socialServiceApp.use(express.json());
socialServiceApp.use(express.urlencoded({extended: true}));

// Routes
socialServiceApp.use('/', socialRoutes);

socialServiceApp.listen(port, () => {
  console.log(`social server is listening on port ${port}`);
});

// Close Pool connection when signal is interrupted
process.on('SIGINT', async () => {
  console.log('Shutting down social server');
  await socialPool.end();
  process.exit(0);
});

// Close Pool connection when signal is terminated
process.on('SIGTERM', async () => {
  console.log('Shutting down social server');
  await socialPool.end();
  process.exit(0);
});

export default socialServiceApp;
