import { pgTable } from "drizzle-orm/pg-core";
import { text, integer, timestamp } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const links = pgTable("links", {
    id: text("id").primaryKey().$defaultFn(() => uuidv7()),
    originalUrl: text("original_url").notNull(),
    shortenedUrl: text("shortened_url").notNull().unique(),
    accessCount: integer("access_count").default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
