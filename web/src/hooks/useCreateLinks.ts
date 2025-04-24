// hooks/useCreateLink.ts
import { useMutation } from "@tanstack/react-query";
import type { LinkInput } from "../schemas/link-schema";
import { api } from "../services/api";

export function useCreateLink() {
	return useMutation({
		mutationFn: async (data: LinkInput) => {
			const response = await api.post("/link", data);
			return response.data;
		},
	});
}
