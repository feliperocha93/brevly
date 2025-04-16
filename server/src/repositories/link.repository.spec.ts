import { db } from '../db/index.ts'
import { describe, it, expect, beforeEach } from 'vitest'
import { ilike } from 'drizzle-orm'
import * as repository from './link.repository.ts'
import { schema } from '../db/schemas/index.ts'

describe('Link Repository', () => {
    beforeEach(async () => {
        await db.delete(schema.links);
    })

    describe('insert', () => {
        it('should insert a new link into the database', async () => {
            const originalUrl = 'https://example.com'
            const shortUrl = 'https://brevly/123'

            const insertedLink = await repository.insert(originalUrl, shortUrl)

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
                await repository.insert(link.originalUrl, link.shortUrl);
            }

            const allLinks = await repository.findAll();
            expect(allLinks).toHaveLength(links.length);
        });

        it('should return an empty array when no links exist', async () => {
            const allLinks = await repository.findAll();
            expect(allLinks).toHaveLength(0);
        });
    });

    describe('findBy', () => {
        it('should return a link by its short URL', async () => {
            const originalUrl = 'https://example.com'
            const shortUrl = 'https://brevly/123'

            await repository.insert(originalUrl, shortUrl)

            const foundLink = await repository.findByShortUrl(shortUrl)

            expect(foundLink).toBeDefined()
            expect(foundLink?.originalUrl).toBe(originalUrl)
            expect(foundLink?.shortUrl).toBe(shortUrl)
        })

        it('should return undefined if the short URL does not exist', async () => {
            const foundLink = await repository.findByShortUrl('https://brevly/nonexistent')

            expect(foundLink).toBeUndefined()
        })

        it('should return a link by its id', async () => {
            const originalUrl = 'https://example.com'
            const shortUrl = 'https://brevly/123'

            const { id } = await repository.insert(originalUrl, shortUrl)

            const foundLink = await repository.findById(id)

            expect(foundLink).toBeDefined()
            expect(foundLink?.originalUrl).toBe(originalUrl)
            expect(foundLink?.shortUrl).toBe(shortUrl)
        })

        it('should return undefined if the short URL does not exist', async () => {
            const foundLink = await repository.findById('mock-uuid')

            expect(foundLink).toBeUndefined()
        })
    })

    describe('incrementAccessCount', () => {
        it('should increment accessCount by 1', async () => {
            const originalUrl = 'https://example.com'
            const shortUrl = 'https://brevly/123'

            const inserted = await repository.insert(originalUrl, shortUrl)
            expect(inserted.accessCount).toBe(0)

            const response = await repository.incrementAccessCount(inserted.id)
            const updated = await repository.findById(inserted.id)
            expect(response).toBe(1)
            expect(updated?.accessCount).toBe(1)

            const responseAgain = await repository.incrementAccessCount(inserted.id)
            const updatedAgain = await repository.findById(inserted.id)
            expect(responseAgain).toBe(2)
            expect(updatedAgain?.accessCount).toBe(2)
        })
    })


    describe('delete', () => {
        it('should delete a link by its ID', async () => {
            const originalUrl = 'https://example.com'
            const shortUrl = 'https://example.com/123'

            const result = await repository.insert(originalUrl, shortUrl)
            let insertedLink = await repository.findByShortUrl('https://example.com/123')
            expect(insertedLink).toBeDefined()

            await repository.deleteBy(result.id)
            insertedLink = await repository.findByShortUrl('https://example.com/123')
            expect(insertedLink).toBeUndefined()
        })
    }
    )
})
