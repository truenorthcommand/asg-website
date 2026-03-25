import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "../../drizzle/schema";
import { ENV } from "./env";

let db: any = null;

export async function initializeDatabase() {
  if (db) return db;

  if (!ENV.databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  try {
    const pool = mysql.createPool({
      uri: ENV.databaseUrl,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    db = drizzle(pool, { schema, mode: "default" });
    console.log("[Database] Initialized successfully");
    return db;
  } catch (error) {
    console.error("[Database] Initialization failed:", error);
    throw error;
  }
}

export function getDatabase() {
  if (!db) {
    throw new Error(
      "Database not initialized. Call initializeDatabase() first."
    );
  }
  return db;
}

export { db };
