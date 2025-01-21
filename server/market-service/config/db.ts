require("dotenv").config();

const { Pool } = require("pg");

const marketPool = new Pool({
    user: process.env.PG_USER,   
    host: process.env.PG_HOST, 
    database: process.env.PG_NAME,   
    password: process.env.PG_SERVICE_ROLE_KEY,
    port: process.env.PG_PORT || 5432,
    ssl: {
        rejectUnauthorized: false,
    }
});

module.exports = {
    query: (text: string, params: any) => marketPool.query(text, params),
}