import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import {Express} from 'express';
import express from 'express';

import authPool from './config/db';
import passport from './config/passport';
import authRoutes from './routes/authRoutes';

dotenv.config({path: '../../env'});

// Initialize Express app for auth
const authApp: Express = express();
const GATEWAY_SERVICE_URL: string|undefined = process.env.GATEWAY_SERVICE_URL;
if (!GATEWAY_SERVICE_URL) {
  throw new Error('Missing GATEWAY_SERVICE_URL environment variable');
}

// Middleware
authApp.use(
    cors({
      origin: GATEWAY_SERVICE_URL,
      methods: 'GET,POST,PUT,DELETE',  // Adjust allowed methods
      allowedHeaders: 'Content-Type, Authorization',
    }),
);
authApp.use(express.json());
authApp.use(express.urlencoded({extended: true}));
authApp.use(cookieParser());
authApp.use(passport.initialize());

// Routes
authApp.use('/', authRoutes);

const port: string|Number|undefined = process.env.AUTH_SERVICE_PORT;
authApp.listen(port, () => {
  console.log(`AUTH server is listening on port ${port}`);
});

// Close Pool connection when signal is interrupted
process.on('SIGINT', async () => {
  console.log('Shutting Down');
  await authPool.end().then(() => {
    console.log('Signal Interrupted');
  });
  process.exit(0);
});

// Close Pool connection when signal is terminated
process.on('SIGTERM', async () => {
  console.log('Shutting Down');
  await authPool.end();
  process.exit(0);
});

export default authApp;
