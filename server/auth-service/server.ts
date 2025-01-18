import { Express } from "express";

require('dotenv').config();
const express = require("express");

const authApp: Express = express();

const port: string | Number = process.env.AUTH_PORT || 4000;

authApp.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});

module.exports = authApp;