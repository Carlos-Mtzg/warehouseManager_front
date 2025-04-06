import { useEffect, useState } from 'react';
import { getAllUsers } from '../services/ApiUser';
import styles from '../assets/css/users.module.css'


const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const result = await getAllUsers();

            if (result.state === 'success') {
                setUsers(result.users);
            } else {
                setError(result.message);
            }
        };
        fetchUsers();
    }, []);

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
                                    <td className='text-center'>{user.name}</td>
                                    <td className='text-center'>{user.email}</td>
                                    <td className='text-center'>
                                        {user.role?.name === "ROLE_ADMIN" ? (
                                            "Administrador"
                                        ) : user.role?.name === "ROLE_USER" ? (
                                            "Usuario"
                                        ) : (
                                            "Sin rol"
                                        )}
                                    </td>
                                    <td className='d-flex gap-3 justify-content-center'>
                                        <button className={`${styles['btn-custom']}`}><i className="bi bi-pencil-square"></i></button>
                                        <button className={`text-danger ${styles['btn-custom']}`}><i className="bi bi-trash"></i></button>
                                        <button className={`${styles['btn-custom']}`}><i className="bi bi-person-fill-slash"></i></button>
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

export default UserList;
