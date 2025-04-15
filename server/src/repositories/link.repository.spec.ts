import { db } from '../db/index.ts'
import { describe, it, expect, beforeEach } from 'vitest'
import { ilike } from 'drizzle-orm'
import { insert, findAll, deleteBy, findByShortUrl, findById } from './link.repository.ts'
import { schema } from '../db/schemas/index.ts'

describe('Link Repository', () => {
    beforeEach(async () => {
        await db.delete(schema.links);
    })

    describe('insert', () => {
        it('should insert a new link into the database', async () => {
            const originalUrl = 'https://example.com'
            const shortUrl = 'https://brevly/123'

            const insertedLink = await insert(originalUrl, shortUrl)

            expect(insertedLink.id).toBeDefined()
            expect(insertedLink.originalUrl).toBe(originalUrl)
            expect(insertedLink.shortUrl).toBe(shortUrl)
            expect(insertedLink.accessCount).toBe(0)
            expect(insertedLink.createdAt).toBeDefined()

            const result = await db.select().from(schema.links).where(ilike(schema.links.shortUrl, shortUrl)).limit(1)
            expect(result[0].originalUrl).toBe(originalUrl)
        })
    })

    describe('findAll', () => {
        it('should return all links in the database', async () => {
            const links = [
                { originalUrl: 'https://example1.com', shortUrl: 'https://brevly/123' },
                { originalUrl: 'https://example2.com', shortUrl: 'https://brevly/456' },
                { originalUrl: 'https://example3.com', shortUrl: 'https://brevly/789' }
            ];

            for (const link of links) {
                // When using insertLink, ensure that the inserted link follows the application's logic with default values
                await insert(link.originalUrl, link.shortUrl);
            }

            const allLinks = await findAll();
            expect(allLinks).toHaveLength(links.length);
        });

        it('should return an empty array when no links exist', async () => {
            const allLinks = await findAll();
            expect(allLinks).toHaveLength(0);
        });
    });

    describe('findBy', () => {
        it('should return a link by its short URL', async () => {
            const originalUrl = 'https://example.com'
            const shortUrl = 'https://brevly/123'

            await insert(originalUrl, shortUrl)

            const foundLink = await findByShortUrl(shortUrl)

            expect(foundLink).toBeDefined()
            expect(foundLink?.originalUrl).toBe(originalUrl)
            expect(foundLink?.shortUrl).toBe(shortUrl)
        })

        it('should return undefined if the short URL does not exist', async () => {
            const foundLink = await findByShortUrl('https://brevly/nonexistent')

            expect(foundLink).toBeUndefined()
        })

        it('should return a link by its id', async () => {
            const originalUrl = 'https://example.com'
            const shortUrl = 'https://brevly/123'

            const { id } = await insert(originalUrl, shortUrl)

            const foundLink = await findById(id)

            expect(foundLink).toBeDefined()
            expect(foundLink?.originalUrl).toBe(originalUrl)
            expect(foundLink?.shortUrl).toBe(shortUrl)
        })

        it('should return undefined if the short URL does not exist', async () => {
            const foundLink = await findById('mock-uuid')

            expect(foundLink).toBeUndefined()
        })
    })

    describe('delete', () => {
        it('should delete a link by its ID', async () => {
            const originalUrl = 'https://example.com'
            const shortUrl = 'https://example.com/123'

            const result = await insert(originalUrl, shortUrl)
            let insertedLink = await findByShortUrl('https://example.com/123')
            expect(insertedLink).toBeDefined()

            await deleteBy(result.id)
            insertedLink = await findByShortUrl('https://example.com/123')
            expect(insertedLink).toBeUndefined()
        })
    }
    )
})
