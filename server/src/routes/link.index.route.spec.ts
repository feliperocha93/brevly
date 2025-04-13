import { describe, it, expect, beforeEach } from 'vitest'
import { db } from '../db/index.ts'
import { schema } from '../db/schemas/index.ts'
import { app } from '../server.ts';

describe.concurrent('Link index route', () => {
    beforeEach(() => {
        return db.delete(schema.links)
    })

    it('should return an empty array when no links exist', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/link',
        })

        expect(response.statusCode).toBe(200)
        const responseBody = JSON.parse(response.body)
        expect(responseBody).toEqual([])
    })

    it('should return all created links', async () => {
        const testLinks = [
            { originalUrl: 'https://example1.com', shortUrl: 'https://brev.ly/example1' },
            { originalUrl: 'https://example2.com', shortUrl: 'https://brev.ly/example2' }
        ];

        await db.insert(schema.links).values(testLinks)

        const response = await app.inject({
            method: 'GET',
            url: '/link'
        })

        expect(response.statusCode).toBe(200)
        const responseBody = JSON.parse(response.body)
        expect(responseBody).toHaveLength(testLinks.length)

        for (const link of testLinks) {
            const foundLink = responseBody.find((l: LinkModel) => l.shortUrl === link.shortUrl)
            expect(foundLink).toBeDefined()
            expect(foundLink.originalUrl).toBe(link.originalUrl)
        }
    })
})
