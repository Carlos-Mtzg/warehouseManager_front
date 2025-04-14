import { useState } from 'react'
import styles from '../../assets/css/users.module.css'
import AddUserModal from '../../components/modals/AddUserModal.jsx'
import EditUserModal from '../../components/modals/EditUserModal.jsx';
import UserList from '../../components/users/UserList.jsx';
import PrimaryButton from '../../components/buttons/PrimaryButton.jsx';

const Users = () => {
    const [showAddUserModel, setShowAddUserModel] = useState(false);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [refreshTable, setRefreshTable] = useState(false);

    const handleAddUserModalClose = () => {
        setShowAddUserModel(false);
    }

    const handleEditUserModalClose = () => {
        setShowEditUserModal(false);
    }

    const handleResetForm = (resetForm) => {
        resetForm();
    };

    const handleUserAdded = () => { setRefreshTable((prev) => !prev); };
    const handleUserUpdated = () => { setRefreshTable((prev) => !prev) };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setShowEditUserModal(true);
    };

    return (
        <>
            <AddUserModal
                show={showAddUserModel}
                handleClose={handleAddUserModalClose}
                onResetForm={handleResetForm}
                onUserAdded={handleUserAdded}
            />
            {selectedUser && (
                <EditUserModal
                    show={showEditUserModal}
                    handleClose={handleEditUserModalClose}
                    user={selectedUser}
                    onUserUpdated={handleUserUpdated}
                    onResetForm={handleResetForm}
                />
            )}
            <div className="content d-flex flex-column gap-3">
                <div className="slide-in-left d-flex flex-column gap-2">
                    <h1 className={`${styles['title']}`}>Gestión de Usuarios</h1>
                    <div className="d-flex justify-content-end gap-4 mb-2">
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
                        <PrimaryButton
                            text="Agregar"
                            type="button"
                            icon="bi bi-person-plus"
                            onClick={() => setShowAddUserModel(true)}
                            className="px-4 ms-auto"
                        />
                    </div>
                </div>
                <UserList refresh={refreshTable} onEditUser={handleEditUser} />
            </div>
        </>
    )
}

export default Users    