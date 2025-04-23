import { clsx } from "clsx";
import { ButtonHTMLAttributes, ElementType } from "react";

type IconButtonState = "default" | "hover";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    state?: IconButtonState;
    icon: ElementType;
}

export function IconButton({ state = "default", icon: Icon, ...props }: IconButtonProps) {
    const baseStyles = "w-8 h-8 flex items-center justify-center rounded";

    const variants = {
        default: "bg-gray-100 hover:bg-gray-200",
        hover: "bg-gray-200",
    };

    return (
        <button className={clsx(baseStyles, variants[state])} {...props}>
            <Icon className="text-gray-600 w-4 h-4" />
        </button>
    );
}
