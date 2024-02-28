import '@/lib/config'
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: './src/db/schema.ts',
    out: './src/db/drizzle',
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.POSTGRES_URL!
    },
    verbose: true,
  strict: true,
})