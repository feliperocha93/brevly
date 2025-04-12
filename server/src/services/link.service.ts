import { makeLeft, makeRight } from '../shared/either.ts';
import { findByShortUrl, insertLink } from '../repositories/link.repository.ts'

import type { Either } from '../shared/either.ts'

// TODO: Insert the domain in the .env file
const DOMAIN = process.env.APP_DOMAIN || 'https://brev.ly'

export async function createShortLink(
    { originalUrl, shortUrlPath }: LinkInsertPayload
): Promise<Either<Error, LinkInsertResponse>> {
    const shortUrl = `${DOMAIN}/${shortUrlPath}`
    const existing = await findByShortUrl(shortUrl)

    if (existing) {
        // TODO: Create custom error
        return makeLeft(new Error('Short URL already exists'))
    }

    const newLink = await insertLink(originalUrl, shortUrl)

    return makeRight({
        id: newLink.id,
        originalUrl: newLink.originalUrl,
        shortUrl: newLink.shortUrl,
    })
}
