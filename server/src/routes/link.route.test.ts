import { describe, it, expect, beforeAll, afterAll, afterEach, vi } from 'vitest'
import { app } from '../server.ts'
import { db } from '@/db/index.ts'
import { schema } from '@/db/schemas/index.ts'

beforeAll(async () => {
    await app.ready()
})

afterEach(async () => {
    await db.delete(schema.links);
})

afterAll(async () => {
    await app.close()
})

describe('Link routes', () => {
    it('should create a short link', async () => {
        const response = await app.inject({
            method: 'POST',
            url: '/link',
            payload: {
                originalUrl: 'https://example.com',
                shortUrlPath: 'example'
            }
        })

        expect(response.statusCode).toBe(201)
        const responseBody = JSON.parse(response.body)
        expect(responseBody).toHaveProperty('id')
        expect(responseBody).toHaveProperty('originalUrl', 'https://example.com')
        expect(responseBody).toHaveProperty('shortUrl', expect.stringContaining('example'))
    })

    it('should return a validation error when originalUrl is not a valid url', async () => {
        const response = await app.inject({
            method: 'POST',
            url: '/link',
            payload: {
                originalUrl: 'example.com',
                shortUrlPath: 'example'
            }
        })

        const responseBody = JSON.parse(response.body)
        expect(response.statusCode).toBe(400)
        expect(responseBody).toHaveProperty('message', 'Validation error')
    })

    it('should return a validation error when shortUrlPath is not a valid string', async () => {
        const response = await app.inject({
            method: 'POST',
            url: '/link',
            payload: {
                originalUrl: 'https://example.com',
                shortUrlPath: 45
            }
        })

        const responseBody = JSON.parse(response.body)
        expect(response.statusCode).toBe(400)
        expect(responseBody).toHaveProperty('message', 'Validation error')
    })

    it('should return a validation error when shortUrlPath is too long', async () => {
        const response = await app.inject({
            method: 'POST',
            url: '/link',
            payload: {
                originalUrl: 'https://example.com',
                shortUrlPath: 'a'.repeat(21)  // Your max is 20
            }
        })

        const responseBody = JSON.parse(response.body)
        expect(response.statusCode).toBe(400)
        expect(responseBody).toHaveProperty('message', 'Validation error')
    })

    it('should return a validation error when shortUrlPath is empty', async () => {
        const response = await app.inject({
            method: 'POST',
            url: '/link',
            payload: {
                originalUrl: 'https://example.com',
                shortUrlPath: ''
            }
        })

        const responseBody = JSON.parse(response.body)
        expect(response.statusCode).toBe(400)
        expect(responseBody).toHaveProperty('message', 'Validation error')
    })

    it('should return a conflict error when short url already exists', async () => {
        await db.insert(schema.links).values({
            originalUrl: 'https://example.com',
            shortUrl: 'https://brev.ly/example' // Assuming the domain is the same
        })

        const response = await app.inject({
            method: 'POST',
            url: '/link',
            payload: {
                originalUrl: 'https://example.com',
                shortUrlPath: 'example'
            }
        })

        const responseBody = JSON.parse(response.body)
        expect(response.statusCode).toBe(409)
        expect(responseBody).toHaveProperty('error', 'Short URL already exists')
    }
    )
})
