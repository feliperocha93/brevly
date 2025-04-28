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
	onFocus,
	onBlur,
	...props
}: InputProps) {
	const [isFocused, setIsFocused] = useState(false);

	const isFilled = !!value;
	const variant = isFilled ? "filled" : "empty";
	const state = isFocused ? "active" : error ? "error" : "default";

	const inputBase = "w-full px-3 py-2 h-12 rounded-lg text-sm outline-none transition border placeholder-gray-400 placeholder-text-md text-gray-600";

	const inputVariants = {
		empty: {
			default: "border-gray-300",
			active: "border-blue-base",
			error: "border-danger",
		},
		filled: {
			default: "border-gray-300",
			active: "border-blue-base",
			error: "border-danger",
		},
	};

	const labelBase = "text-xs uppercase";

	const labelVariants = {
		empty: {
			default: "text-gray-500",
			active: "text-blue-base",
			error: "text-danger",
		},
		filled: {
			default: "text-gray-500",
			active: "text-blue-base",
			error: "text-danger",
		},
	};

	const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
		onFocus?.(e);
		setIsFocused(true);
	};

	const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
		onBlur?.(e);
		setIsFocused(false);
	};

	const inputId = label?.toLowerCase().replace(/\s+/g, "-");

	return (
		<div className="flex flex-col gap-2">
			{label && (
				<label htmlFor={inputId} className={clsx(labelBase, labelVariants[variant][state])}>
					{label}
				</label>
			)}
			<input
				id={inputId}
				className={clsx(inputBase, inputVariants[variant][state])}
				value={value}
				placeholder={placeholder}
				onFocus={handleFocus}
				onBlur={handleBlur}
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
