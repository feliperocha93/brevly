import { describe, it, expect, vi, beforeEach } from 'vitest'
import { create, list, remove } from './link.service.ts'
import * as repository from '../repositories/link.repository.ts'

vi.mock('../repositories/link.repository.ts', () => ({
    insert: vi.fn(),
    findAll: vi.fn(),
    findByShortUrl: vi.fn(),
    findById: vi.fn(),
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
        it('should throw an error when short URL already exists', async () => {
            vi.mocked(repository.findByShortUrl).mockResolvedValue(mockLink)

            const result = await create({
                originalUrl: 'https://example.com',
                shortUrlPath: 'abc123'
            })

            expect(result.left).toBeInstanceOf(Error)
            expect(repository.insert).not.toHaveBeenCalled()
        })

        it('should create a link successfully', async () => {
            vi.mocked(repository.insert).mockResolvedValue(mockLink)

            const result = await create({
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

            const result = await list()

            expect(result.right).toEqual([mockLink])
        })
    })

    describe('remove', () => {
        it('should throw an error when ID does not exist', async () => {
            vi.mocked(repository.findById).mockResolvedValue(undefined)

            const result = await remove('mock-uuid')

            expect(result.left).toBeInstanceOf(Error)
            expect(repository.deleteBy).not.toHaveBeenCalled()
        })

        it('should remove a link successfully', async () => {
            vi.mocked(repository.findById).mockResolvedValue(mockLink)
            vi.mocked(repository.deleteBy).mockResolvedValue(undefined)

            const result = await remove('mock-uuid')

            expect(result.right).toBe(true)
            expect(repository.deleteBy).toHaveBeenCalledWith('mock-uuid')
        })
    });

})
