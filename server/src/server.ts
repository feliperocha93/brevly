import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastify from "fastify";
import scalarUI from "@scalar/fastify-api-reference"
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from 'fastify-type-provider-zod'

const app = fastify({
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

app.register(fastifyCors, {
  origin: "*",
});

app.register(fastifySwagger, {
  transform: jsonSchemaTransform,
});

app.register(scalarUI, {
  routePrefix: "/docs",
  logLevel: "info", // workaround to keep
});

app.listen({ port: 3333, host: '0.0.0.0' });
