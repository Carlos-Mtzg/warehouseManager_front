import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AddSupplierModal from "../../components/AddSupplierModal";
import AddCategoryModal from "../../components/AddCategoryModal";
import styles from '../../assets/css/entries.module.css'
import { fetchCategories, fetchSuppliers, registerProductEntry } from "../../services/ApiEntries";
import { productEntriesSchema } from "../../validations/entriesValidation";
import { useFormik } from "formik";
import Swal from 'sweetalert2';

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
        resetForm,
        setFieldValue,
    } = useFormik({
        initialValues: {
            selectedSupplier: '',
            selectedCategory: '',
            products: [
                {
                    productName: '',
                    measurementUnit: '',
                    quantity: '',
                    unitPrice: '',
                },
            ],
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                setIsSubmitting(true);

                const productEntryList = values.products.map((product) => ({
                    supplierId: values.selectedSupplier,
                    categoryId: values.selectedCategory,
                    productName: product.productName,
                    measurementUnit: product.measurementUnit,
                    quantity: parseInt(product.quantity, 10),
                    unitPrice: parseFloat(product.unitPrice),
                }));

                const response = await registerProductEntry(productEntryList);
                if (response.state === "success") {
                    Swal.fire({
                        title: "Registro exitoso",
                        text: "Se registró la entrada correctamente",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                    resetForm();
                } else {
                    Swal.fire({
                        title: "Error",
                        text: response.message,
                        icon: "error",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                }
                setIsSubmitting(false);
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error inesperado',
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 2000
                })
                setIsSubmitting(false);
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

                            <div className="d-flex flex-column gap-3">
                                {values.products.map((product, index) => (
                                    <div key={index} className="d-flex flex-column gap-3">
                                        <div className="form-group">
                                            <label
                                                htmlFor={`products[${index}].productName`}
                                                className={`form-label fw-semibold ${styles['label']}`}
                                            >
                                                Producto:
                                            </label>
                                            <input
                                                type="text"
                                                id={`products[${index}].productName`}
                                                name={`products[${index}].productName`}
                                                className={`form-control ${touched.products?.[index]?.productName && errors.products?.[index]?.productName
                                                    ? 'is-invalid'
                                                    : ''
                                                    }`}
                                                value={product.productName}
                                                onChange={(e) => {
                                                    const value = e.target.value.trimStart();
                                                    setFieldValue(`products[${index}].productName`, value);
                                                }}
                                                onBlur={(e) => {
                                                    const value = e.target.value.trim();
                                                    setFieldValue(`products[${index}].productName`, value);
                                                    handleBlur(e);
                                                }}
                                                placeholder="Escribe o selecciona el nombre del producto"
                                            />
                                            {touched.products?.[index]?.productName && errors.products?.[index]?.productName && (
                                                <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                                                    {errors.products[index].productName}
                                                </div>
                                            )}
                                        </div>
                                        <Row>
                                            <Col sm={12} md={4} className="form-group">
                                                <label
                                                    htmlFor={`products[${index}].measurementUnit`}
                                                    className={`form-label fw-semibold ${styles['label']}`}
                                                >
                                                    Unidad de entrada:
                                                </label>
                                                <input
                                                    type="text"
                                                    id={`products[${index}].measurementUnit`}
                                                    name={`products[${index}].measurementUnit`}
                                                    className={`form-control ${touched.products?.[index]?.measurementUnit &&
                                                        errors.products?.[index]?.measurementUnit
                                                        ? 'is-invalid'
                                                        : ''
                                                        }`}
                                                    value={product.measurementUnit}
                                                    onChange={(e) => {
                                                        const value = e.target.value.trimStart();
                                                        setFieldValue(`products[${index}].measurementUnit`, value);
                                                    }}
                                                    onBlur={(e) => {
                                                        const value = e.target.value.trim();
                                                        setFieldValue(`products[${index}].measurementUnit`, value);
                                                        handleBlur(e);
                                                    }}
                                                    placeholder='"Cajas"'
                                                />
                                                {touched.products?.[index]?.measurementUnit &&
                                                    errors.products?.[index]?.measurementUnit && (
                                                        <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                                                            {errors.products[index].measurementUnit}
                                                        </div>
                                                    )}
                                            </Col>
                                            <Col sm={12} md={4} className="form-group">
                                                <label
                                                    htmlFor={`products[${index}].quantity`}
                                                    className={`form-label fw-semibold ${styles['label']}`}
                                                >
                                                    Cantidad:
                                                </label>
                                                <input
                                                    type="number"
                                                    id={`products[${index}].quantity`}
                                                    name={`products[${index}].quantity`}
                                                    className={`form-control ${touched.products?.[index]?.quantity && errors.products?.[index]?.quantity
                                                        ? 'is-invalid'
                                                        : ''
                                                        }`}
                                                    value={product.quantity}
                                                    onChange={(e) => {
                                                        const value = e.target.value === "" ? "" : Math.max(0, parseInt(e.target.value, 10) || 0);
                                                        setFieldValue(`products[${index}].quantity`, value);
                                                    }}
                                                    onBlur={handleBlur}
                                                    placeholder="0"
                                                    min="0"
                                                />
                                                {touched.products?.[index]?.quantity && errors.products?.[index]?.quantity && (
                                                    <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                                                        {errors.products[index].quantity}
                                                    </div>
                                                )}
                                            </Col>
                                            <Col sm={12} md={4} className="form-group">
                                                <label
                                                    htmlFor={`products[${index}].unitPrice`}
                                                    className={`form-label fw-semibold ${styles['label']}`}
                                                >
                                                    Precio de cada unidad:
                                                </label>
                                                <div className="input-group">
                                                    <span className="input-group-text">$</span>
                                                    <input
                                                        type="number"
                                                        id={`products[${index}].unitPrice`}
                                                        name={`products[${index}].unitPrice`}
                                                        className={`form-control ${touched.products?.[index]?.unitPrice && errors.products?.[index]?.unitPrice
                                                            ? 'is-invalid'
                                                            : ''
                                                            }`}
                                                        value={product.unitPrice}
                                                        onChange={(e) => {
                                                            const value = e.target.value === "" ? "" : Math.max(0, parseInt(e.target.value, 10) || 0);
                                                            setFieldValue(`products[${index}].unitPrice`, value);
                                                        }}
                                                        onBlur={handleBlur}
                                                        placeholder="0.00"
                                                        min="0"
                                                    />
                                                </div>
                                                {touched.products?.[index]?.unitPrice && errors.products?.[index]?.unitPrice && (
                                                    <div className="text-danger mt-1" style={{ fontSize: '15px' }}>
                                                        {errors.products[index].unitPrice}
                                                    </div>
                                                )}
                                            </Col>
                                        </Row>
                                        {values.products.length > 1 && (
                                            <div className="mt-2">
                                                <button
                                                    className={`rounded w-100 ${styles['danger-btn']}`}
                                                    type="button"
                                                    onClick={() => {
                                                        const updatedProducts = values.products.filter((_, i) => i !== index);
                                                        setFieldValue('products', updatedProducts);
                                                    }}
                                                >
                                                    <div className={`btn d-flex justify-content-center ${styles['danger-content']}`}>
                                                        Eliminar Producto<i className="bi bi-trash ms-2"></i>
                                                    </div>
                                                    <span></span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div className="mt-2">
                                    <button
                                        className={`rounded w-100 ${styles['secondary-btn']}`}
                                        type="button"
                                        onClick={() => {
                                            const newProduct = {
                                                productName: '',
                                                measurementUnit: '',
                                                quantity: '',
                                                unitPrice: '',
                                            };
                                            setFieldValue('products', [...values.products, newProduct]);
                                        }}
                                    >
                                        <div className={`btn d-flex justify-content-center ${styles['secondary-content']}`}>
                                            Agregar Producto<i className="bi bi-plus-lg ms-2"></i>
                                        </div>
                                        <span></span>
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4 w-100">
                                {isSubmitting ? (
                                    <button
                                        className={`rounded w-100 ${styles['primary-btn']}`}
                                        type="submit"
                                        disabled
                                    >
                                        <div className={`d-flex align-items-center justify-content-center px-2 gap-2 ${styles['primary-content']}`} style={{ height: '37.6px' }}>
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
