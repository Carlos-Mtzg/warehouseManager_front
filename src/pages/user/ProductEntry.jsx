import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AddSupplierModal from "../../components/AddSupplierModal";
import AddCategoryModal from "../../components/AddCategoryModal";
import styles from '../../assets/css/entries.module.css'
import { fetchCategories, fetchSuppliers } from "../../services/ApiEntries";

const ProductEntryForm = () => {
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSupplier, setSelectedSupplier] = useState("");

    useEffect(() => {
        const loadCategories = async () => {
            const response = await fetchCategories();
            if (response.state === "success" && Array.isArray(response.data)) {
                setCategories(response.data);
            } else {
                setCategories([]);
            }
        };

        const loadSuppliers = async () => {
            const response = await fetchSuppliers();
            if (response.state === "success" && Array.isArray(response.data)) {
                setSuppliers(response.data);
            } else {
                setSuppliers([]);
            }
        };

        loadCategories();
        loadSuppliers();
    }, []);

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
                        <form>
                            <div className="form-group">
                                <label
                                    htmlFor="selectedSupplier"
                                    className={`form-label fw-semibold ${styles['label']}`}
                                >
                                    Proveedor:
                                </label>
                                <select
                                    id="selectedSupplier"
                                    className="form-control"
                                    value={selectedSupplier}
                                    onChange={(e) => setSelectedSupplier(e.target.value)}
                                >
                                    <option value="">Selecciona un proveedor</option>
                                    {suppliers.map((supplier) => (
                                        <option key={supplier.id} value={supplier.id}>
                                            {supplier.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label
                                    htmlFor="selectedCategory"
                                    className={`form-label fw-semibold ${styles['label']}`}
                                >
                                    Categoria:
                                </label>
                                <select
                                    id="selectedCategory"
                                    className="form-control"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="">Selecciona una categoría</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* TO DO: Esta parte del codigo es la que se duplicara segun cuantos productos se quierana gregar */}
                            <div className="form-group">
                                <label
                                    htmlFor="productName"
                                    className={`form-label fw-semibold ${styles['label']}`}
                                >
                                    Producto:
                                </label>
                            </div>
                            <Row>
                                <Col sm={12} md={4} className="form-group">
                                    <label
                                        htmlFor="measurementUnit"
                                        className={`form-label fw-semibold ${styles['label']}`}
                                    >
                                        Unidad de entrada:
                                    </label>
                                    <input
                                        type="text"
                                        name="measurementUnit"
                                        className={`form-control`}
                                        placeholder='"Cajas"'
                                    />
                                </Col>
                                <Col sm={12} md={4} className="form-group">
                                    <label
                                        htmlFor="quantity"
                                        className={`form-label fw-semibold ${styles['label']}`}
                                    >
                                        Cantidad:
                                    </label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        className={`form-control`}
                                        placeholder="0"
                                    />
                                </Col>
                                <Col sm={12} md={4} className="form-group">
                                    <label
                                        htmlFor="unitPrice"
                                        className={`form-label fw-semibold ${styles['label']}`}
                                    >
                                        Precio de cada unidad:
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text">$</span>
                                        <input
                                            type="number"
                                            name="unitPrice"
                                            className="form-control"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </form>
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