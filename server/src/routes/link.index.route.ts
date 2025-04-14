import { z } from "zod"
import * as service from "../services/link.service.ts";
import { unwrapEither } from "../shared/either.ts";

import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { generateLogMessage } from "../shared/logs.ts";

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
        async (request, reply) => {
            const links = await service.list();

            const response = unwrapEither(links);

            reply.log.info({ links_listed: response.length }, generateLogMessage(request, 'Links listed successfully', 200));
            return reply.status(200).send(indexLinkOutputSchema.parse(response));
        }
    )
}
