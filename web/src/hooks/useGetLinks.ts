import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

export function useGetLinks() {
	const { data, isLoading } = useQuery<Link[]>({
		queryKey: ["get-links"],
		queryFn: getLinks,
	});

	return { data, isLoading };
}

const getLinks = async () => {
	const response = await api.get<Link[]>("/link");
	return response.data;
};
