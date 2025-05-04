import { FastifyPluginAsync } from "fastify";
import { generateLogMessage } from "../shared/logs.ts";

export const healthRoute: FastifyPluginAsync = async (app) => {
    app.get('/health', async (request, reply) => {
        reply.log.info(generateLogMessage(request, "Health check successful", 200));
        return { status: "ok", message: "API is running" };
    });
};
