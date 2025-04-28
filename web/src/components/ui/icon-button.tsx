import type { Icon } from "@phosphor-icons/react";
import type { ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	Icon: Icon;
	alt?: string;
}

export function IconButton({ Icon, alt = "Icon", ...props }: IconButtonProps) {
	return (
		<button
			className="w-8 h-8 flex items-center justify-center rounded-sm bg-gray-200 hover:border hover:border-blue-base"
			{...props}
		>
			<Icon className="text-gray-600" size={16} alt={alt} />
		</button>
	);
}
