import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";

export function useIncrementLink() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (id: string) => {
			await api.patch(`/link/${id}/increment-access-count`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["get-links"],
			});
		},
	});
}
