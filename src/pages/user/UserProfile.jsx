import { getUserByUUID } from '../../services/ApiUser';
import { useState, useEffect } from 'react';

const UserProfile = () => {
    const [user, setUser] = useState(null);

    const loadUser = async () => {
        const uuid = localStorage.getItem('uuid');
        const response = await getUserByUUID(uuid);
        if (response.state === "success") {
            setUser(response.user);
        } else {
            console.log("Ocurrió un error al obtener la información del usuario");
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    if (!user) {
        return <div>Cargando información del usuario...</div>;
    }

    return (
        <div>
            <h1>Mi Perfil</h1>
            <p><strong>Nombre:</strong> {user.name}</p>
            <p><strong>Apellido:</strong> {user.lastname}</p>
            <p><strong>Correo Electrónico:</strong> {user.email}</p>
            <p><strong>Rol:</strong> {user.role?.name === 'ROLE_ADMIN' ? 'Administrador' : 'Usuario'}</p>
        </div>
    );
};

export default UserProfile;