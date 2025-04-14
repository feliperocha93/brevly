import type { FastifyRequest } from "fastify";

/**
 * Creates a standarized log message.
 *
 * @param request - The Fastify request object containing details about the HTTP request.
 * @param message - A descriptive message to include in the log.
 * @param statusCode - (Optional) The HTTP status code to include in the log.
 * @returns A formatted log message string combining the request URL, method, status code (if provided), and message.
 */
export const generateLogMessage = (request: FastifyRequest, message: string, statusCode?: number) => {
    return `${request.url} ${request.method} ${statusCode || ''} ${message}`.replace(/\s+/g, ' ').trim();
}
