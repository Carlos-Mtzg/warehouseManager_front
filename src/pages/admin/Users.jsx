import { useState } from 'react'
import styles from '../../assets/css/users.module.css'
import AddUserModal from '../../components/AddUserModal'
import UserList from '../../components/UserList';

const Users = () => {
    const [showAddUserModel, setShowAddUserModel] = useState("");

    const handleAddUserModalClose = () => {
        setShowAddUserModel(false);
    }

    const handleResetForm = (resetForm) => {
        resetForm();
    };

    return (
        <>
            <AddUserModal
                show={showAddUserModel}
                handleClose={handleAddUserModalClose}
                onResetForm={handleResetForm}
            />
            <div className="content d-flex flex-column gap-4">
                <h1 className={`${styles['title']}`}>Gestión de Usuarios</h1>
                <div className="d-flex align-items-center gap-3">
                    <div className="input-group">
                        <input
                            type="text"
                            className='form-control py-2'
                            placeholder='Escribe el nombre del usuario que deseas buscar'
                        />
                        <button type="submit" className="btn bg-white border border-start-0">
                            <i className="bi bi-search px-3"></i>
                        </button>
                    </div>
                    <button
                        className={`rounded px-3 ${styles['primary-btn']}`} onClick={() => setShowAddUserModel(true)}>
                        <div className={`btn d-flex text-center ${styles['primary-content']}`}>
                            Agregar<i className="bi bi-person-plus ms-2"></i>
                        </div>
                        <span></span>
                    </button>
                </div>

                <UserList />
            </div>
        </>
    )
}

export default Users    