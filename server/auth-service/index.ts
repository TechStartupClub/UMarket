import { Express } from "express";

require('dotenv').config();
const express = require("express");

const authApp: Express = express();

const port: string | undefined | Number = process.env.AUTH_SERVICE_PORT;

authApp.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});

// Close Pool connection when signal is interrupted
process.on('SIGINT', async () => {
    console.log("Shutting Down");
    await authPool.end();
    process.exit(0);
});

// Close Pool connection when signal is terminated
process.on('SIGTERM', async () => {
    console.log("Shutting Down");
    await authPool.end();
    process.exit(0);
});

module.exports = authApp;