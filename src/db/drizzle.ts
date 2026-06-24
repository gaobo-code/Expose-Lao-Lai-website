import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from "@libsql/client";

// next.config.js
import { config } from "dotenv";

if (process.env.NODE_ENV === "production") {
  config({
    path: ".env.production"
  });
} else {
  config({
    path: ".env.development"
  });
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const client = createClient({
  url: process.env.DATABASE_URL!,
});

export const db = drizzle(client);



