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

// Proxy requests to the auth service
authRoutes.use(
    "/register",
    createProxyMiddleware({
        target: AUTH_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: { "^/auth/register": "/register" },
    })
);

// Add more routes as necessary

export default authRoutes; 