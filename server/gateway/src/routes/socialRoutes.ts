import dotenv from 'dotenv'
import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

import verifyToken from '../middleware/verification';

dotenv.config({ path: '../../.env' });

// Initialize social router and get the service URL
const socialRoutes: Router = Router();
const SOCIAL_SERVICE_URL: string | undefined = process.env.SOCIAL_SERVICE_URL;
if (!SOCIAL_SERVICE_URL) {
    throw new Error('Missing SOCIAL_SERVICE_URL environment variable');
}

socialRoutes.use('/public', createProxyMiddleware({
    target: SOCIAL_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/public': '/' },
    // debug
    on: {
        proxyReq: (proxyReq, req, res) => {
            console.log('PUBLIC')
            console.log(
                'Proxying request to:',
                SOCIAL_SERVICE_URL + proxyReq.path);
        },
        error: (err, req, res) => {
            console.error('Proxy Error:', err);
            res.end(JSON.stringify({
                error: 'Proxy Error',
                details: err.message,
                target: SOCIAL_SERVICE_URL,
                path: req.url
            }));
        }
    }
}));

// FIXME:
// socialRoutes.use('/', verifyToken, createProxyMiddleware({
socialRoutes.use('/', createProxyMiddleware({
    target: SOCIAL_SERVICE_URL,
    changeOrigin: true,
    // debug
    on: {
        proxyReq: (proxyReq, req, res) => {
            console.log('PROTECTED')
            console.log(
                'Proxying request to:',
                SOCIAL_SERVICE_URL + proxyReq.path);
        },
        error: (err, req, res) => {
            console.error('Proxy Error:', err);
            res.end(JSON.stringify({
                error: 'Proxy Error',
                details: err.message,
                target: SOCIAL_SERVICE_URL,
                path: req.url
            }));
        }
    }
}));

export default socialRoutes;