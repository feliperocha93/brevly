import { z } from "zod";
import * as service from "../services/link.service.ts";
import { isRight, unwrapEither } from "../shared/either.ts";
import { generateLogMessage } from "../shared/logs.ts";

import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { AppErrorCode } from "../shared/errors.ts";

const exportCsvOutputSchema = z.object({
  reportUrl: z.string().url(),
})

export const exportCsv: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/link/export-csv',
    {
      schema: {
        summary: 'Export links to CSV and return file URL',
        response: {
          200: exportCsvOutputSchema,
          400: z.object({
            error: z.string(),
          }),
          500: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await service.exportLinks();

      if (isRight(result)) {
        const { reportUrl } = unwrapEither(result);
        reply.log.info({ reportUrl }, generateLogMessage(request, 'Links exported to CSV successfully', 200));
        return reply.status(200).send({
          reportUrl,
        });
      }

      const error = unwrapEither(result);

      switch (error.code) {
        case AppErrorCode.NO_LINKS_FOUND:
          reply.log.warn({
            request: {
              method: request.method,
              url: request.url,
              query: request.query,
              params: request.params,
            }
          }, generateLogMessage(request, error.code, 400));
          return reply.status(400).send({
            error: error.code
          });
        case AppErrorCode.CLOUDFLARE_CONFIGURATION_NOT_SET:
          reply.log.warn(generateLogMessage(request, error.code, 500));
          return reply.status(500).send({
            error: error.code
          });
      }
    }
  )
}
