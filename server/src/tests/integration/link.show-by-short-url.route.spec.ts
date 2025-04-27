import { describe, it, expect, beforeEach } from 'vitest';
import { db } from '../../db/index.ts';
import { schema } from '../../db/schemas/index.ts';
import { app } from '../../server.ts';
import { AppErrorCode } from '../../shared/errors.ts';

describe.concurrent('Link Show By Short URL route', () => {
    beforeEach(() => {
        return db.delete(schema.links);
    });

    it('should return the link when short URL exists', async () => {
        const link = { originalUrl: 'https://example.com', shortUrl: 'https://test.brev.ly/example' };
        await db.insert(schema.links).values(link);

        const response = await app.inject({
            method: 'GET',
            url: `/link/short-path/example`,
        });

        expect(response.statusCode).toBe(200);
        const responseBody = JSON.parse(response.body);
        expect(responseBody).toHaveProperty('originalUrl', link.originalUrl);
        expect(responseBody).toHaveProperty('shortUrl', link.shortUrl);
    });

    it('should return 404 when short URL does not exist', async () => {
        const nonExistentShortUrl = 'https://brev.ly/non-existent';

        const response = await app.inject({
            method: 'GET',
            url: `/link/short-path/${encodeURIComponent(nonExistentShortUrl)}`,
        });

        expect(response.statusCode).toBe(404);
        expect(response.json()).toEqual({
            error: AppErrorCode.SHORT_URL_NOT_FOUND,
        });
    });
});
