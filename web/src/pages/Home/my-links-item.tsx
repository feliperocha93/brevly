import { showToast } from "@/components/toast/index";
import { useDeleteLink } from "@/hooks/useDeleteLink";

import { Copy, Trash } from "@phosphor-icons/react";
import { IconButton } from "@/components/ui/icon-button";
import { Tooltip } from "@radix-ui/themes";

type MyLinksItemProps = Link;

// TODO: Remove this function and update tests
function copyShortUrlToClipboard(shortUrl: string) {
	navigator.clipboard
		.writeText(shortUrl)
		.then(() => {
			showToast.success(`Link copiado para o clipboard`, shortUrl);
		})
		.catch(() => {
			showToast.error(`Erro ao copiar link`, shortUrl);
		});
}

export function MyLinksItem(link: MyLinksItemProps) {
	const { mutate: deleteLink, isPending: isDeleting } = useDeleteLink();

	return (
		<div className="flex justify-between border-t border-t-gray-200 py-3">
			<div className="flex flex-col gap-1">
				<a
					className="text-md font-semibold text-blue-base max-w-[140px] md:max-w-full text-clip"
					href={link.shortUrl}
					target="_blank"
					rel="noreferrer"
				>
					{link.shortUrl.split("/").slice(-1)}
				</a>
				<Tooltip content={link.originalUrl} delayDuration={500} side="bottom">
					<span className="text-sm text-gray-500 max-w-[160px] md:max-w-[240px] truncate">
						{link.originalUrl}
					</span>
				</Tooltip>

			</div>

			<div className="flex gap-1 items-center justify-between">
				<span
					className="text-sm text-gray-500 mr-3"
					aria-label={`Número de acessos: ${link.accessCount}`}
				>
					{link.accessCount} acessos
				</span>
				<IconButton
					Icon={Copy}
					alt="Copiar link"
					onClick={() => copyShortUrlToClipboard(link.shortUrl)}
					aria-label="Copiar link para a área de transferência"
				/>
				<IconButton
					Icon={Trash}
					alt="Excluir link"
					onClick={() => deleteLink(link.id)}
					disabled={isDeleting}
					isLoading={isDeleting}
					aria-label="Excluir link"
				/>
			</div>
		</div>
	);
}
