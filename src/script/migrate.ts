import { migrate } from 'drizzle-orm/vercel-postgres/migrator'
import { db } from '@/db'

(async function() {
    await migrate(db, { migrationsFolder: 'src/db/drizzle'})
})()