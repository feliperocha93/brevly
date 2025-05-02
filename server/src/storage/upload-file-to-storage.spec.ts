import { Readable } from 'node:stream'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { env } from '../env.ts'
import { r2 } from './client.ts'
import { uploadFileToStorage } from './upload-file-to-storage.ts'
import { AppErrorCode } from '../shared/errors.ts'

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

        expect(result.right).toEqual({
            reportUrl: 'https://test-bucket.example.com/exports/testfile.jpg',
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

        expect(result.right).toEqual({
            reportUrl: 'https://test-bucket.example.com/exports/testfilewithspacesandsymbols.png',
        })
    })

    it('should return an error if the Cloudflare configuration is not set', async () => {
        vi.mocked(env).CLOUDFLARE_BUCKET_NAME = ''

        const input = {
            folder: 'exports' as const,
            fileName: 'test-file',
            fileFormat: 'jpg',
            contentType: 'image/jpeg',
            contentStream: mockStream,
        }

        const result = await uploadFileToStorage(input)

        expect(result.left?.code).toEqual(AppErrorCode.CLOUDFLARE_CONFIGURATION_NOT_SET)
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
        vi.mocked(env).CLOUDFLARE_BUCKET_NAME = 'test-bucket'
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
                Bucket: 'test-bucket',
                Body: mockStream,
                ContentType: 'image/jpeg',
            },
        })
    })
})
