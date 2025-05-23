import * as repository from '../repositories/link.repository.ts';
import { makeLeft, makeRight } from '../shared/either.ts';

import { stringify } from 'csv-stringify';
import { PassThrough } from 'node:stream';
import type { Either } from '../shared/either.ts';
import { AppError, AppErrorCode } from '../shared/errors.ts';
import { buildFullShortUrl, PROTECTED_PATHS } from '../shared/url-utils.ts';
import { uploadFileToStorage } from '../storage/upload-file-to-storage.ts';


export async function create(
    { originalUrl, shortUrlPath }: LinkInsertPayload
): Promise<Either<AppError, LinkInsertResponse>> {
    if (PROTECTED_PATHS.includes(shortUrlPath)) {
        return makeLeft(new AppError(AppErrorCode.PROTECTED_PATH))
    }

    const shortUrl = buildFullShortUrl(shortUrlPath);
    const existing = await repository.findByShortUrl(shortUrl)
    if (existing) {
        return makeLeft(new AppError(AppErrorCode.SHORT_URL_ALREADY_EXISTS))
    }

    const newLink = await repository.insert(originalUrl, shortUrl)

    return makeRight({
        id: newLink.id,
        originalUrl: newLink.originalUrl,
        shortUrl: newLink.shortUrl,
    })
}

export async function list(): Promise<Either<never, LinkModel[]>> {
    const links = await repository.findAll();
    return makeRight(links);
}

export async function getByShortPath(shortUrlPath: string): Promise<Either<AppError, LinkModel>> {
    const shortUrl = buildFullShortUrl(shortUrlPath);
    const link = await repository.findByShortUrl(shortUrl);

    if (!link) {
        return makeLeft(new AppError(AppErrorCode.SHORT_URL_NOT_FOUND));
    }

    return makeRight(link);
}

export async function exportLinks(): Promise<Either<AppError, { reportUrl: string }>> {
    const links = await repository.findAll();

    if (links.length === 0) {
        return makeLeft(new AppError(AppErrorCode.NO_LINKS_FOUND));
    }

    const formattedLinks = links.map(link => ({
        ...link,
        createdAt: link.createdAt
            ? new Date(link.createdAt).toLocaleString('en-US', { timeZone: 'UTC' })
            : '',
    }));

    const csv = stringify(
        formattedLinks,
        {
            delimiter: ',',
            header: true,
            columns: {
                id: 'ID',
                originalUrl: 'Original URL',
                shortUrl: 'Short URL',
                accessCount: 'Access Count',
                createdAt: 'Created At',
            },
        }
    );

    const uploadToStorageStream = new PassThrough();
    csv.pipe(uploadToStorageStream);

    const uploadToStorage = await uploadFileToStorage({
        contentType: 'text/csv',
        folder: 'exports',
        fileName: `${new Date().toISOString()}`,
        fileFormat: 'csv',
        contentStream: uploadToStorageStream,
    });

    return uploadToStorage
}

export async function incrementAccessCount(id: string): Promise<Either<AppError, number>> {
    const existing = await repository.findById(id)

    if (!existing) {
        return makeLeft(new AppError(AppErrorCode.ID_NOT_FOUND))
    }

    const count = await repository.incrementAccessCount(id)

    return makeRight(count)
}

export async function remove(id: string): Promise<Either<AppError, true>> {
    const existing = await repository.findById(id)

    if (!existing) {
        return makeLeft(new AppError(AppErrorCode.ID_NOT_FOUND))
    }

    await repository.deleteBy(id)

    return makeRight(true)
}
