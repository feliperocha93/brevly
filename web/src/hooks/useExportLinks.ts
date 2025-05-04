import { useState } from "react";
import { api } from "@/services/api";
import { showToast } from "@/components/toast";

export function useExportLinks() {
	const [isLoading, setIsLoading] = useState(false);

	const exportLinks = async () => {
		setIsLoading(true);
		try {
			const response = await api.get<{ reportUrl: string }>("/link/export-csv");
			window.open(response.data.reportUrl, "_blank");
			showToast.success("Relatório gerado com sucesso!");
		} catch (error) {
			showToast.error("Erro ao gerar o relatório.");
		} finally {
			setIsLoading(false);
		}
	};

	return { exportLinks, isLoading };
}
