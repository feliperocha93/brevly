import { IconButton } from "../../components/ui/icon-button";

import IconCopy from "../../assets/icons/Copy.svg";
import IconTrash from "../../assets/icons/Trash.svg";

type MyLinksItemProps = Link;

export function MyLinksItem(
    link: MyLinksItemProps
) {
    return (
        <div className="flex justify-between border-t border-t-gray-200 py-3">
            <div className="flex flex-col gap-1">
                {/* TODO: should be a link */}
                <span className="text-md font-semibold text-blue-base">{link.shortUrl}</span>
                <span className="text-sm text-gray-500 max-w-[160px] md:max-w-full truncate">{link.originalUrl}</span>
            </div>

            <div className="flex gap-1 items-center justify-between">
                <span className="text-sm text-gray-500 mr-3">{link.accessCount} acessos</span>
                <IconButton icon={IconCopy} />
                <IconButton icon={IconTrash} />
            </div>
        </div>
    )
}
