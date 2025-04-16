import { links } from "../db/schemas/links.ts";
import { InferSelectModel, InferModelFromColumns, InferSelectViewModel } from "drizzle-orm";

declare global {
    type LinkModel = InferSelectModel<typeof links>;
    type LinkInsertPayload = Pick<LinkModel, 'originalUrl'> & { shortUrlPath: string };
    type LinkInsertResponse = Pick<LinkModel, 'id' | 'originalUrl' | 'shortUrl'>;
}
