import toast from "react-hot-toast";
import { CustomToaster } from "./CustomToaster";
import { Toast } from "./Toast";

export const showToast = {
    success: (message: string, data?: string) =>
        toast.custom(<Toast type="success" message={message} data={data} />),
    error: (message: string, data?: string) =>
        toast.custom(<Toast type="error" message={message} data={data} />),
};

export { CustomToaster };
