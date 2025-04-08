import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AddSupplierModal from "../../components/AddSupplierModal";
import AddCategoryModal from "../../components/AddCategoryModal";
import styles from '../../assets/css/entries.module.css'

const ProductEntryForm = () => {
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);

    const handleAddCategoryModalClose = () => {
        setShowAddCategoryModal(false);
    };

    const handleAddSupplierModalClose = () => {
        setShowAddSupplierModal(false);
    };

    return (
        <>
            <AddCategoryModal
                show={showAddCategoryModal}
                handleClose={handleAddCategoryModalClose}
            />
            <AddSupplierModal
                show={showAddSupplierModal}
                handleClose={handleAddSupplierModalClose}
            />
            <Row className="h-100">
                <Col lg={8} className="slide-up">
                    <div className="bg-white rounded shadow-sm p-4 h-100">
                        <h1 className={`mb-5 ${styles['title']}`}>
                            Registro de entrada de productos
                        </h1>
                    </div>
                </Col>

                <Col lg={4} className="mt-4 mt-lg-0 slide-in-right">
                    <div className="bg-white rounded shadow-sm p-4 h-100">
                        <h5 className={`fw-bold mb-3 ${styles['title']}`}>Recomendaciones</h5>
                        <ul className="small">
                            <li>Verifica que has llenado correctamente todos los campos.</li>
                            <li>
                                Registra la entrada de los productos en cuanto lleguen al
                                almacén.
                            </li>
                            <li>
                                Verifica los datos de la entrada de productos antes de
                                confirmar el registro.
                            </li>
                            <li>
                                En caso de que exista algún error al registrar la entrada de
                                productos ve a la sección de entradas, cancela el registro y
                                vuelve a registrar la entrada de los productos correctamente.
                            </li>
                        </ul>
                    </div>
                </Col>
            </Row>
        </>
    );
};

export default ProductEntryForm;