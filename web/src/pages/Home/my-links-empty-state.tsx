import { Link } from "@phosphor-icons/react"

export function MyLinksEmptyState() {
    return (
        <div className="flex flex-col gap-3 items-center justify-center border-t border-t-gray-200 pt-8 pb-4">
            <span>
                <Link size={32} className="text-gray-400" />
            </span>
            <span className="text-sm uppercase text-gray-500">Ainda não existem links cadastrados</span>
        </div>
    )
}
