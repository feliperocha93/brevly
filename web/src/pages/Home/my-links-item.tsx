import { IconButton } from "../../components/ui/icon-button";

import IconCopy from "../../assets/icons/Copy.svg";
import IconTrash from "../../assets/icons/Trash.svg";

import { showToast } from "../../components/toast/index";
import { useDeleteLink } from "../../hooks/useDeleteLink";

type MyLinksItemProps = Link;

// TODO: Remove this function and update tests
function copyShortUrlToClipboard(shortUrl: string) {
	navigator.clipboard
		.writeText(shortUrl)
		.then(() => {
			showToast.success("Link copiado com sucesso!");
		})
		.catch(() => {
			showToast.error("Erro ao copiar o link");
		});
}

export function MyLinksItem(link: MyLinksItemProps) {
	const { mutate: deleteLink, isPending: isDeleting } = useDeleteLink();

	return (
		<div className="flex justify-between border-t border-t-gray-200 py-3">
			<div className="flex flex-col gap-1">
				<a
					className="text-md font-semibold text-blue-base"
					href={link.shortUrl}
					target="_blank"
					rel="noreferrer"
				>
					{link.shortUrl}
				</a>
				<span className="text-sm text-gray-500 max-w-[160px] md:max-w-full truncate">
					{link.originalUrl}
				</span>
			</div>

			<div className="flex gap-1 items-center justify-between">
				<span
					className="text-sm text-gray-500 mr-3"
					aria-label={`Número de acessos: ${link.accessCount}`}
				>
					{link.accessCount} acessos
				</span>
				<IconButton
					icon={IconCopy}
					onClick={() => copyShortUrlToClipboard(link.shortUrl)}
					aria-label="Copiar link para a área de transferência"
				/>
				<IconButton
					icon={IconTrash}
					onClick={() => deleteLink(link.id)}
					disabled={isDeleting}
					aria-label="Excluir link"
				/>
			</div>
		</div>
	);
}
