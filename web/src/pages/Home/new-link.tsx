import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const LinkInputSchema = z.object({
	originalUrl: z.string().url("URL inválida"),
	shortUrlPath: z
		.string()
		.min(1, "Pelo menos 1 caracter")
		.max(20, "Até 20 caracteres")
		.regex(/^[a-zA-Z0-9_-]+$/, "Desculpe, apenas letras, números, _ e -"),
});

type LinkInput = z.infer<typeof LinkInputSchema>;

export function NewLink() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LinkInput>({ resolver: zodResolver(LinkInputSchema) });
	// TODO: Implementar a função de criar o link
	const onSubmit: SubmitHandler<LinkInput> = (data) => console.log(data);

	return (
		<div className="bg-white rounded-lg w-full p-6 md:p-8">
			<h2 className="text-lg font-bold text-gray-600 mb-5">Novo Link</h2>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-5 md:gap-6"
			>
				<div className="flex flex-col gap-4">
					<Input
						{...register("originalUrl")}
						placeholder="www.exemplo.com.br"
						label="Link Original"
						error={errors.originalUrl}
					/>
					<Input
						{...register("shortUrlPath")}
						placeholder="brev.ly/"
						label="Link encurtado"
						error={errors.shortUrlPath}
					/>
				</div>
				<Button type="submit">Salvar Link</Button>
			</form>
		</div>
	);
}
