import { useState } from 'react'
import SupplierList from '../../components/lists/SupplierList.jsx'
import styles from '../../assets/css/users.module.css'
import AddSupplierModal from '../../components/modals/AddSupplierModal.jsx'
import PrimaryButton from '../../components/buttons/PrimaryButton.jsx'

const Suppliers = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [refreshTable, setRefreshTable] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const handleAddClose = () => setShowAddModal(false)
  const handleResetForm = (resetForm) => resetForm()
  const handleSupplierAdded = () => setRefreshTable((prev) => !prev)

  const clearSearch = () => setSearchTerm('')
  return (
    <>
      <AddSupplierModal
        show={showAddModal}
        handleClose={handleAddClose}
        onResetForm={handleResetForm}
        onSupplierAdded={handleSupplierAdded}
        clearSearch={clearSearch} // ✅ NUEVA PROP
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="btn bg-white border border-start-0"
              >
                <i className="bi bi-search px-3"></i>
              </button>
            </div>
            <PrimaryButton
              text="Agregar"
              type="button"
              icon="bi bi-plus-lg"
              onClick={() => setShowAddModal(true)}
              className="px-4"
            />
          </div>
        </div>
        <SupplierList refresh={refreshTable} searchTerm={searchTerm} />{' '}
      </div>
    </>
  )
}

export default Suppliers
