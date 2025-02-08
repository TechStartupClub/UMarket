import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import authRoutes from "./routes/authRoutes";
import socialRoutes from "./routes/socialRoutes";
import marketRoutes from "./routes/marketRoutes";
// import msgRoutes from "./routes/msgRoutes";

// Load environment variables from .env file
dotenv.config({ path: "../../.env" });

// Initialize the express server
const app = express();
const GATEWAY_PORT: string | undefined = process.env.GATEWAY_PORT;
if (!GATEWAY_PORT) {
    throw new Error("Missing GATEWAY_PORT environment variable");
}

// Enable CORS
app.use(cors());

// debug middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`Incoming request: ${req.method} ${req.path}`);
    next();
});

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes for each microservice
app.use("/auth", authRoutes);
app.use("/social", socialRoutes);
app.use("/market", marketRoutes);
// app.use("/message", msgRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("Error occurred:", err.message);

    res.status((err as any).status || 500).json({
        success: false,
        message: err.message || "Something went wrong. Try again later.",
    });
});

// Start the server and listen on the specified port
app.listen(GATEWAY_PORT, () => {
    console.log(`GATEWAY running on port ${GATEWAY_PORT}`);
});