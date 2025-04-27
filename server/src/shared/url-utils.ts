import { env } from "../env.ts";

export const PROTECTED_PATHS = ['url-not-found']

export function buildFullShortUrl(path: string): string {
    const cleanedPath = path.startsWith("/") ? path.slice(1) : path;
    return `${env.APP_DOMAIN}/${cleanedPath}`;
}
