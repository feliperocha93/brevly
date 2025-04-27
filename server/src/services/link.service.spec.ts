import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as repository from '../repositories/link.repository.ts'
import { AppErrorCode } from '../shared/errors.ts'
import { uploadFileToStorage } from '../storage/upload-file-to-storage.ts'
import * as service from './link.service.ts'

vi.mock('../storage/upload-file-to-storage.ts', () => ({
    uploadFileToStorage: vi.fn(),
}))

vi.mock('../repositories/link.repository.ts', () => ({
    insert: vi.fn(),
    findAll: vi.fn(),
    findByShortUrl: vi.fn(),
    findById: vi.fn(),
    incrementAccessCount: vi.fn(),
    deleteBy: vi.fn()
}))

describe('Link Service', () => {
    const mockLink: LinkModel = {
        id: 'mock-uuid',
        originalUrl: 'https://example.com',
        shortUrl: 'https://test.brev.ly/abc123',
        createdAt: new Date(),
        accessCount: 0
    }

    beforeEach(() => {
        vi.resetAllMocks()
    })

    describe('create', () => {
        it('should throw an error when path is protected', async () => {
            vi.mocked(repository.findByShortUrl).mockResolvedValue(mockLink)

            const result = await service.create({
                originalUrl: 'https://example.com',
                shortUrlPath: 'url-not-found'
            })

            expect(result.left).toBeInstanceOf(Error)
            expect(result.left?.code).toBe(AppErrorCode.PROTECTED_PATH)
            expect(repository.insert).not.toHaveBeenCalled()
        })

        it('should throw an error when short URL already exists', async () => {
            vi.mocked(repository.findByShortUrl).mockResolvedValue(mockLink)

            const result = await service.create({
                originalUrl: 'https://example.com',
                shortUrlPath: 'abc123'
            })

            expect(result.left).toBeInstanceOf(Error)
            expect(result.left?.code).toBe(AppErrorCode.SHORT_URL_ALREADY_EXISTS)
            expect(repository.insert).not.toHaveBeenCalled()
        })

        it('should create a link successfully', async () => {
            vi.mocked(repository.insert).mockResolvedValue(mockLink)

            const result = await service.create({
                originalUrl: 'https://example.com',
                shortUrlPath: 'abc123'
            })

            expect(result.right).toEqual({
                id: mockLink.id,
                originalUrl: mockLink.originalUrl,
                shortUrl: mockLink.shortUrl
            })
            expect(repository.insert).toHaveBeenCalledWith('https://example.com', 'https://test.brev.ly/abc123')
        })
    })

    describe('list', () => {
        it('should return all links', async () => {
            vi.mocked(repository.findAll).mockResolvedValue([mockLink])

            const result = await service.list()

            expect(result.right).toEqual([mockLink])
        })
    })

    describe('exportLinks', () => {
        it('should return an error when no links are found', async () => {
            vi.mocked(repository.findAll).mockResolvedValue([])

            const result = await service.exportLinks()

            expect(result.left).toBeInstanceOf(Error)
            expect(result.left?.code).toBe(AppErrorCode.NO_LINKS_FOUND)
            expect(uploadFileToStorage).not.toHaveBeenCalled()
        })

        it('should export links successfully when links exist', async () => {
            vi.mocked(repository.findAll).mockResolvedValue([mockLink])
            vi.mocked(uploadFileToStorage).mockResolvedValue({
                url: 'https://test-bucket.example.com/exports/report.csv',
            })

            const result = await service.exportLinks()

            expect(result.right).toEqual({ reportUrl: 'https://test-bucket.example.com/exports/report.csv' })
        })
    })

    describe('incrementAccessCount', () => {
        it('should throw an error when ID does not exist', async () => {
            vi.mocked(repository.findById).mockResolvedValue(undefined)

            const result = await service.incrementAccessCount('mock-uuid')

            expect(result.left).toBeInstanceOf(Error)
            expect(result.left?.code).toBe(AppErrorCode.ID_NOT_FOUND)
            expect(repository.incrementAccessCount).not.toHaveBeenCalled()
        })

        it('should increment a count successfully', async () => {
            vi.mocked(repository.findById).mockResolvedValue(mockLink)
            vi.mocked(repository.incrementAccessCount).mockResolvedValue(5)

            const result = await service.incrementAccessCount('mock-uuid')

            expect(result.right).toBe(5)
            expect(repository.incrementAccessCount).toHaveBeenCalledWith('mock-uuid')
        })
    });

    describe('remove', () => {
        it('should throw an error when ID does not exist', async () => {
            vi.mocked(repository.findById).mockResolvedValue(undefined)

            const result = await service.remove('mock-uuid')

            expect(result.left).toBeInstanceOf(Error)
            expect(result.left?.code).toBe(AppErrorCode.ID_NOT_FOUND)
            expect(repository.deleteBy).not.toHaveBeenCalled()
        })

        it('should remove a link successfully', async () => {
            vi.mocked(repository.findById).mockResolvedValue(mockLink)
            vi.mocked(repository.deleteBy).mockResolvedValue(undefined)

            const result = await service.remove('mock-uuid')

            expect(result.right).toBe(true)
            expect(repository.deleteBy).toHaveBeenCalledWith('mock-uuid')
        })
    });
})
