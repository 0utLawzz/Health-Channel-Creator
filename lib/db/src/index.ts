import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

// Connection priority:
//   1. DATABASE_URL  → Neon (production DB)
//   2. PG* vars      → built-in Replit Postgres (fallback / local dev)
function buildPoolConfig(): pg.PoolConfig {
  if (process.env.DATABASE_URL) {
    return { connectionString: process.env.DATABASE_URL };
  }
  if (process.env.PGHOST && process.env.PGDATABASE) {
    console.warn("[db] DATABASE_URL not set — falling back to built-in Replit Postgres.");
    return {
      host: process.env.PGHOST,
      port: parseInt(process.env.PGPORT ?? "5432", 10),
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
    };
  }
  console.warn("[db] WARNING: No database credentials found.");
  return {};
}

export const pool = new Pool(buildPoolConfig());
export const db = drizzle(pool, { schema });

export * from "./schema";
