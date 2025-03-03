import { Express } from "express";
import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import marketRoutes from "./routes/marketRoutes";
import marketPool from "./config/db";

dotenv.config({ path: "../../.env" });

// Initialize Express app for social services
const marketServiceApp: Express = express();

const port: string | Number | undefined = process.env.MARKET_SERVICE_PORT;

// Middleware
marketServiceApp.use(cors());
marketServiceApp.use(express.json());
marketServiceApp.use(express.urlencoded({ extended: true }));

// Routes
marketServiceApp.use("/", marketRoutes);

marketServiceApp.listen(port, () => {
    console.log(`market server is listening on port ${port}`);
});

// Close Pool connection when signal is interrupted
process.on('SIGINT', async () => {
    console.log("Shutting down social server");
    await marketPool.end();
    process.exit(0);
});

// Close Pool connection when signal is terminated
process.on('SIGTERM', async () => {
    console.log("Shutting down social server");
    await marketPool.end();
    process.exit(0);
});

export default marketServiceApp;
