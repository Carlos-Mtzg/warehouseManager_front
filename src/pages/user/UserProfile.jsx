import { useState, useEffect, useContext } from 'react';
import styles from '../../assets/css/users.module.css'
import profile from '../../assets/images/profile.png'
import EditUserInfoModal from '../../components/EditUserInfoModal';
import AuthContext from '../../context/AuthProvider';

const UserProfile = () => {
    const { user, updateUser } = useContext(AuthContext);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        updateUser();
    }, []);

    const handleEditModalClose = () => {
        setShowEditModal(false);
    };

    const handleUserUpdated = () => {
        setShowEditModal(false);
        updateUser();
    };


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
                        <p className={`mb-1 fw-bold ${styles['secondary-text']}`}>{user.role?.name === 'ROLE_ADMIN' ? 'Administrador' : 'Almacenista'}</p>
                    </div>
                </div>
            </div>
            <div className='d-flex flex-column bg-white rounded p-4 gap-3 slide-up'>
                <div className="d-flex align-items-center">
                    <p className={`fw-bold text-uppercase fs-4 mb-0 ${styles['title']}`}>Mi información</p>
                    <button
                        className={`rounded ms-auto ${styles['primary-outline-btn']}`}
                        type='button'
                        onClick={() => setShowEditModal(true)}
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
            {showEditModal && (
                <EditUserInfoModal
                    user={user}
                    handleClose={handleEditModalClose}
                    onUserUpdated={handleUserUpdated}
                />
            )}
        </div>
    );
};

export default UserProfile;