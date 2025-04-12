import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastify from "fastify";
import scalarUI from "@scalar/fastify-api-reference"
import { serializerCompiler, validatorCompiler, jsonSchemaTransform, hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod'
import { CreateLinkRoute } from "./routes/link.route.ts";

export const app = fastify({
  logger: {
    transport: {
      targets: [
        {
          target: 'pino-pretty',
          level: 'trace',
          options: {
            colorize: true,
            translateTime: 'yyyy-mm-dd HH:MM:ss Z',
            ignore: "pid,hostname",
          },
        },
      ],
    },
  },
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler((error, request, reply) => {
  // Erros esperados a aplicação deve tratar
  if (hasZodFastifySchemaValidationErrors(error)) {
    // app.log.error(error)
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

app.register(CreateLinkRoute)

app.register(scalarUI, {
  routePrefix: "/docs",
  logLevel: "info", // workaround to keep
});

app.listen({ port: 3333, host: '0.0.0.0' });
