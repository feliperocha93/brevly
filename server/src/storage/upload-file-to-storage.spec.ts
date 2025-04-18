import { Readable } from 'node:stream'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { env } from '../env.ts'
import { r2 } from './client.ts'
import { uploadFileToStorage } from './upload-file-to-storage.ts'

vi.mock('@aws-sdk/lib-storage', () => ({
    Upload: vi.fn().mockImplementation(() => ({
        done: vi.fn().mockResolvedValue({}),
    })),
}))

vi.mock('./client.ts', () => ({
    r2: {},
}))

vi.mock('../env.ts', () => ({
    env: {
        CLOUDFLARE_BUCKET_NAME: 'test-bucket',
        CLOUDFLARE_BUCKET_URL: 'https://test-bucket.example.com/',
    },
}))

describe('uploadFileToStorage', () => {
    let mockStream: Readable

    beforeEach(() => {
        mockStream = new Readable({
            read() {
                this.push(null)
            },
        })
        vi.clearAllMocks()
    })

    it('should upload a file successfully', async () => {
        const input = {
            folder: 'exports' as const,
            fileName: 'test-file',
            fileFormat: 'jpg',
            contentType: 'image/jpeg',
            contentStream: mockStream,
        }

        const result = await uploadFileToStorage(input)

        expect(result).toEqual({
            url: 'https://test-bucket.example.com/exports/testfile.jpg',
        })
    })

    it('should sanitize file names correctly', async () => {
        const input = {
            folder: 'exports' as const,
            fileName: 'test-file with spaces and symbols!@#$%^&*()',
            fileFormat: 'png',
            contentType: 'image/png',
            contentStream: mockStream,
        }

        const result = await uploadFileToStorage(input)

        expect(result).toEqual({
            url: 'https://test-bucket.example.com/exports/testfilewithspacesandsymbols.png',
        })
    })

    it('should throw an error for invalid stream', async () => {
        const input = {
            folder: 'exports' as const,
            fileName: 'test',
            fileFormat: 'jpg',
            contentType: 'image/jpeg',
            contentStream: {} as any,
        }

        await expect(uploadFileToStorage(input)).rejects.toThrow()
    })

    it('should construct the Upload with correct parameters', async () => {
        const { Upload } = await import('@aws-sdk/lib-storage')
        const input = {
            folder: 'exports' as const,
            fileName: 'test-file',
            fileFormat: 'jpg',
            contentType: 'image/jpeg',
            contentStream: mockStream,
        }

        await uploadFileToStorage(input)

        expect(Upload).toHaveBeenCalledWith({
            client: r2,
            params: {
                Key: 'exports/testfile.jpg',
                Bucket: env.CLOUDFLARE_BUCKET_NAME,
                Body: mockStream,
                ContentType: 'image/jpeg',
            },
        })
    })
})
