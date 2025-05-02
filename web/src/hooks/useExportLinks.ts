import { api } from "@/services/api";
import { showToast } from "@/components/toast";

export function useExportLinks() {
	const exportLinks = async () => {
		try {
			const response = await api.get<{ reportUrl: string }>("/link/export-csv");
			window.open(response.data.reportUrl, "_blank");
			showToast.success("Relatório gerado com sucesso!");
		} catch (error) {
			showToast.error("Erro ao gerar o relatório.");
			return;
		}
	};

	return { exportLinks };
}
