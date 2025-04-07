import { useState } from 'react'
import styles from '../../assets/css/users.module.css'
import AddUserModal from '../../components/AddUserModal'
import UserList from '../../components/UserList';

const Users = () => {
    const [showAddUserModel, setShowAddUserModel] = useState("");
    const [refreshTable, setRefreshTable] = useState(false);

    const handleAddUserModalClose = () => {
        setShowAddUserModel(false);
    }

    const handleResetForm = (resetForm) => {
        resetForm();
    };

    const handleUserAdded = () => {
        setRefreshTable((prev) => !prev);
    };

    return (
        <>
            <AddUserModal
                show={showAddUserModel}
                handleClose={handleAddUserModalClose}
                onResetForm={handleResetForm}
                onUserAdded={handleUserAdded}
            />
            <div className="content d-flex flex-column gap-3">
                <h1 className={`${styles['title']}`}>Gestión de Usuarios</h1>
                <div className="d-flex justify-content-end gap-4">
                    <div className="d-flex align-items-center justify-content-center gap-2">
                        <div className="bg-secondary rounded" style={{ width: "8px", height: "8px" }}></div>
                        Inactivo
                    </div>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                        <div className="bg-success rounded" style={{ width: "8px", height: "8px" }}></div>
                        Activo
                    </div>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                        <div className="bg-warning rounded" style={{ width: "8px", height: "8px" }}></div>
                        Pendiente
                    </div>
                </div>
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
                <UserList refresh={refreshTable} />
            </div>
        </>
    )
}

export default Users    