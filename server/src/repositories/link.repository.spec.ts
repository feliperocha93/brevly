import { describe, it, expect } from 'vitest'
import { findByShortenedUrl, insertLink } from './link.repository.ts'
import { db } from '@/db/index.ts'
import { schema } from '@/db/schemas/index.ts'
import { ilike } from 'drizzle-orm'

describe('Link Repository', () => {
    describe('insertLink', () => {
        it('should insert a new link into the database', async () => {
            // Arrange
            const originalUrl = 'https://example.com'
            const shortenedUrl = 'abc1234'

            // Act
            await insertLink(originalUrl, shortenedUrl)

            const result = await db.select().from(schema.links).where(ilike(schema.links.shortenedUrl, shortenedUrl)).limit(1)

            expect(result[0].originalUrl).toBe(originalUrl)
            expect(result[0].shortenedUrl).toBe(shortenedUrl)
        })
    })

})
