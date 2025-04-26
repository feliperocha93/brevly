import { api } from "../services/api";

export function useExportLinks() {
	const exportLinks = async () => {
		const response = await api.get<{ reportUrl: string }>("/link/export-csv");
		window.open(response.data.reportUrl, "_blank");
	};

	return { exportLinks };
}
