//nodeJS app instance for market
import { Express } from "express";
import express from "express";
import dotenv from "dotenv"
import marketPool from "./config/db";
import cors from "cors";
import marketRoutes from "./routes/marketRoutes";
import path from "path"

// dotenv.config({ path: "../../env" });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Initialize Express app for market
const marketApp: Express = express();

const port: string | Number | undefined = process.env.MARKET_SERVICE_PORT;

// Middleware
marketApp.use(cors());
marketApp.use(express.json());
marketApp.use(express.urlencoded({ extended: true }));

// Routes
marketApp.use("/", marketRoutes);

marketApp.listen(port, () => {
    console.log(`Market server is listening on port ${port}`);
});

// Close Pool connection when signal is interrupted
process.on('SIGINT', async () => {
    console.log("Shutting Down");
    await marketPool.end().then(() => {
        console.log("Signal Interrupted");
    });
    process.exit(0);
});

// Close Pool connection when signal is terminated
process.on('SIGTERM', async () => {
    console.log("Shutting Down");
    await marketPool.end();
    process.exit(0);
});

export default marketApp;