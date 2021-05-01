import { toast } from "react-toastify";

function toastWithMessage(message, isSuccess) {
  if (isSuccess) {
    return toast.success(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  }
  return toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 2000,
  });
}

export default toastWithMessage;
