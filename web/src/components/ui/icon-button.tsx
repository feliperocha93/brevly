import type { Icon } from "@phosphor-icons/react";
import type { ButtonHTMLAttributes, CSSProperties } from "react";
import { ClipLoader } from "react-spinners";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	Icon: Icon;
	alt?: string;
	isLoading?: boolean;
}

const override: CSSProperties = {
	margin: "0 auto",
};

export function IconButton({ Icon, alt = "Icon", isLoading = false, ...props }: IconButtonProps) {
	return (
		<button
			className="w-8 h-8 flex items-center justify-center rounded-sm bg-gray-200 hover:border hover:border-blue-base"
			{...props}
		>
			{
				isLoading ?
					<ClipLoader size={20} color="white" aria-label="Loading Spinner" cssOverride={override} />
					:
					<Icon className="text-gray-600" size={16} alt={alt} />
			}
		</button>
	);
}
