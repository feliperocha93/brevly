import { describe, it, expect, beforeAll, afterEach } from 'vitest'
import { app } from '../../server.ts'
import { db } from '../../db/index.ts'
import { schema } from '../../db/schemas/index.ts'
import { eq } from 'drizzle-orm'

describe('Link Destroy route', () => {
    beforeAll(async () => {
        await db.delete(schema.links)
    })

    afterEach(async () => {
        await db.delete(schema.links)
    })

    it('should delete a link and return 204', async () => {
        const link = { originalUrl: 'https://example1.com', shortUrl: 'https://test.brev.ly/example1' }
        const result = await db.insert(schema.links).values(link).returning()
        const id = result[0].id

        const response = await app.inject({
            method: 'DELETE',
            url: '/link/' + id,
        })
        expect(response.statusCode).toBe(204)

        const deletedLink = await db.query.links.findFirst({
            where: eq(schema.links.id, id),
        })
        expect(deletedLink).toBeUndefined()
    })

    it('should return 404 when id is not found', async () => {
        const nonExistentId = '00000000-0000-0000-0000-000000000000'

        const response = await app.inject({
            method: 'DELETE',
            url: '/link/' + nonExistentId,
        })

        expect(response.statusCode).toBe(404)
        expect(response.json()).toEqual({
            error: 'ID not found',
        })
    })

    it('should return 400 when id is not a valid UUID', async () => {
        const invalidId = 'not-a-uuid'

        const response = await app.inject({
            method: 'DELETE',
            url: `/link/${invalidId}`,
        })

        expect(response.statusCode).toBe(400)
        expect(response.json()).toHaveProperty('message', 'Validation error')
    })
})
