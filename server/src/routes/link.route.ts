import { z } from "zod"
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { createShortLink } from "../services/link.service.ts";
import { isRight, unwrapEither } from "../shared/either.ts";

const createLinkInputSchema = z.object({
  originalUrl: z.string().url(),
  shortUrlPath: z.string().min(1).max(20),
})

const createLinkOutputSchema = z.object({
  id: z.string().uuid(),
  originalUrl: z.string().url(),
  shortUrl: z.string().url(),
})

export const CreateLinkRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/link',
    {
      schema: {
        summary: 'Create a new link',
        body: createLinkInputSchema,
        response: {
          201: createLinkOutputSchema,
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
      const { originalUrl, shortUrlPath } = createLinkInputSchema.parse(request.body);

      const result = await createShortLink({
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
