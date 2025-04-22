import { clsx } from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonState = "default" | "hover" | "disabled";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    state?: ButtonState;
    children: ReactNode;
}

export function Button({
    variant = "primary",
    state = "default",
    children,
    ...props
}: ButtonProps) {
    const baseStyles = "px-4 py-2 rounded text-white font-semibold text-sm transition";

    const variants = {
        primary: {
            default: "bg-blue-base hover:bg-blue-dark",
            hover: "bg-blue-dark",
            disabled: "bg-blue-base opacity-50 cursor-not-allowed",
        },
        secondary: {
            default: "bg-white text-blue-base border border-blue-base hover:bg-blue-100",
            hover: "bg-blue-100",
            disabled: "bg-white text-blue-base opacity-50 border border-blue-base cursor-not-allowed",
        },
    };

    return (
        <button
            className={clsx(baseStyles, variants[variant][state])}
            disabled={state === "disabled"}
            {...props}
        >
            {children}
        </button>
    );
}
