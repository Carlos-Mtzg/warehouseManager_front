import Swal from "sweetalert2";

export const handleSuccess = (title, text, resetForm, callback) => {
    Swal.fire({
        title,
        text,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
    }).then(() => {
        if (resetForm) resetForm();
        if (callback) callback();
    });
};

export const handleError = (title, text) => {
    Swal.fire({
        title,
        text,
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
    });
};


export const handleConfirm = async (title, text) => {
    const result = await Swal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#16423C',
        reverseButtons: true,
        allowOutsideClick: false,
    });

    return result.isConfirmed;
}