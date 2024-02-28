import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from "@vercel/postgres";
import {
    integer,
    numeric,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql);

export const populationTable = pgTable('population', {
    id: serial('id').primaryKey(),
    country_name: text('country_name'),
    population: numeric('population'),
    year: integer('year'),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
}, (population) => {
    return {
        yearIdx: uniqueIndex('year_idx').on(population.year),
        countryIdx: uniqueIndex('country_idx').on(population.country_name),
    }
})

export const getExampleTable = async () => {
    const selectResult = await db.select().from(populationTable);
    console.log('Results', selectResult);
  };