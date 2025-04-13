import { z } from "zod"
import * as service from "../services/link.service.ts";
import { unwrapEither } from "../shared/either.ts";

import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"

const indexLinkOutputSchema = z.array(
    z.object({
        id: z.string().uuid(),
        originalUrl: z.string().url(),
        shortUrl: z.string().url(),
        accessCount: z.number(),
        createdAt: z.date(),
    })
)

export const index: FastifyPluginAsyncZod = async (app) => {
    app.get(
        '/link',
        {
            schema: {
                summary: 'List all links',
                response: {
                    200: indexLinkOutputSchema
                }
            },
        },
        async (_request, reply) => {
            const links = await service.list();

            const response = unwrapEither(links);

            return reply.status(200).send(response);
        }
    )
}
