import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { ClipLoader } from "react-spinners";


type ButtonState = "default" | "disabled";
type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	asChild?: boolean;
	children?: ReactNode;
	isLoading?: boolean;
}

const override: CSSProperties = {
	margin: "0 auto",
};

export function Button({
	variant = "primary",
	asChild,
	children,
	isLoading = false,
	disabled,
	...props
}: ButtonProps) {
	const state: ButtonState = disabled ? "disabled" : "default";

	const baseStyles = "rounded-lg font-semibold text-md transition";

	const variants = {
		primary: {
			default: "px-4 bg-blue-base h-12 text-white hover:bg-blue-dark",
			disabled: "px-4 bg-blue-base h-12 opacity-50 cursor-not-allowed",
		},
		secondary: {
			default:
				"flex gap-2 items-center p-2 bg-gray-200 h-8 text-gray-500 hover:outline hover:outline-blue-base",
			disabled:
				"flex gap-2 items-center p-2 bg-gray-200 h-8 text-gray-500 opacity-50 cursor-not-allowed",
		},
	};

	const Component = asChild ? Slot : "button";

	return (
		<Component
			className={clsx(baseStyles, variants[variant][state])}
			disabled={state === "disabled"}
			{...props}
		>
			{
				isLoading ?
					<ClipLoader size={20} color="white" aria-label="Loading Spinner" cssOverride={override} />
					:
					children
			}
		</Component>
	);
}
