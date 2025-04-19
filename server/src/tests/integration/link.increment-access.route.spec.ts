import { eq } from 'drizzle-orm'
import { afterEach, beforeAll, describe, expect, it } from 'vitest'
import { db } from '../../db/index.ts'
import { schema } from '../../db/schemas/index.ts'
import { app } from '../../server.ts'
import { AppErrorCode } from '../../shared/errors.ts'

describe('Link Increment Access route', () => {
    beforeAll(async () => {
        await db.delete(schema.links)
    })

    afterEach(async () => {
        await db.delete(schema.links)
    })

    it('should increment access count and return 200 with the new count', async () => {
        const link = { originalUrl: 'https://example1.com', shortUrl: 'https://test.brev.ly/example1' }
        const result = await db.insert(schema.links).values(link).returning()
        const id = result[0].id

        const initialLink = await db.query.links.findFirst({
            where: eq(schema.links.id, id),
        })
        expect(initialLink?.accessCount).toBe(0)

        const response = await app.inject({
            method: 'PATCH',
            url: `/link/${id}/increment-access-count`,
        })
        expect(response.statusCode).toBe(200)
        const responseBody = JSON.parse(response.body)
        expect(responseBody).toHaveProperty('accessCount', 1)


        const updatedLink = await db.query.links.findFirst({
            where: eq(schema.links.id, id),
        })
        expect(updatedLink?.accessCount).toBe(1)

        const res = await app.inject({
            method: 'PATCH',
            url: `/link/${id}/increment-access-count`,
        })
        expect(res.statusCode).toBe(200)
        const resBody = JSON.parse(res.body)
        expect(resBody).toHaveProperty('accessCount', 2)

        const finalLink = await db.query.links.findFirst({
            where: eq(schema.links.id, id),
        })
        expect(finalLink?.accessCount).toBe(2)
    })

    it('should return 404 when id is not found', async () => {
        const nonExistentId = '00000000-0000-0000-0000-000000000000'

        const response = await app.inject({
            method: 'PATCH',
            url: `/link/${nonExistentId}/increment-access-count`,
        })

        expect(response.statusCode).toBe(404)
        expect(response.json()).toEqual({
            error: AppErrorCode.ID_NOT_FOUND,
        })
    })

    it('should return 400 when id is not a valid UUID', async () => {
        const invalidId = 'not-a-uuid'

        const response = await app.inject({
            method: 'PATCH',
            url: `/link/${invalidId}/increment-access-count`,
        })

        expect(response.statusCode).toBe(400)
        expect(response.json()).toHaveProperty('message', 'Validation error')
    })
})
