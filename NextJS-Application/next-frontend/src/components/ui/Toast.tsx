import toast, { Toaster } from "react-hot-toast";

export const ToastProvider = () => (
  <>
    <Toaster />
  </>
);

export const notify = (type: "success" | "error", message: string) => {
  if (type === "success") {
    toast.success(message);
  } else if (type === "error") {
    toast.error(message);
  }
};
