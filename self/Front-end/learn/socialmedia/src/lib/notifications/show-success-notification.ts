import { Bounce, toast } from "react-toastify"

export const showSuccessNotification = (message: string = "Success!") => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  })
}
