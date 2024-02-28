import {
    integer,
    numeric,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

export const populations = pgTable('populations', {
    id: serial('id').primaryKey(),
    country_name: text('country_name').notNull(),
    population: numeric('population').notNull(),
    year: integer('year').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
})