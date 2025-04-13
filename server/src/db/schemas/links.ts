import { pgTable } from "drizzle-orm/pg-core";
import { text, integer, timestamp } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const links = pgTable("links", {
    id: text("id").primaryKey().$defaultFn(() => uuidv7()),
    originalUrl: text("original_url").notNull(),
    shortUrl: text("short_url").notNull().unique(),
    accessCount: integer("access_count").default(0).notNull(), // notNull ensure correct type using drizzle-orm InferSelectModel
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
