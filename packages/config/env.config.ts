import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export const config = {
    DB_USER: process.env.DB_USER || "admin",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_NAME: process.env.DB_NAME || "webhook-flow",
    DB_PASS: process.env.DB_PASS || "admin123",
    DB_PORT: process.env.DB_PORT || 5432,
    DB_POOL_MAX: process.env.DB_POOL_MAX || 10,
    DB_IDLE_TIMEOUT_MS: process.env.DB_IDLE_TIMEOUT_MS || 30000,
};
