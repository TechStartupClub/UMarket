import dotenv from 'dotenv'
import {Router} from 'express';
import {createProxyMiddleware} from 'http-proxy-middleware';

dotenv.config({path: '../../.env'});

// Initialize auth router and get the service URL
const authRoutes: Router = Router();
const AUTH_SERVICE_URL: string|undefined = process.env.AUTH_SERVICE_URL;
if (!AUTH_SERVICE_URL) {
  throw new Error('Missing AUTH_SERVICE_URL environment variable')
}

// Proxy all requests under `/auth` to the auth microservice
authRoutes.use(
    '/', createProxyMiddleware({
      target: AUTH_SERVICE_URL,
      changeOrigin: true,
      // debug
      on: {
        proxyReq: (proxyReq, req, res) => {
          console.log('Proxying request to:', AUTH_SERVICE_URL + proxyReq.path);
        },
        error: (err, req, res) => {
          console.error('Proxy Error:', err);
          res.end(JSON.stringify({
            error: 'Proxy Error',
            details: err.message,
            target: AUTH_SERVICE_URL,
            path: req.url
          }));
        }
      }
    }));

export default authRoutes;