import { Pool, QueryResult, QueryResultRow } from "pg";
import { config } from "@config/env.config";

export const pool = new Pool({
    user: config.DB_USER,
    host: config.DB_HOST,
    database: config.DB_NAME,
    password: config.DB_PASS,
    port: config.DB_PORT ? Number(config.DB_PORT) : 5432,
    max: Number(config.DB_POOL_MAX || 10),
    idleTimeoutMillis: Number(config.DB_IDLE_TIMEOUT_MS || 30000),
});

// connection events
pool.on("connect", () => console.log("PostgreSQL connected successfully"));
pool.on("error", (err) => console.error("PostgreSQL error:", err.message));

// helper query function
export async function query<T extends QueryResultRow = any>(
    text: string,
    params?: any[]
): Promise<QueryResult<T>> {
    return pool.query<T>(text, params);
}

// auto-create tables if they don't exist
export async function initializeDatabase() {
    try {
        await pool.connect();

        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                course VARCHAR(100) NOT NULL,
                purchased_at TIMESTAMP DEFAULT NOW()
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS webhooks (
                id SERIAL PRIMARY KEY,
                url TEXT NOT NULL,
                token TEXT NOT NULL,
                event VARCHAR(50) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);

        console.log("database initialized successfully");
    } catch (error) {
        console.error("error initializing database:", error);
        process.exit(1);
    }
}
