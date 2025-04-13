import { z } from "zod"
import { isRight, unwrapEither } from "../shared/either.ts";
import * as service from "../services/link.service.ts";

import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"

const storeLinkInputSchema = z.object({
  originalUrl: z.string().url(),
  shortUrlPath: z.string().min(1).max(20),
})

const storeLinkOutputSchema = z.object({
  id: z.string().uuid(),
  originalUrl: z.string().url(),
  shortUrl: z.string().url(),
})

export const store: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/link',
    {
      schema: {
        summary: 'Create a new link',
        body: storeLinkInputSchema,
        response: {
          201: storeLinkOutputSchema,
          400: z.object({
            message: z.string(),
            issues: z.array(z.any()),
          }),
          409: z.object({
            error: z.string(),
          }),
        }
      },
    },
    async (request, reply) => {
      const { originalUrl, shortUrlPath } = storeLinkInputSchema.parse(request.body);

      const result = await service.create({
        originalUrl,
        shortUrlPath,
      });

      if (isRight(result)) {
        const link = unwrapEither(result);
        return reply.status(201).send(link);
      }

      const error = unwrapEither(result);

      switch (error.message) {
        case 'Short URL already exists':
          return reply.status(409).send({
            error: error.message
          });
      }

    }
  )
}
