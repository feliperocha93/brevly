import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { db } from '../../db/index.ts'
import { schema } from '../../db/schemas/index.ts'
import { app } from '../../server.ts'
import * as storage from '../../storage/upload-file-to-storage.ts'

vi.mock('../../storage/upload-file-to-storage.ts', () => ({
    uploadFileToStorage: vi.fn().mockImplementation(() => {
        return Promise.resolve({
            url: 'https://test-bucket.example.com/exports/report.csv',
        })
    }),
}))

describe('Link Export CSV route', () => {
    beforeAll(async () => {
        await db.delete(schema.links)
    })

    beforeEach(() => {
        vi.clearAllMocks()
    })

    afterEach(async () => {
        await db.delete(schema.links)
    })

    it('should export links to CSV and return a download URL', async () => {
        const testLinks = [
            { originalUrl: 'https://example1.com', shortUrl: 'https://test.brev.ly/example1' },
            { originalUrl: 'https://example2.com', shortUrl: 'https://test.brev.ly/example2' }
        ]

        await db.insert(schema.links).values(testLinks)

        const response = await app.inject({
            method: 'GET',
            url: '/link/export-csv',
        })

        expect(response.statusCode).toBe(200)
        const responseBody = JSON.parse(response.body)
        expect(responseBody).toHaveProperty('reportUrl')
        expect(responseBody.reportUrl).toBe('https://test-bucket.example.com/exports/report.csv')

        expect(storage.uploadFileToStorage).toHaveBeenCalledTimes(1)

        const uploadCall = vi.mocked(storage.uploadFileToStorage).mock.calls[0][0]
        expect(uploadCall).toHaveProperty('folder', 'exports')
        expect(uploadCall).toHaveProperty('fileFormat', 'csv')
        expect(uploadCall).toHaveProperty('contentType', 'text/csv')
        expect(uploadCall).toHaveProperty('fileName')
        expect(uploadCall).toHaveProperty('contentStream')
    })

    it('should return an error when no links exist', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/link/export-csv',
        })

        expect(response.statusCode).toBe(400)
        const responseBody = JSON.parse(response.body)
        expect(responseBody).toHaveProperty('error')
        expect(responseBody.error).toBe('No links found to export')

        expect(storage.uploadFileToStorage).not.toHaveBeenCalled()
    })
})
