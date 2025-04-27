import { z } from "zod";
import * as service from "../services/link.service.ts";
import { isRight, unwrapEither } from "../shared/either.ts";
import { generateLogMessage } from "../shared/logs.ts";

import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { AppErrorCode } from "../shared/errors.ts";
import { zodSchema } from "../shared/zod-schema.ts";

export const showByShortPath: FastifyPluginAsyncZod = async (app) => {
    app.get(
        '/link/short-path/:shortPath',
        {
            schema: {
                summary: 'Get link by short Path',
                params: z.object({
                    shortPath: z.string(),
                }),
                response: {
                    200: zodSchema.link,
                    404: z.object({
                        error: z.string(),
                    }),
                },
            },
        },
        async (request, reply) => {
            const shortPath = z.string().parse(request.params.shortPath);

            const result = await service.getByShortPath(shortPath);

            if (isRight(result)) {
                const link = unwrapEither(result);
                reply.log.info({ link }, generateLogMessage(request, 'Link fetched successfully', 200));
                return reply.status(200).send(link);
            }

            const error = unwrapEither(result);

            if (error.code === AppErrorCode.SHORT_URL_NOT_FOUND) {
                reply.log.warn({
                    request: {
                        method: request.method,
                        url: request.url,
                        params: request.params,
                    },
                }, generateLogMessage(request, error.code, 404));
                return reply.status(404).send({
                    error: error.code,
                });
            }
        }
    );
};
