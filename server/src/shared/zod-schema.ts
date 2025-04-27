import { z } from "zod"

const link = z.object({
    id: z.string().uuid(),
    originalUrl: z.string().url(),
    shortUrl: z.string().url(),
    accessCount: z.number(),
    createdAt: z.date(),
})

const linkList = z.array(link)

export const zodSchema = {
    link,
    linkList,
}
