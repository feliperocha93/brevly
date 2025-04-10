import { z } from 'zod'

const envSchema = z.object({
    PORT: z.coerce.number().default(3333),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
    POSTGRES_USER: z.string().default('root'),
    POSTGRES_PASSWORD: z.string().default('root'),
    POSTGRES_DB: z.string().default('brevly_dev'),
    DATABASE_URL: z.string().url().startsWith('postgresql://'),
})

export const env = envSchema.parse(process.env)
