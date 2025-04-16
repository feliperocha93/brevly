import { makeLeft, makeRight } from '../shared/either.ts';
import * as repository from '../repositories/link.repository.ts'
import { env } from '../env.ts'

import type { Either } from '../shared/either.ts'


export async function create(
    { originalUrl, shortUrlPath }: LinkInsertPayload
): Promise<Either<Error, LinkInsertResponse>> {
    const shortUrl = `${env.APP_DOMAIN}/${shortUrlPath}`
    const existing = await repository.findByShortUrl(shortUrl)

    if (existing) {
        // TODO: Create custom error
        return makeLeft(new Error('Short URL already exists'))
    }

    const newLink = await repository.insert(originalUrl, shortUrl)

    return makeRight({
        id: newLink.id,
        originalUrl: newLink.originalUrl,
        shortUrl: newLink.shortUrl,
    })
}

export async function list(): Promise<Either<never, LinkModel[]>> {
    const links = await repository.findAll()
    return makeRight(links)
}

export async function incrementAccessCount(id: string): Promise<Either<Error, number>> {
    const existing = await repository.findById(id)

    if (!existing) {
        // TODO: Create custom error
        return makeLeft(new Error('ID not found'))
    }

    const count = await repository.incrementAccessCount(id)

    return makeRight(count)
}


export async function remove(id: string): Promise<Either<Error, true>> {
    const existing = await repository.findById(id)

    if (!existing) {
        // TODO: Create custom error
        return makeLeft(new Error('ID not found'))
    }

    repository.deleteBy(id)

    return makeRight(true)
}
