import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import scalarUI from "@scalar/fastify-api-reference"
import { serializerCompiler, validatorCompiler, jsonSchemaTransform, hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod'

import { linkRoute } from "./routes/link.index.ts";
import { env } from "./env.ts";
import { generateLogMessage } from "./shared/logs.ts";

export const app = fastify({
  logger: {
    level: env.NODE_ENV === "test" ? "silent" : "trace",
    transport: {
      targets: [
        {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'yyyy-mm-dd HH:MM:ss Z',
            ignore: "pid,hostname",
          },
        },
      ],
    },
  },
  disableRequestLogging: true,
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler((error, request, reply) => {
  // Erros esperados a aplicação deve tratar
  if (hasZodFastifySchemaValidationErrors(error)) {
    app.log.warn({
      method: request.method,
      url: request.url,
      body: request.body,
      query: request.query,
      params: request.params,
      validation: error.validation,
    }, generateLogMessage(request, 'hasZodFastifySchemaValidationErrors', 400));

    return reply.status(400).send({
      message: 'Validation error',
      issues: error.validation
    })
  }

  app.log.error(error, `${request.url} ${request.method} ${error.statusCode} Internal server error`)
  return reply.status(500).send({ message: 'Internal server error' })
})

app.register(fastifyCors, {
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PATCH", "OPTIONS"]
});

app.register(fastifySwagger, {
  transform: jsonSchemaTransform,
});

app.register(linkRoute.store)
app.register(linkRoute.index)
app.register(linkRoute.showByShortPath)
app.register(linkRoute.exportCsv)
app.register(linkRoute.incrementAccessCount)
app.register(linkRoute.destroy)

app.register(scalarUI, {
  routePrefix: "/docs",
});
