import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import scalarUI from "@scalar/fastify-api-reference"
import { serializerCompiler, validatorCompiler, jsonSchemaTransform, hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod'

import { linkRoute } from "./routes/link.index.ts";
import { env } from "./env.ts";

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
      request: {
        method: request.method,
        url: request.url,
        body: request.body,
        query: request.query,
        params: request.params,
      },
      validation: error.validation,
    }, `${request.url} ${request.method} ${error.statusCode} hasZodFastifySchemaValidationErrors `)

    return reply.status(400).send({
      message: 'Validation error',
      issues: error.validation
    })
  }

  // TODO: Check if works
  // app.log.error(error)
  console.log(error)

  return reply.status(500).send({ message: 'Internal server error' })
})

app.register(fastifyCors, {
  origin: "*",
});

app.register(fastifySwagger, {
  transform: jsonSchemaTransform,
});

app.register(linkRoute.store)
app.register(linkRoute.index)

app.register(scalarUI, {
  routePrefix: "/docs",
});
