import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export function useGetLinkByShortPath(shortPath: string) {
	return useQuery<Link>({
		queryKey: ["get-link-by-short-path", shortPath],
		queryFn: ({ queryKey }) => getLinkByShortPath(queryKey[1] as string),
		retry: false,
	});
}

const getLinkByShortPath = async (shortPath: string) => {
	const response = await api.get<Link>(`/link/short-path/${shortPath}`);
	return response.data;
};
