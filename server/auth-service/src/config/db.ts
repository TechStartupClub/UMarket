import dotenv from "dotenv"
import { Pool } from "pg";

dotenv.config({ path: "../../.env" });

/**
 * Creates and configures a connection pool to the PostgreSQL database.
 */
const authPool: Pool = new Pool({
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASS
});

/**
 * Establishes a connection to the PostgreSQL database.
 * Logs a success message on successful connection or an error message on failure.
 */
async function connectToDatabase() {
  try {
    await authPool.connect();
    console.log('Connected to Supabase!');
  } catch (error) {
    console.error('Error connecting to Supabase:', error);
  }
}

connectToDatabase();

export default authPool;