import { clsx } from "clsx";
import { useState } from "react";

import type { FocusEvent, InputHTMLAttributes } from "react";
import type { FieldError } from "react-hook-form";

import { Warning } from "@phosphor-icons/react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: FieldError;
}

export function Input({
	label,
	error,
	value,
	placeholder,
	...props
}: InputProps) {
	const [isFocused, setIsFocused] = useState(false);

	const variant = value ? "filled" : "empty";
	const state = error ? "error" : isFocused ? "active" : "default";

	const base =
		"w-full px-3 py-2 h-12 rounded-lg text-sm outline-none transition placeholder-gray-400 placeholder-text-md";

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
		<div className="flex flex-col gap-2">
			{label && (
				<label htmlFor={label} className="text-xs uppercase text-gray-500">
					{label}
				</label>
			)}
			<input
				className={clsx(base, variants[variant][state])}
				value={value}
				placeholder={placeholder}
				onFocus={handleFocus}
				onBlur={handleBlur}
				id={label}
				{...props}
			/>
			{error && (
				<div className="text-xs text-gray-500 flex items-center gap-2">
					<Warning size={16} className="text-danger" />
					{error.message}
				</div>
			)}
		</div>
	);
}
