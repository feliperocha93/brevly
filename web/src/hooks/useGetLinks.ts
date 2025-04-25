import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";

export function useGetLinks() {
	return useQuery<Link[]>({
		queryKey: ["links"],
		queryFn: getLinks,
	});
}

const getLinks = async () => {
	const response = await api.get<Link[]>("/link");
	return response.data;
};
