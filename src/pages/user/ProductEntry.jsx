import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AddSupplierModal from "../../components/AddSupplierModal";
import AddCategoryModal from "../../components/AddCategoryModal";
import styles from '../../assets/css/entries.module.css'
import { fetchCategories, fetchSuppliers } from "../../services/ApiEntries";
import { productEntriesSchema } from "../../validations/entriesValidation";
import { useFormik } from "formik";

const ProductEntryForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    const loadCategories = async () => {
        const response = await fetchCategories();
        if (response.state === "success" && Array.isArray(response.data.data)) {
            setCategories(response.data.data);
        } else {
            setCategories([]);
        }
    };

    const loadSuppliers = async () => {
        const response = await fetchSuppliers();
        if (response.state === "success" && Array.isArray(response.data.data)) {
            setSuppliers(response.data.data);
        } else {
            setSuppliers([]);
        }
    };

    useEffect(() => {
        loadCategories();
        loadSuppliers();
    }, []);

    const validationSchema = productEntriesSchema;

    const {
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
        resetForm
    } = useFormik({
        initialValues: {
            selectedSupplier: "",
            selectedCategory: "",
            productName: "",
            measurementUnit: "",
            quantity: "",
            unitPrice: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                setIsSubmitting(true);
                setIsSubmitting(false);
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error inesperado',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2000
                })
            } finally {
                await new Promise((resolve) => setTimeout(resolve, 2000));
            }
        }
    })

    const handleAddCategoryModalClose = () => {
        setShowAddCategoryModal(false);
        loadCategories();
    };

    const handleAddSupplierModalClose = () => {
        setShowAddSupplierModal(false);
        loadSuppliers();
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
                        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                            <div className="input-content">
                                <div className="d-flex gap-3">
                                    <div className="form-group flex-grow-1">
                                        <label
                                            htmlFor="selectedSupplier"
                                            className={`form-label fw-semibold ${styles['label']}`}
                                        >
                                            Proveedor:
                                        </label>
                                        <select
                                            id="selectedSupplier"
                                            name="selectedSupplier"
                                            className={`form-control ${touched.selectedSupplier && errors.selectedSupplier ? 'is-invalid' : ''}`}
                                            value={values.selectedSupplier}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <option value="">Selecciona un proveedor</option>
                                            {suppliers.map((supplier) => (
                                                <option key={supplier.id} value={supplier.id}>
                                                    {supplier.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button className={`rounded mt-auto ${styles['btn-add-outline']}`} type="button" onClick={() => setShowAddSupplierModal(true)}><i className="bi bi-plus-lg"></i></button>
                                </div>
                                {touched.selectedSupplier && errors.selectedSupplier ? (
                                    <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                                        {errors.selectedSupplier}
                                    </div>
                                ) : null}
                            </div>

                            <div className="input-content">
                                <div className="d-flex gap-3">
                                    <div className="form-group flex-grow-1">
                                        <label
                                            htmlFor="selectedCategory"
                                            className={`form-label fw-semibold ${styles['label']}`}
                                        >
                                            Categoria:
                                        </label>
                                        <select
                                            id="selectedCategory"
                                            name="selectedCategory"
                                            className={`form-control ${touched.selectedCategory && errors.selectedCategory ? 'is-invalid' : ''}`}
                                            value={values.selectedCategory}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <option value="">Selecciona una categoría</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button className={`rounded mt-auto ${styles['btn-add-outline']}`} type="button" onClick={() => setShowAddCategoryModal(true)}><i className="bi bi-plus-lg"></i></button>
                                </div>
                                {touched.selectedCategory && errors.selectedCategory ? (
                                    <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                                        {errors.selectedCategory}
                                    </div>
                                ) : null}
                            </div>

                            {/* TO DO: Esta parte del codigo es la que se duplicara segun cuantos productos se quierana gregar */}
                            <div className="form-group">
                                <label
                                    htmlFor="productName"
                                    className={`form-label fw-semibold ${styles['label']}`}
                                >
                                    Producto:
                                </label>
                                <input
                                    type="text"
                                    id="productName"
                                    name="productName"
                                    className={`form-control ${touched.productName && errors.productName ? 'is-invalid' : ''}`}
                                    value={values.productName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Escribe o selecciona el nombre del producto"
                                />
                                {touched.productName && errors.productName ? (
                                    <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                                        {errors.productName}
                                    </div>
                                ) : null}
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
                                        id="measurementUnit"
                                        name="measurementUnit"
                                        className={`form-control ${touched.measurementUnit && errors.measurementUnit ? 'is-invalid' : ''}`}
                                        value={values.measurementUnit}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder='"Cajas"'
                                    />
                                    {touched.measurementUnit && errors.measurementUnit ? (
                                        <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                                            {errors.measurementUnit}
                                        </div>
                                    ) : null}
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
                                        id="quantity"
                                        name="quantity"
                                        className={`form-control ${touched.quantity && errors.quantity ? 'is-invalid' : ''}`}
                                        value={values.quantity}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="0"
                                    />
                                    {touched.quantity && errors.quantity ? (
                                        <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                                            {errors.quantity}
                                        </div>
                                    ) : null}
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
                                            id="unitPrice"
                                            name="unitPrice"
                                            className={`form-control ${touched.unitPrice && errors.unitPrice ? 'is-invalid' : ''}`}
                                            value={values.unitPrice}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="0.00"
                                        />
                                    </div>
                                    {touched.unitPrice && errors.unitPrice ? (
                                        <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                                            {errors.unitPrice}
                                        </div>
                                    ) : null}
                                </Col>
                            </Row>
                            <div className="mt-4 w-100">
                                {isSubmitting ? (
                                    <button
                                        className={`rounded ${styles['primary-btn']}`}
                                        type="submit"
                                        disabled
                                    >
                                        <div className={`d-flex align-items-center px-2 gap-2 ${styles['primary-content']}`} style={{ height: '37.6px' }}>
                                            Cargando
                                            <output
                                                className="spinner-border"
                                                style={{ height: "1.2rem", width: "1.2rem", fontSize: "10px" }}
                                            >
                                                <span className="visually-hidden"></span>
                                            </output>
                                        </div>
                                        <span></span>
                                    </button>
                                ) : (
                                    <button
                                        className={`rounded w-100 ${styles['primary-btn']}`}
                                        type='submit'
                                    >
                                        <div className={`btn d-flex justify-content-center ${styles['primary-content']}`}>
                                            Confirmar Entrada<i className="bi bi-check ms-2"></i>
                                        </div>
                                        <span></span>
                                    </button>
                                )}
                            </div>
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