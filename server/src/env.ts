import { z } from 'zod'

const envSchema = z.object({
    PORT: z.coerce.number().default(3333),
    APP_DOMAIN: z.string().url(),
    NODE_ENV: z.enum(['development', 'test', 'production']),
    POSTGRES_USER: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_DB: z.string(),
    DATABASE_URL: z.string().url().startsWith('postgresql://'),
})

export const env = envSchema.parse(process.env);
