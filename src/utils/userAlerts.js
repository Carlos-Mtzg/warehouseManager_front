import Swal from 'sweetalert2';

export const handleSuccess = (title, text, resetForm, handleClose, callback) => {
    if (handleClose) handleClose();
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

export const handleError = (title, text, resetForm, handleClose) => {
    if (handleClose) handleClose();
    Swal.fire({
        title,
        text,
        icon: 'error',
        showConfirmButton: false,
        timer: 2000,
    }).then(() => {
        if (resetForm) resetForm();
    });
};