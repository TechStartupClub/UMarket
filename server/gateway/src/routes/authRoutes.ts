import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import dotenv from "dotenv"
dotenv.config({ path: "../../.env" });

// Initialize auth router and get the service URL
const authRoutes: Router = Router();
const AUTH_SERVICE_URL: string | undefined = process.env.AUTH_SERVICE_URL;
if (!AUTH_SERVICE_URL) {
    throw new Error("Missing AUTH_SERVICE_URL environment variable")
}

// Proxy all requests under `/auth` to the auth microservice
authRoutes.use(
    "/",
    createProxyMiddleware({
        target: AUTH_SERVICE_URL,
        changeOrigin: true,
        // pathRewrite: { "^/auth": "" }, // works without this
    })
);

export default authRoutes; 