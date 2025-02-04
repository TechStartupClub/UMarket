import { Express } from "express";
import express from "express";
import dotenv from "dotenv"
import authPool from "./config/db";
import cors from "cors";
import authRoutes from "./routes/authRoutes";

dotenv.config({ path: "../../.env" });

// Initialize Express app for auth
const authApp: Express = express();

const port: string | Number | undefined = process.env.AUTH_SERVICE_PORT;

// Middleware
authApp.use(cors());
authApp.use(express.json());
authApp.use(express.urlencoded({ extended: true }));

// Routes
authApp.use("/", authRoutes);

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