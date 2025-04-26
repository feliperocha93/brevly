import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { showToast } from "../components/toast";
import type { LinkInput } from "../schemas/link-schema";
import { api } from "../services/api";

export function useCreateLink() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: LinkInput) => {
			const response = await api.post("/link", data);
			return response.data;
		},
		onSuccess: () => {
			showToast.success("Link salvo com sucesso!");
			queryClient.invalidateQueries({
				queryKey: ["get-links"],
			});
		},
		onError: (error: AxiosError) => {
			if (error.status === 409) {
				showToast.error("Essa URL encurtada já existe.");
			} else if (error.status === 400) {
				showToast.error("Erro nos dados enviados.");
			} else {
				showToast.error("Algo deu errado. Tente novamente.");
			}
		},
	});
}
