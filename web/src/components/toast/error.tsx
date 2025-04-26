type ErrorToastProps = {
  message: string;
};

export function ErrorToast({ message }: ErrorToastProps) {
  return (
    <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl shadow-md w-full max-w-xs text-sm text-red-800">
      <div className="text-danger text-xl">😅</div>
      <div>
        <strong className="block mb-1">Ops</strong>
        <span>{message}</span>
      </div>
    </div>
  );
}
