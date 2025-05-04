import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { generateLogMessage } from "../shared/logs.ts";
import { z } from "zod";

export const healthRoute: FastifyPluginAsyncZod = async (app) => {
    app.get(
        '/health',
        {
            schema: {
                summary: 'Health check',
                response: {
                    200: z.object({
                        status: z.string(),
                        message: z.string(),
                    }),
                },
            },
        },
        async (request, reply) => {
            reply.log.info(generateLogMessage(request, "Health check successful", 200));
            return { status: "ok", message: "API is running" };
        });
};
