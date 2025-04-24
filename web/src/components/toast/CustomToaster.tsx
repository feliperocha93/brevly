import { Toaster } from "react-hot-toast";

export function CustomToaster() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 4000,
        style: {
          padding: 0,
          background: "transparent",
          boxShadow: "none",
        },
      }}
    />
  );
}
