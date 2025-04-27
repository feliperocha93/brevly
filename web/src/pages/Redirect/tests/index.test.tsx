import { describe, it, vi, expect, beforeEach, Mock } from "vitest";
import { render, screen, waitFor } from "../../../test/test-utils";
import Redirect from "../index";
import { useGetLinkByShortPath } from "../../../hooks/useGetLinkByShortPath";


vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
    }
});

vi.mock("../../../hooks/useGetLinkByShortPath", () => ({
    useGetLinkByShortPath: vi.fn(),
}));

const mockIncrementLink = vi.fn();
vi.mock("../../../hooks/useIncrementLink", () => ({
    useIncrementLink: () => ({
        mutate: mockIncrementLink,
    }),
}));

Object.defineProperty(window, "location", {
    value: { href: "" },
    writable: true,
});


describe("Redirect Page", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        vi.mocked(useGetLinkByShortPath as Mock).mockReturnValue({
            data: undefined,
            isError: false,
        });
    });

    const mockLink = {
        id: "1",
        originalUrl: "https://example.com",
        shortUrl: "https://brev.ly/example",
        accessCount: 10,
    }

    it("renders the loading state while fetching data", async () => {
        render(<Redirect />);

        expect(mockIncrementLink).not.toHaveBeenCalled();
        expect(screen.getByText("Redirecionando...")).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.queryByText("Não foi redirecionado?")).not.toBeInTheDocument();
            expect(screen.queryByText("Acesse aqui")).not.toBeInTheDocument();
        });
    });

    it("redirects to the original URL when data is available", async () => {
        vi.mocked(useGetLinkByShortPath as Mock).mockReturnValue({
            data: mockLink,
            isError: false,
        });

        render(<Redirect />);

        expect(mockIncrementLink).toHaveBeenCalledWith(mockLink.id);
        expect(window.location.href).toBe(mockLink.originalUrl);
        expect(screen.getByText("Não foi redirecionado?")).toBeInTheDocument();
        expect(screen.getByText("Acesse aqui")).toBeInTheDocument();
    });

    it("redirects to /url-not-found when there is an error", async () => {
        vi.mocked(useGetLinkByShortPath as Mock).mockReturnValue({
            data: undefined,
            isError: true,
        });

        render(<Redirect />);

        expect(mockIncrementLink).not.toHaveBeenCalled();
        expect(window.location.href).toBe("/url-not-found");
    });
});
