import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import {NextFunction, Request, Response} from 'express';

import authRoutes from './routes/authRoutes';
import marketRoutes from './routes/marketRoutes';
import socialRoutes from './routes/socialRoutes';
// import msgRoutes from "./routes/msgRoutes";

// Load environment variables from .env file
dotenv.config({path: '../../.env'});

// Initialize the express server
const app = express();
const GATEWAY_PORT: string|undefined = process.env.GATEWAY_SERVICE_PORT;
if (!GATEWAY_PORT) {
  throw new Error('Missing GATEWAY_PORT environment variable');
}

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173',  // replace with frontend url
  credentials: true
}));
app.use(cookieParser());

// debug middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

// routes for each microservice
app.use('/auth', authRoutes);
app.use('/social', socialRoutes);
app.use('/market', marketRoutes);
// app.use("/message", msgRoutes);

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// debug middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Outgoing request: ${req.method} ${req.path}`);
  next();
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error occurred:', err.message);

  res.status((err as any).status || 500).json({
    success: false,
    message: err.message || 'Something went wrong. Try again later.',
  });
});

// Start the server and listen on the specified port
app.listen(GATEWAY_PORT, () => {
  console.log(`GATEWAY running on port ${GATEWAY_PORT}`);
});