import type { ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	icon: string;
	alt?: string;
}

export function IconButton({ icon, alt = "Icon", ...props }: IconButtonProps) {
	return (
		<button
			className="w-8 h-8 flex items-center justify-center rounded-sm bg-gray-200 hover:border hover:border-gray-600"
			{...props}
		>
			<img src={icon} className="text-gray-600 w-4 h-4" alt={alt} />
		</button>
	);
}
