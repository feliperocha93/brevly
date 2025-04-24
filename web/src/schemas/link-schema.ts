import { z } from "zod";

export const LinkInputSchema = z.object({
	originalUrl: z.string().url("URL inválida"),
	shortUrlPath: z
		.string()
		.min(1, "Pelo menos 1 caracter")
		.max(20, "Até 20 caracteres")
		.regex(/^[a-zA-Z0-9_-]+$/, "Desculpe, apenas letras, números, _ e -"),
});

export type LinkInput = z.infer<typeof LinkInputSchema>;
