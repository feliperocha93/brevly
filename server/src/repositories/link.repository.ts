import { db } from '@/db/index.ts'
import { schema } from '@/db/schemas/index.ts'
import { ilike } from 'drizzle-orm'

export async function findByShortenedUrl(shortUrl: string) {
    return db.select().from(schema.links).where(ilike(schema.links.shortenedUrl, shortUrl)).limit(1)
}

export async function insertLink(originalUrl: string, shortenedUrl: string) {
    return db.insert(schema.links).values({ originalUrl, shortenedUrl })
}
