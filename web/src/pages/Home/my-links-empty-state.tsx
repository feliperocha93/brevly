import IconLink from "../../assets/icons/Link.svg";

export function MyLinksEmptyState() {
    return (
        <div className="flex flex-col gap-3 items-center justify-center border-t border-t-gray-200 pt-8 pb-4">
            <img src={IconLink} alt="No links" className="w-6 h-6 text-gray-400" />
            <span className="text-sm uppercase text-gray-500">Ainda não existem links cadastrados</span>
        </div>
    )
}
