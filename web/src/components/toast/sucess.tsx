type SuccessToastProps = {
    message: string;
  };

export function SuccessToast({ message }: SuccessToastProps) {
    return (
        <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl shadow-md w-full max-w-xs text-sm text-green-800">
        <div className="text-green-600 text-xl">🥳</div>
        <div>
            <strong className="block mb-1">Uhuuuu!</strong>
            <span>{message}</span>
        </div>
        </div>
    );
}
