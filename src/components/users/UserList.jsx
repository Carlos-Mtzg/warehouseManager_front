import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { getAllUsers, deleteUser, deactivateUser, activateUser } from '../../services/ApiUser.jsx';
import styles from '../../assets/css/users.module.css'
import UserStatus from './UserStatus.jsx';
import { handleConfirm, handleError, handleSuccess } from '../../utils/simpleAlerts.js'


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
            handleError(
                'Acción no permitida',
                'No puedes eliminar tu propio usuario'
            );
        } else {
            const confirmed = await handleConfirm(
                '¿Estás seguro de eliminar el usuario?',
                'Esta acción no se puede deshacer.'
            );

            if (confirmed) {
                const response = await deleteUser(uuid);
                if (response.state === 'success') {
                    handleSuccess(
                        'Usuario eliminado',
                        'El usuario ya no tiene acceso al sistema',
                        null,
                        fetchUsers
                    );
                } else {
                    handleError(
                        'Error',
                        'Ocurrió un error inesperado'
                    );
                }
            }
        }
    };

    const handleDeactivateUser = async (uuid) => {
        if (uuid === loggedInUserUUID) {
            handleError(
                'Acción no permitida',
                'No puedes desactivar tu propio usuario'
            );
        } else {
            const confirmed = await handleConfirm(
                '¿Estás seguro de desactivar el usuario?',
                'El usuario no podrá acceder al sistema.'
            );

            if (confirmed) {
                const response = await deactivateUser(uuid);
                if (response.state === 'success') {
                    handleSuccess(
                        'Usuario desactivado',
                        'El usuario ya no podrá acceder al sistema',
                        null,
                        fetchUsers
                    );
                } else {
                    handleError(
                        'Error',
                        'Ocurrió un error inesperado'
                    );
                }
            }
        }
    };

    const handleActivateUser = async (uuid) => {
        const confirmed = await handleConfirm(
            '¿Estás seguro de activar el usuario?',
            'El usuario podrá acceder al sistema de nuevo.'
        );

        if (confirmed) {
            const response = await activateUser(uuid);
            if (response.state === 'success') {
                handleSuccess(
                    'Usuario activado',
                    'El usuario puede acceder al sistema de nuevo',
                    null,
                    fetchUsers
                );
            } else {
                handleError(
                    'Error',
                    'Ocurrió un error inesperado'
                );
            }
        }
    };

    return (
        <div className='slide-in-right'>
            {error && <div className="alert alert-danger"><i className="bi bi-exclamation-circle me-2"></i>{error}</div>}
            <div className="table-responsive">
                <table className={`table table-bordered table-hover table-striped ${styles['table-custom']}`}>
                    <thead>
                        <tr>
                            <th scope='col' className='text-center' style={{ width: "15px" }}>#</th>
                            <th scope='col' className='text-center'>Nombre(s)</th>
                            <th scope='col' className='text-center'>Apellidos(s)</th>
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
                                    <td className='text-center'>{user.lastname}</td>
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
