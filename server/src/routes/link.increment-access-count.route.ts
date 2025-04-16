import { z } from "zod"
import * as service from "../services/link.service.ts";
import { isRight, unwrapEither } from "../shared/either.ts";
import { generateLogMessage } from "../shared/logs.ts";

import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"

export const incrementAccessCount: FastifyPluginAsyncZod = async (app) => {
    app.patch(
        '/link/:id/increment-access-count',
        {
            schema: {
                summary: 'Increment access count for a link',
                params: z.object({
                    id: z.string().uuid(),
                }),
                response: {
                    200: z.object({
                        accessCount: z.number().int(),
                    }),
                    400: z.object({
                        message: z.string(),
                        issues: z.array(z.any()),
                    }),
                    404: z.object({
                        error: z.string(),
                    }),
                }
            },
        },
        async (request, reply) => {
            const id = z.string().uuid().parse(request.params.id);

            const result = await service.incrementAccessCount(id);

            if (isRight(result)) {
                const accessCount = unwrapEither(result);
                reply.log.info({ accessCount }, generateLogMessage(request, 'Link access count incremented successfully', 204));
                return reply.status(200).send({ accessCount });
            }

            const error = unwrapEither(result);

            switch (error.message) {
                case 'ID not found':
                    reply.log.warn({
                        request: {
                            method: request.method,
                            url: request.url,
                            params: request.params,
                        },
                    }, generateLogMessage(request, error.message, 404));
                    return reply.status(404).send({
                        error: error.message,
                    });
            }
        }
    )
}
