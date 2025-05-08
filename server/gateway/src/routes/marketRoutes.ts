import dotenv from 'dotenv';
import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import verifyToken from '../middleware/verification';

dotenv.config({ path: '../../.env' });

// Initialize market router and get the service URL
const marketRoutes: Router = Router();
const MARKET_SERVICE_URL: string | undefined = process.env.MARKET_SERVICE_URL;
if (!MARKET_SERVICE_URL) {
    throw new Error('Missing MARKET_SERVICE_URL environment variable');
}

marketRoutes.use('/public', createProxyMiddleware({
    target: MARKET_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/public': '/' },
    // debug
    on: {
        proxyReq: (proxyReq, req, res) => {
            console.log('PUBLIC')
            console.log(
                'Proxying request to:',
                MARKET_SERVICE_URL + proxyReq.path);
        },
        error: (err, req, res) => {
            console.error('Proxy Error:', err);
            res.end(JSON.stringify({
                error: 'Proxy Error',
                details: err.message,
                target: MARKET_SERVICE_URL,
                path: req.url
            }));
        }
    }
}));

marketRoutes.use('/', verifyToken, createProxyMiddleware({
    target: MARKET_SERVICE_URL,
    changeOrigin: true,
    // debug
    on: {
        proxyReq: (proxyReq, req, res) => {
            console.log('PROTECTED')
            console.log(
                'Proxying request to:',
                MARKET_SERVICE_URL + proxyReq.path);
        },
        error: (err, req, res) => {
            console.error('Proxy Error:', err);
            res.end(JSON.stringify({
                error: 'Proxy Error',
                details: err.message,
                target: MARKET_SERVICE_URL,
                path: req.url
            }));
        }
    }
}));



// Add more routes as necessary
export default marketRoutes;