import { CustomToaster } from "@/components/toast";
import { Theme } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

function AllProviders({ children }: { children: React.ReactNode }) {
	return (
		<Theme>
			<QueryClientProvider client={new QueryClient()}>
				<BrowserRouter>
					<CustomToaster />
					{children}
				</BrowserRouter>
			</QueryClientProvider>
		</Theme>
	);
}

const customRender = (ui: React.ReactElement, options = {}) =>
	render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
