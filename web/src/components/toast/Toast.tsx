import clsx from "clsx";

type ToastType = "success" | "error";

interface ToastProps {
    type: ToastType;
    message: string;
    data?: string;
}

const baseStyles = "flex items-start gap-3 p-4 border rounded-xl shadow-md w-full max-w-xs text-sm";

const variants = {
    success: {
        container: "bg-green-50 border-green-200 text-green-800",
        emoji: "text-green-600",
        defaultMessage: "Uhuuuu!",
        emojiSymbol: "🥳",
    },
    error: {
        container: "bg-red-50 border-red-200 text-red-800",
        emoji: "text-danger",
        defaultMessage: "Ops",
        emojiSymbol: "😅",
    },
};

export function Toast({ type, data, message }: ToastProps) {
    const variant = variants[type];

    return (
        <div className={clsx(baseStyles, variant.container)}>
            <div className={clsx("text-xl", variant.emoji)}>{variant.emojiSymbol}</div>
            <div>
                {data ? (
                    <>

                        <strong>{message}</strong>
                        <span className="block mb-1">{data}</span>
                    </>
                ) : (
                    <>
                        <strong>{variant.defaultMessage}</strong>
                        <span className="block mb-1">{message}</span>
                    </>
                )}

            </div>
        </div>
    );
}
