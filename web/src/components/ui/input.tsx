import { clsx } from "clsx";
import { InputHTMLAttributes, useState, FocusEvent } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({ label, error, value, placeholder, ...props }: InputProps) {
    const [isFocused, setIsFocused] = useState(false);

    const variant = value ? "filled" : "empty";
    const state = error
        ? "error"
        : isFocused
            ? "active"
            : "default";

    const base = "w-full px-3 py-2 rounded text-sm outline-none transition";

    const variants = {
        empty: {
            default: "border border-gray-200 text-gray-600 bg-white",
            active: "border border-blue-base text-gray-900 bg-white",
            error: "border border-danger text-danger bg-white",
        },
        filled: {
            default: "border border-gray-300 text-gray-600 bg-white",
            active: "border border-blue-base text-gray-900 bg-white",
            error: "border border-danger text-danger bg-white",
        },
    };

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        props.onFocus?.(e);
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        props.onBlur?.(e);
    };

    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-sm font-semibold text-gray-500">{label}</label>}
            <input
                className={clsx(base, variants[variant][state])}
                value={value}
                placeholder={placeholder}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...props}
            />
            {error && <span className="text-xs text-danger mt-1">⚠️ {error}</span>}
        </div>
    );
}
