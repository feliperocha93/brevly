import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/components/toast";
import { api } from "@/services/api";

export function useDeleteLink() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => {
			await api.delete(`/link/${id}`);
		},
		onSuccess: () => {
			showToast.success("Link deletado com sucesso!");
			queryClient.invalidateQueries({
				queryKey: ["get-links"],
			});
		},
		onError: () => {
			showToast.error("Erro ao deletar o link. Tente novamente.");
		},
	});
}
