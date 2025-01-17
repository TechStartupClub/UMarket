import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

// Initialize social router and get the service URL
const socialRoutes: Router = Router();
const SOCIAL_SERVICE_URL: string | undefined = process.env.SOCIAL_SERVICE_URL;
if (!SOCIAL_SERVICE_URL) {
    throw new Error("Missing SOCIAL_SERVICE_URL environment variable")
}

// Proxy requests to the social service
socialRoutes.use(
    "/posts",
    createProxyMiddleware({
        target: SOCIAL_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: { "^/social/posts": "/posts" },
    })
);

// Add more routes as necessary

export default socialRoutes; 