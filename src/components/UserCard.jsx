import styles from '../assets/css/users.module.css'
import profile from '../assets/images/profile.png'
import { getUserByUUID } from '../services/ApiUser';
import { useEffect, useState } from 'react';

const UserCard = () => {
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
        <div className={`rounded-pill py-2 px-3 d-flex align-items-center gap-2 ${styles['user-card']} ${styles['inner-shadow']}`}>
            <div>
                <img className={`${styles['profile-card']}`} src={profile} alt="profile" />
            </div>
            <div>
                <p className={`my-0 fw-bold ${styles['name']}`}>{user.name}</p>
                <p className={`my-0 ${styles['email']}`}>{user.email}</p>
                <p className={`my-0 fw-bold ${styles['email']}`}>{user.role?.name === 'ROLE_ADMIN' ? 'Administrador' : 'Almacenista'}</p>
            </div>
        </div>
    )
}

export default UserCard