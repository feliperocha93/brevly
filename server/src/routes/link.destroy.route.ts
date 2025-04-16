import { z } from "zod"
import * as service from "../services/link.service.ts";
import { isRight, unwrapEither } from "../shared/either.ts";
import { generateLogMessage } from "../shared/logs.ts";

import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"


export const destroy: FastifyPluginAsyncZod = async (app) => {
    app.delete(
        '/link/:id',
        {
            schema: {
                summary: 'Remove a link',
                params: z.object({
                    id: z.string().uuid(),
                }),
                response: {
                    204: z.void(),
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

            const result = await service.remove(id);

            if (isRight(result)) {
                reply.log.info({}, generateLogMessage(request, 'Link removed successfully', 204));
                return reply.status(204).send();
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
