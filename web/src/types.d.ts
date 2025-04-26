declare global {
	type Link = {
		id: string;
		originalUrl: string;
		shortUrl: string;
		accessCount: number;
	};
}

export {};
