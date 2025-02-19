import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

// Initialize market router and get the service URL
const marketRoutes: Router = Router();
const MARKET_SERVICE_URL: string | undefined = process.env.MARKET_SERVICE_URL;

if (!MARKET_SERVICE_URL) {
    throw new Error("Missing MARKET_SERVICE_URL environment variable");
}

marketRoutes.use(
    "/",
    createProxyMiddleware({
        target: MARKET_SERVICE_URL,
        changeOrigin: true,
    })
);



// Add more routes as necessary
export default marketRoutes;