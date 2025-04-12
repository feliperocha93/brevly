import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createShortLink } from './link.service.ts'
import { insertLink, findByShortUrl } from '@/repositories/link.repository.ts'

vi.mock('@/repositories/link.repository.ts', () => ({
    findByShortUrl: vi.fn(),
    insertLink: vi.fn()
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

    it('should throw an error when short URL already exists', async () => {
        vi.mocked(findByShortUrl).mockResolvedValue(mockLink)

        const result = await createShortLink({
            originalUrl: 'https://example.com',
            shortUrlPath: 'abc123'
        })

        expect(result.left).toBeInstanceOf(Error)
        expect(insertLink).not.toHaveBeenCalled()
    })

    it('should create a link successfully', async () => {
        vi.mocked(insertLink).mockResolvedValue(mockLink)

        const result = await createShortLink({
            originalUrl: 'https://example.com',
            shortUrlPath: 'abc123'
        })

        expect(result.right).toEqual({
            id: mockLink.id,
            originalUrl: mockLink.originalUrl,
            shortUrl: mockLink.shortUrl
        })
        expect(insertLink).toHaveBeenCalledWith('https://example.com', 'https://brev.ly/abc123')
    })
})
