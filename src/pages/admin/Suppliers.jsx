import { useState } from 'react'
import SupplierList from '../../components/lists/SupplierList.jsx'
import styles from '../../assets/css/users.module.css'
import AddSupplierModal from '../../components/modals/AddSupplierModal.jsx'

const Suppliers = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [refreshTable, setRefreshTable] = useState(false)

  const handleAddClose = () => setShowAddModal(false)
  const handleResetForm = (resetForm) => resetForm()
  const handleSupplierAdded = () => setRefreshTable((prev) => !prev)

  return (
    <>
      <AddSupplierModal
        show={showAddModal}
        handleClose={handleAddClose}
        onResetForm={handleResetForm}
        onSupplierAdded={handleSupplierAdded}
      />

      <div className="content d-flex flex-column gap-3">
        <div className="slide-in-left d-flex flex-column gap-2">
          <h1 className={styles.title}>Gestión de Proveedores</h1>
          <div className="d-flex align-items-center gap-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control py-2"
                placeholder="Buscar proveedor por nombre"
              />
              <button
                type="submit"
                className="btn bg-white border border-start-0"
              >
                <i className="bi bi-search px-3"></i>
              </button>
            </div>
            <button
              className={`rounded px-3 ${styles['primary-btn']}`}
              onClick={() => setShowAddModal(true)}
            >
              <div
                className={`btn d-flex text-center ${styles['primary-content']}`}
              >
                Agregar<i className="bi bi-plus-lg ms-2"></i>
              </div>
              <span></span>
            </button>
          </div>
        </div>
        <SupplierList refresh={refreshTable} />
      </div>
    </>
  )
}

export default Suppliers
