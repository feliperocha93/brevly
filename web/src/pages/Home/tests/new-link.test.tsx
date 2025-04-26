import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { NewLink } from "../new-link";

import "@testing-library/jest-dom";

const mutateMock = vi.fn();
let isPendingMock = false;

vi.mock("../../../hooks/useCreateLinks", () => {
	return {
		useCreateLink: () => ({
			mutate: (...args: unknown[]) => {
				isPendingMock = true;
				return mutateMock(...args);
			},
			isPending: isPendingMock,
		}),
	};
});

beforeEach(() => {
	vi.clearAllMocks();
});

describe("NewLink Component", () => {
	describe("originalUrl", () => {
		it("shows error when invalid", async () => {
			render(<NewLink />);

			const inputOriginalUrl =
				screen.getByPlaceholderText("www.exemplo.com.br");
			fireEvent.input(inputOriginalUrl, {
				target: { value: "URL inválida" },
			});

			const button = screen.getByText("Salvar Link");
			fireEvent.click(button);

			await waitFor(() => {
				const error = screen.getByText("URL inválida", { selector: "span" });
				expect(error).toBeInTheDocument();
			});
		});

		it("shows no error when valid", async () => {
			render(<NewLink />);

			const inputOriginalUrl =
				screen.getByPlaceholderText("www.exemplo.com.br");
			fireEvent.input(inputOriginalUrl, {
				target: { value: "https://google.com" },
			});

			const button = screen.getByText("Salvar Link");
			fireEvent.click(button);

			await waitFor(() => {
				const error = screen.queryByText("URL inválida", { selector: "span" });
				expect(error).not.toBeInTheDocument();
			});
		});

		it("clean erros when fixed", async () => {
			render(<NewLink />);

			const inputOriginalUrl =
				screen.getByPlaceholderText("www.exemplo.com.br");
			const button = screen.getByText("Salvar Link");

			fireEvent.click(button);

			await waitFor(() => {
				const error = screen.getByText("URL inválida", { selector: "span" });
				expect(error).toBeInTheDocument();
			});

			fireEvent.input(inputOriginalUrl, {
				target: { value: "https://google.com" },
			});

			await waitFor(() => {
				const error = screen.queryByText("URL inválida", { selector: "span" });
				expect(error).not.toBeInTheDocument();
			});
		});
	});

	describe("shortUrlPath", () => {
		it("shows error when empty", async () => {
			render(<NewLink />);

			const button = screen.getByText("Salvar Link");
			fireEvent.click(button);

			await waitFor(() => {
				const error = screen.getByText("Pelo menos 1 caracter", {
					selector: "span",
				});
				expect(error).toBeInTheDocument();
			});
		});

		it("shows error when more than limit 20", async () => {
			render(<NewLink />);

			const inputshortUrlPath = screen.getByPlaceholderText("brev.ly/");
			fireEvent.input(inputshortUrlPath, {
				target: { value: "short-path-should-have-less-than-10" },
			});

			const button = screen.getByText("Salvar Link");
			fireEvent.click(button);

			await waitFor(() => {
				const error = screen.queryByText("Até 20 caracteres", {
					selector: "span",
				});
				expect(error).toBeInTheDocument();
			});
		});

		it("shows error when caracter not allowed", async () => {
			render(<NewLink />);

			const inputshortUrlPath = screen.getByPlaceholderText("brev.ly/");
			fireEvent.input(inputshortUrlPath, {
				target: { value: "short@path" },
			});

			const button = screen.getByText("Salvar Link");
			fireEvent.click(button);

			await waitFor(() => {
				const error = screen.queryByText(
					"Desculpe, apenas letras, números, _ e -",
					{
						selector: "span",
					},
				);
				expect(error).toBeInTheDocument();
			});
		});

		it("clean erros when fixed", async () => {
			render(<NewLink />);

			const inputshortUrlPath = screen.getByPlaceholderText("brev.ly/");
			fireEvent.input(inputshortUrlPath, {
				target: { value: "short@path" },
			});

			const button = screen.getByText("Salvar Link");
			fireEvent.click(button);

			await waitFor(() => {
				const error = screen.queryByText(
					"Desculpe, apenas letras, números, _ e -",
					{
						selector: "span",
					},
				);
				expect(error).toBeInTheDocument();
			});

			fireEvent.input(inputshortUrlPath, {
				target: { value: "short_path" },
			});
			await waitFor(() => {
				const error = screen.queryByText(
					"Desculpe, apenas letras, números, _ e -",
					{
						selector: "span",
					},
				);
				expect(error).not.toBeInTheDocument();
			});
		});
	});

	describe("submit button", () => {
		it("does nothing when data ins invalid", async () => {
			render(<NewLink />);

			const button = screen.getByText("Salvar Link");

			fireEvent.click(button);
			await waitFor(() => {
				expect(button).not.toBeDisabled();
			});

			await waitFor(() => {
				expect(mutateMock).not.toHaveBeenCalledWith();
			});
		});

		it("sends form when data is valid", async () => {
			render(<NewLink />);

			const inputOriginalUrl =
				screen.getByPlaceholderText("www.exemplo.com.br");
			const inputshortUrlPath = screen.getByPlaceholderText("brev.ly/");

			fireEvent.input(inputOriginalUrl, {
				target: { value: "https://google.com" },
			});
			fireEvent.input(inputshortUrlPath, {
				target: { value: "short_path" },
			});

			const button = screen.getByText("Salvar Link");

			fireEvent.click(button);
			await waitFor(() => {
				expect(button).toBeDisabled();
			});

			await waitFor(() => {
				expect(mutateMock).toHaveBeenCalledWith({
					originalUrl: "https://google.com",
					shortUrlPath: "short_path",
				});
			});
		});
	});
});
