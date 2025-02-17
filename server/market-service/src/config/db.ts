import dotenv from "dotenv"
import { Pool } from "pg";

dotenv.config({ path: "../../.env"});

const marketPool : Pool = new Pool({
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASS
});

async function connectToDatabase() {
    try {
      await marketPool.connect();
      console.log('Connected to Supabase!');
    } catch (error) {
      console.error('Error connecting to Supabase:', error);
    }
  }
  
  connectToDatabase();



export default marketPool;