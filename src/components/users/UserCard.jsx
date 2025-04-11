import { useContext } from 'react';
import styles from '../../assets/css/users.module.css'
import profile from '../../assets/images/profile.png'
import AuthContext from '../../context/AuthProvider.jsx';

const UserCard = () => {
    const { user } = useContext(AuthContext);
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
};

export default UserCard