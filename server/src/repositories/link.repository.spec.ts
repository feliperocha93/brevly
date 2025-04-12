import { describe, it, expect, afterEach } from 'vitest'
import { insertLink } from './link.repository.ts'
import { db } from '@/db/index.ts'
import { schema } from '@/db/schemas/index.ts'
import { ilike } from 'drizzle-orm'

describe('Link Repository', () => {
    afterEach(async () => {
        await db.delete(schema.links);
    })

    describe('insertLink', () => {
        it('should insert a new link into the database', async () => {
            const originalUrl = 'https://example.com'
            const shortUrl = 'https://brevly/123'

            const insertedLink = await insertLink(originalUrl, shortUrl)

            expect(insertedLink.id).toBeDefined()
            expect(insertedLink.originalUrl).toBe(originalUrl)
            expect(insertedLink.shortUrl).toBe(shortUrl)
            expect(insertedLink.accessCount).toBe(0)
            expect(insertedLink.createdAt).toBeDefined()

            const result = await db.select().from(schema.links).where(ilike(schema.links.shortUrl, shortUrl)).limit(1)
            expect(result[0].originalUrl).toBe(originalUrl)
        })
    })

})
