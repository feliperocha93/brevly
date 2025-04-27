import * as service from "../services/link.service.ts";
import { unwrapEither } from "../shared/either.ts";

import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { generateLogMessage } from "../shared/logs.ts";
import { zodSchema } from "../shared/zod-schema.ts";

export const index: FastifyPluginAsyncZod = async (app) => {
    app.get(
        '/link',
        {
            schema: {
                summary: 'List all links',
                response: {
                    200: zodSchema.linkList,
                }
            },
        },
        async (request, reply) => {
            const links = await service.list();

            const response = unwrapEither(links);

            reply.log.info({ links_listed: response.length }, generateLogMessage(request, 'Links listed successfully', 200));
            return reply.status(200).send(zodSchema.linkList.parse(response));
        }
    )
}
