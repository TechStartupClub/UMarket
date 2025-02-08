import { Express } from "express";
import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import authPool from "./config/db";
import authRoutes from "./routes/authRoutes";

dotenv.config({ path: "../../env" });

// Initialize Express app for auth
const authApp: Express = express();

// Middleware
authApp.use(cors());
authApp.use(express.json());
authApp.use(express.urlencoded({ extended: true }));
authApp.use(cookieParser());
authApp.use(passport.initialize());

// Routes
authApp.use("/", authRoutes);

const port: string | Number | undefined = process.env.AUTH_SERVICE_PORT;
authApp.listen(port, () => {
    console.log(`AUTH server is listening on port ${port}`);
});

// Close Pool connection when signal is interrupted
process.on('SIGINT', async () => {
    console.log("Shutting Down");
    await authPool.end().then(() => {
        console.log("Signal Interrupted");
    });
    process.exit(0);
});

// Close Pool connection when signal is terminated
process.on('SIGTERM', async () => {
    console.log("Shutting Down");
    await authPool.end();
    process.exit(0);
});

export default authApp;