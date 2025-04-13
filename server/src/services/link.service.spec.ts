import { describe, it, expect, vi, beforeEach } from 'vitest'
import { create, list } from './link.service.ts'
import * as repository from '@/repositories/link.repository.ts'

vi.mock('@/repositories/link.repository.ts', () => ({
    findBy: vi.fn(),
    insert: vi.fn(),
    findAll: vi.fn()
}))

describe('Link Service', () => {
    const mockLink: LinkModel = {
        id: 'mock-id',
        originalUrl: 'https://example.com',
        shortUrl: 'https://brev.ly/abc123',
        createdAt: new Date(),
        accessCount: 0
    }

    beforeEach(() => {
        vi.resetAllMocks()
        process.env.APP_DOMAIN = 'https://brev.ly'
    })

    describe('create', () => {
        it('should throw an error when short URL already exists', async () => {
            vi.mocked(repository.findBy).mockResolvedValue(mockLink)

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
            expect(repository.insert).toHaveBeenCalledWith('https://example.com', 'https://brev.ly/abc123')
        })
    })

    describe('list', () => {
        it('should return all links', async () => {
            vi.mocked(repository.findAll).mockResolvedValue([mockLink])

            const result = await list()

            expect(result.right).toEqual([mockLink])
        })
    })

})
