import { Link } from "@phosphor-icons/react"
import { CSSProperties } from "react";
import { ClipLoader } from "react-spinners";

const override: CSSProperties = {
    margin: "0 auto",
};

export function MyLinksEmptyState({ isLoadingLinks }: { isLoadingLinks?: boolean }) {
    return (
        <div className="flex flex-col gap-3 items-center justify-center border-t border-t-gray-200 pt-8 pb-4">
            {
                isLoadingLinks ?
                    <ClipLoader size={36} color="gray" aria-label="Loading Spinner" cssOverride={override} /> :
                    <>
                        <Link size={32} className="text-gray-400" />
                        <span className="text-sm uppercase text-gray-500">Ainda não existem links cadastrados</span>
                    </>
            }
        </div>
    )
}
