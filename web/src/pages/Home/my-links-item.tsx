import { IconButton } from "../../components/ui/icon-button";

import IconCopy from "../../assets/icons/Copy.svg";
import IconTrash from "../../assets/icons/Trash.svg";

export function MyLinksItem(
    link: { id: string; original: string; shortened: string; count: number }
) {
    return (
        <div className="flex justify-between border-t border-t-gray-200 py-3">
            <div className="flex flex-col gap-1">
                <span className="text-md font-semibold text-blue-base">{link.shortened}</span>
                <span className="text-sm text-gray-500 max-w-[160px] md:max-w-full truncate">{link.original}</span>
            </div>

            <div className="flex gap-1 items-center justify-between">
                <span className="text-sm text-gray-500 mr-3">{link.count} acessos</span>
                <IconButton icon={IconCopy} />
                <IconButton icon={IconTrash} />
            </div>
        </div>
    )
}
