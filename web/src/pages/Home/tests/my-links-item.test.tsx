import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "../../../test/test-utils";

import { MyLinksItem } from "../my-links-item";

const deleteMock = vi.fn();
vi.mock("../../../hooks/useDeleteLink", () => ({
	useDeleteLink: () => ({
		mutate: deleteMock,
	}),
}));

beforeEach(() => {
	vi.clearAllMocks();
});

describe("Home Page - MyLinksItem", () => {
	it("copies the short URL to the clipboard", async () => {
		Object.assign(navigator, {
			clipboard: {
				writeText: vi.fn().mockResolvedValueOnce(undefined),
			},
		});

		render(
			<MyLinksItem
				id="1"
				originalUrl="https://example.com"
				shortUrl="https://brev.ly/example"
				accessCount={10}
			/>,
		);

		const copyButton = screen.getByRole("button", {
			name: "Copiar link para a área de transferência",
		});
		fireEvent.click(copyButton);

		expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
			"https://brev.ly/example",
		);
	});

	it("deletes the link when the delete button is clicked", async () => {
		render(
			<MyLinksItem
				id="mock-uuid"
				originalUrl="https://example.com"
				shortUrl="https://brev.ly/example"
				accessCount={10}
			/>,
		);

		const deleteButton = screen.getByRole("button", { name: "Excluir link" });
		fireEvent.click(deleteButton);

		expect(deleteMock).toHaveBeenCalledWith("mock-uuid");
	});
});
