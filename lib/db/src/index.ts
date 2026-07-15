import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  // Warn but do not crash — server can still start and serve /healthz;
  // DB-dependent routes will fail with a connection error at query time.
  console.warn(
    "[db] WARNING: DATABASE_URL is not set. All database operations will fail. " +
      "Add DATABASE_URL in Replit Secrets to fix this.",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });

export * from "./schema";
