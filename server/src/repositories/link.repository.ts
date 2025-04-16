import { eq, sql } from 'drizzle-orm'
import { db } from '../db/index.ts'
import { schema } from '../db/schemas/index.ts'


export async function insert(
    originalUrl: string,
    shortUrl: string
): Promise<LinkModel> {
    const result = await db.insert(schema.links).values({ originalUrl, shortUrl }).returning()
    return result[0]
}

export async function findAll(): Promise<LinkModel[]> {
    return db.query.links.findMany();
}

export async function findById(id: string): Promise<LinkModel | undefined> {
    return db.query.links.findFirst({
        where: eq(schema.links.id, id)
    })
}

export async function findByShortUrl(shortUrl: string): Promise<LinkModel | undefined> {
    return db.query.links.findFirst({
        where: eq(schema.links.shortUrl, shortUrl)
    })
}

export async function incrementAccessCount(id: string): Promise<number> {
    const result = await db.update(schema.links)
        .set({ accessCount: sql`${schema.links.accessCount} + 1` })
        .where(eq(schema.links.id, id))
        .returning()

    return result[0].accessCount
}

export async function deleteBy(id: string): Promise<void> {
    await db.delete(schema.links).where(eq(schema.links.id, id))
}
