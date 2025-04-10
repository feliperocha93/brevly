import { env } from "@/env.ts";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { schema } from './schemas/index.ts'

export const pg = postgres(env.DATABASE_URL)
export const db = drizzle(pg, { schema })
