import { getUserByUUID } from '../../services/ApiUser';
import { useState, useEffect } from 'react';
import styles from '../../assets/css/users.module.css'
import profile from '../../assets/images/profile.png'

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
        <div className="d-flex flex-column gap-4">
            <div className='bg-white rounded p-4 slide-up'>
                <div className='col-12 col-md-8 d-flex gap-2'>
                    <img className={`d-none d-lg-block ${styles['profile']}`} src={profile} alt="profile" />
                    <div className="user-info">
                        <p className={`mb-1 fs-1 fw-semibold ${styles['primary-text']}`}>{user.name} {user.lastname}</p>
                        <p className={`mb-1 ${styles['secondary-text']}`}>{user.email}</p>
                        <p className={`mb-1 ${styles['secondary-text']}`}>{user.role?.name === 'ROLE_ADMIN' ? 'Administrador' : 'Usuario'}</p>
                    </div>
                </div>
            </div>
            <div className='d-flex flex-column bg-white rounded p-4 gap-3 slide-up'>
                <div className="d-flex align-items-center">
                    <p className={`fw-bold text-uppercase fs-4 mb-0 ${styles['title']}`}>Mi información</p>
                    <button
                        className={`rounded ms-auto ${styles['primary-outline-btn']}`}
                        type='button'
                    >
                        <div className={`d-flex text-center py-1 px-2 ${styles['primary-outline-content']}`}>
                            Editar<i className="bi bi-pencil-square ms-2"></i>
                        </div>
                        <span></span>
                    </button>
                </div>
                <div className='row'>
                    <div className="form-group col-12 col-md-4 mb-4">
                        <label className={`fw-semibold ${styles['label']}`} htmlFor="name">Nombre:</label>
                        <input className='form-control mt-2' type="text" readOnly value={user.name} />
                    </div>
                    <div className="form-group col-12 col-md-4 mb-4">
                        <label className={`fw-semibold ${styles['label']}`} htmlFor="lastname">Apellido(s):</label>
                        <input className='form-control mt-2' type="text" readOnly value={user.lastname} />
                    </div>
                    <div className="form-group col-12 col-md-4 mb-4">
                        <label className={`fw-semibold ${styles['label']}`} htmlFor="email">Correo Electrónico:</label>
                        <input className='form-control mt-2' type="text" readOnly value={user.email} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;