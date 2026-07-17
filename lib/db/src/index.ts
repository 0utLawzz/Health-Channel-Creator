import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

// Connection: uses PG* env vars (built-in Replit Postgres) which are always
// correct in this environment. Switch to DATABASE_URL once Neon credentials
// are confirmed working.
function buildPoolConfig(): pg.PoolConfig {
  if (process.env.PGHOST && process.env.PGDATABASE) {
    return {
      host: process.env.PGHOST,
      port: parseInt(process.env.PGPORT ?? "5432", 10),
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
    };
  }
  return { connectionString: process.env.DATABASE_URL };
}

export const pool = new Pool(buildPoolConfig());
export const db = drizzle(pool, { schema });

export * from "./schema";
