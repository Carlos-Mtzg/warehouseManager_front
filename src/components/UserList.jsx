import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getAllUsers, deleteUser, deactivateUser, activateUser } from '../services/ApiUser';
import styles from '../assets/css/users.module.css'
import UserStatus from './UserStatus';


const UserList = ({ refresh, onEditUser }) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const loggedInUserUUID = localStorage.getItem('uuid');

    useEffect(() => {
        fetchUsers();
    }, [refresh]);

    const fetchUsers = async () => {
        const result = await getAllUsers();
        if (result.state === 'success') {
            setUsers(result.users);
        } else {
            setError(result.message);
        }
    };

    const handleDeleteUser = async (uuid) => {
        if (uuid === loggedInUserUUID) {
            Swal.fire({
                title: 'Error',
                text: 'No puedes eliminar tu propio usuario',
                icon: 'error',
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 2000,
            });
        } else {
            const result = await Swal.fire({
                title: '¿Estás seguro de eliminar el usuario?',
                text: 'Esta acción no se puede deshacer.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#16423C',
                reverseButtons: true,
                allowOutsideClick: false,
            });

            if (result.isConfirmed) {
                const response = await deleteUser(uuid);
                if (response.state === 'success') {
                    Swal.fire({
                        title: 'Usuario eliminado',
                        text: 'El usuario ya no tiene acceso al sistema',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => {
                        fetchUsers();
                    });
                } else {
                    Swal.fire('Error', response.message, 'error');
                }
            }
        }
    };

    const handleDeactivateUser = async (uuid) => {
        const result = await Swal.fire({
            title: '¿Estás seguro de desactivar el usuario?',
            text: 'El usuario no podrá acceder al sistema.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#16423C',
            reverseButtons: true,
            allowOutsideClick: false,
        });

        if (result.isConfirmed) {
            const response = await deactivateUser(uuid);
            if (response.state === 'success') {
                Swal.fire({
                    title: 'Usuario desactivado',
                    text: 'El usuario ya no podra acceder al sistema',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    fetchUsers();
                });
            } else {
                Swal.fire('Error', response.message, 'error');
            }
        }
    };

    const handleActivateUser = async (uuid) => {
        const result = await Swal.fire({
            title: '¿Estás seguro de activar el usuario?',
            text: 'El usuario podrá acceder al sistema de nuevo.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#16423C',
            reverseButtons: true,
            allowOutsideClick: false,
        });

        if (result.isConfirmed) {
            const response = await activateUser(uuid);
            if (response.state === 'success') {
                Swal.fire({
                    title: 'Usuario activado',
                    text: 'El usuario puede acceder al sistema de nuevo',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    fetchUsers();
                });
            } else {
                Swal.fire('Error', response.message, 'error');
            }
        }
    };

    return (
        <div>
            {error && <div className="alert alert-danger"><i className="bi bi-exclamation-circle me-2"></i>{error}</div>}
            <div className="table-responsive">
                <table className={`table table-bordered table-hover table-striped ${styles['table-custom']}`}>
                    <thead>
                        <tr>
                            <th scope='col' className='text-center' style={{ width: "15px" }}>#</th>
                            <th scope='col' className='text-center'>Nombre</th>
                            <th scope='col' className='text-center'>Correo Electrónico</th>
                            <th scope='col' className='text-center'>Rol</th>
                            <th scope='col' className='text-center'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(users) && users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={user.id}>
                                    <td className='text-center'>{index + 1}</td>
                                    <td className='text-center'>
                                        <UserStatus status={user.status} name={user.name} />
                                    </td>
                                    <td className='text-center'>{user.email}</td>
                                    <td className='text-center'>
                                        {user.role.name === "ROLE_ADMIN" && (
                                            "Administrador"
                                        )}
                                        {user.role.name === "ROLE_USER" && (
                                            "Almacenista"
                                        )}
                                    </td>
                                    <td className='d-flex gap-3 justify-content-center'>
                                        {user.status === "Active" && (
                                            <button className={`${styles['btn-custom']}`} onClick={() => handleDeactivateUser(user.uuid)}>
                                                <i className="bi bi-person-fill-slash"></i>
                                            </button>
                                        )}
                                        {user.status === "Inactive" && (
                                            <button className={`${styles['btn-custom']}`} onClick={() => handleActivateUser(user.uuid)}>
                                                <i className="bi bi-person-fill-check text-success"></i>
                                            </button>
                                        )}
                                        <button className={`${styles['btn-custom']}`} onClick={() => onEditUser(user)}>
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <button
                                            className={`text-danger ${styles['btn-custom']}`}
                                            onClick={() => handleDeleteUser(user.uuid)}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No hay usuarios disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

UserList.propTypes = {
    refresh: PropTypes.bool.isRequired,
    onEditUser: PropTypes.func.isRequired,
};

export default UserList;
