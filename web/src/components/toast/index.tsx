import toast from "react-hot-toast";
import { CustomToaster } from "./CustomToaster";
import { ErrorToast } from "./error";
import { SuccessToast } from "./sucess";

export const showToast = {
    success: (message: string) => toast.custom(<SuccessToast message={message} />),
    error: (message: string) => toast.custom(<ErrorToast message={message} />),
};

export { CustomToaster };
