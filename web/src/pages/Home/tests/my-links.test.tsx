import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "../../../test/test-utils";

import { MyLinks } from "../my-links";

const exportMock = vi.fn();
vi.mock("../../../hooks/useExportLinks", () => ({
	useExportLinks: () => ({
		exportLinks: exportMock,
	}),
}));

describe("Home Page - MyLinks", () => {
	it("renders the empty state when there are no links", () => {
		render(<MyLinks links={[]} />);

		expect(
			screen.getByText("Ainda não existem links cadastrados"),
		).toBeInTheDocument();
	});

	it("renders a list of links", () => {
		const links = [
			{
				id: "1",
				originalUrl: "https://example.com",
				shortUrl: "https://brev.ly/example",
				accessCount: 10,
			},
			{
				id: "2",
				originalUrl: "https://another.com",
				shortUrl: "https://brev.ly/another",
				accessCount: 5,
			},
		];

		render(<MyLinks links={links} />);

		expect(screen.getByText("https://example.com")).toBeInTheDocument();
		expect(screen.getByText("https://another.com")).toBeInTheDocument();
	});

	it("keeps export links button disabled when has no links", () => {
		render(<MyLinks links={[]} />);

		const exportButton = screen.getByRole("button", {
			name: "Baixar CSV",
		});
		fireEvent.click(exportButton);

		expect(exportMock).not.toHaveBeenCalled();
		expect(exportButton).toBeDisabled();
	});

	it("donwloads links when button is clicked", () => {
		render(
			<MyLinks
				links={[
					{
						id: "1",
						originalUrl: "https://example.com",
						shortUrl: "https://brev.ly/example",
						accessCount: 10,
					},
				]}
			/>,
		);

		const exportButton = screen.getByText("Baixar CSV");
		fireEvent.click(exportButton);

		expect(exportMock).toHaveBeenCalled();
	});
});
