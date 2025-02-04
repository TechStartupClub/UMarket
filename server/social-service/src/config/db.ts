import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config({ path: "../../.env" });

const socialPool = new Pool({
    user: process.env.PG_USER,   
    host: process.env.PG_HOST, 
    database: process.env.PG_NAME,   
    password: process.env.PG_SERVICE_ROLE_KEY,
    port: Number(process.env.PG_PORT),
    ssl: {
        rejectUnauthorized: false
    }
});

export default socialPool;
