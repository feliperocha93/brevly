import { MyLinksEmptyState } from "./my-links-empty-state";
import { MyLinksItem } from "./my-links-item";

import { Button } from "@/components/ui/button";
import { useExportLinks } from "@/hooks/useExportLinks";

import { Download } from "@phosphor-icons/react";

interface MyLinksProps {
	links: Link[];
	isLoadingLinks?: boolean;
}

export function MyLinks({ links, isLoadingLinks }: MyLinksProps) {
	const { exportLinks, isLoading } = useExportLinks();

	return (
		<div className="bg-white w-full rounded-lg flex flex-col gap-4 md:gap-6 p-6 md:p-8">
			<div className="flex items-center justify-between">
				<h2 className="text-lg font-bold text-gray-600">Meus Links</h2>
				<Button
					variant="secondary"
					onClick={exportLinks}
					disabled={links.length === 0 || isLoading}
					aria-label="Baixar CSV"
					isLoading={isLoading}
				>
					<Download size={16} className="text-gray-600" />
					<span>Baixar CSV</span>
				</Button>
			</div>

			<div>
				{links.length > 0 ? (
					links.map((link) => (
						<MyLinksItem
							key={link.id}
							id={link.id}
							originalUrl={link.originalUrl}
							shortUrl={link.shortUrl}
							accessCount={link.accessCount}
						/>
					))
				) : (
					<MyLinksEmptyState isLoadingLinks={isLoadingLinks} />
				)}
			</div>
		</div>
	);
}
