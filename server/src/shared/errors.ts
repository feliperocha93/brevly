export const AppErrorCode = {
    ID_NOT_FOUND: 'ID_NOT_FOUND',
    NO_LINKS_FOUND: 'NO_LINKS_FOUND',
    PROTECTED_PATH: 'PROTECTED_PATH',
    SHORT_URL_ALREADY_EXISTS: 'SHORT_URL_ALREADY_EXISTS',
    SHORT_URL_NOT_FOUND: 'SHORT_URL_NOT_FOUND',
    CLOUDFLARE_CONFIGURATION_NOT_SET: 'CLOUDFLARE_CONFIGURATION_NOT_SET',
} as const;

export type AppErrorCodeType = typeof AppErrorCode[keyof typeof AppErrorCode];

export class AppError extends Error {
    public code: AppErrorCodeType;

    constructor(code: AppErrorCodeType, message?: string) {
        super(message);
        this.name = 'AppError';
        this.code = code;
    }
}
