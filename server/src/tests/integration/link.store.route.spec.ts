import { beforeEach, describe, expect, it } from 'vitest'
import { db } from '../../db/index.ts'
import { schema } from '../../db/schemas/index.ts'
import { env } from '../../env.ts'
import { app } from '../../server.ts'
import { AppErrorCode } from '../../shared/errors.ts'

describe('Link routes', () => {
    beforeEach(() => {
        return db.delete(schema.links)
    })

    it('should create a short link', async () => {
        const response = await app.inject({
            method: 'POST',
            url: '/link',
            payload: {
                originalUrl: 'https://example.com',
                shortUrlPath: 'example-1'
            }
        })

        expect(response.statusCode).toBe(201)
        const responseBody = JSON.parse(response.body)
        expect(responseBody).toHaveProperty('id')
        expect(responseBody).toHaveProperty('originalUrl', 'https://example.com')
        expect(responseBody).toHaveProperty('shortUrl', expect.stringContaining('example'))
    })

    it('should return a conflict error when short url already exists', async () => {
        await db.insert(schema.links).values({
            originalUrl: 'https://google.com',
            shortUrl: `${env.APP_DOMAIN}/google`,
        })

        const response = await app.inject({
            method: 'POST',
            url: '/link',
            payload: {
                originalUrl: 'https://google.com',
                shortUrlPath: 'google'
            }
        })

        const responseBody = JSON.parse(response.body)
        expect(response.statusCode).toBe(409)
        expect(responseBody).toHaveProperty('error', AppErrorCode.SHORT_URL_ALREADY_EXISTS)
    });

    describe('originalUrl validation', () => {
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
    });

    describe('shortUrlPath validation', () => {
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

        it('should return a validation error when shortUrlPath contains invalid characters', async () => {
            const response = await app.inject({
                method: 'POST',
                url: '/link',
                payload: {
                    originalUrl: 'https://example.com',
                    shortUrlPath: 'example 123'
                }
            })
            const responseBody = JSON.parse(response.body)
            expect(response.statusCode).toBe(400)
            expect(responseBody).toHaveProperty('message', 'Validation error')
        }
        )
    })

})
