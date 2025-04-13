import { app } from '@/server.ts'
import { db } from '@/db/index.ts'
import { schema } from '@/db/schemas/index.ts'

export async function setupTestApp() {
    await app.ready();
    return app;
}

export async function cleanupDatabase() {
    // Clean all tables
    await db.delete(schema.links);
}
