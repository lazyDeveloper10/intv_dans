import { toast, TypeOptions } from 'react-toastify';

// toastr type => 'info' | 'success' | 'warning' | 'error' | 'default'
export const AppToastrComponent = (message: string, toastrType?: TypeOptions) => {
    return toast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        type: toastrType ? toastrType : 'info',
        theme: "light",
    });
}
