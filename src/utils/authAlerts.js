import Swal from 'sweetalert2';

export const handleSuccess = (title, text, callback) => {
    Swal.fire({
        title,
        text,
        icon: 'success',
        showConfirmButton: false,
        timer: 1000,
    }).then(() => {
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