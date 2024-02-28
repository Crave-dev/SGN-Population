import '@/lib/config'
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from "@vercel/postgres";
import * as schema from './schema'

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql, { schema });

export type Populations = typeof schema.populations.$inferInsert

export async function insertPopulations(populations: Populations[]) {
    return db.insert(schema.populations).values(populations).returning()
}