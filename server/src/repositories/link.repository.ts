import { db } from '../db/index.ts'
import { schema } from '../db/schemas/index.ts'
import { eq } from 'drizzle-orm'

export async function findByShortUrl(shortUrl: string): Promise<LinkModel | undefined> {
    return db.query.links.findFirst({
        where: eq(schema.links.shortUrl, shortUrl)
    })
}

export async function insertLink(
    originalUrl: string,
    shortUrl: string
): Promise<LinkModel> {
    const result = await db.insert(schema.links).values({ originalUrl, shortUrl }).returning()
    return result[0]
}
