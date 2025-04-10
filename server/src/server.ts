import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastify from "fastify";
import scalarUI from "@scalar/fastify-api-reference"
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from 'fastify-type-provider-zod'

const app = fastify()

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: "*",
});

// TODO: Check if this is needed when using scalarUI
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Brevly API",
      description: "API documentation for Brevly",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(scalarUI, {
  routePrefix: "/docs",
})

app.listen({ port: 3333, host: '0.0.0.0' }).then((address) => {
  console.log(`Server listening at ${address}`);
});
