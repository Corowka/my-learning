import { Bounce, toast } from "react-toastify"

export const showErrorNotification = (message: string = "Something went wrong") => {
  toast.error(message, {
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
