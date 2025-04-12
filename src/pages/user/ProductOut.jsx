import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import "bootstrap/dist/css/bootstrap.min.css";
import styles from '../../assets/css/entries.module.css'
import { fetchProductByUUID, fetchProductsInStock, registerProductOut } from '../../services/ApiOut';
import { productOutSchema } from '../../validations/outsValidation';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';

const ProductOutForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);

    const loadProducts = async () => {
        const response = await fetchProductsInStock();

        if (response.state === "success" && Array.isArray(response.data)) {
            const options = response.data.map(product => ({
                value: product.uuid || product.id,
                label: `${product.productName} (${product.measurementUnit})`
            }));
            setProducts(options);
        } else {
            setProducts([]);
        }
        setLoadingProducts(false);
    };

    const handleProductSelect = async (selectedOption, index) => {
        try {
            const response = await fetchProductByUUID(selectedOption.value);
            if (response.state === "success") {
                const updatedProducts = [...values.products];
                updatedProducts[index] = {
                    ...updatedProducts[index],
                    product: selectedOption,
                    productName: selectedOption.label.split(' (')[0],
                    measurementUnit: response.data.measurementUnit,
                    currentStock: response.data.quantity,
                    unitPrice: response.data.unitPrice,
                    quantity: '',
                };
                setFieldValue('products', updatedProducts);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo cargar el producto seleccionado.',
            });
        }
    };

    const validationSchema = productOutSchema;

    const {
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        resetForm
    } = useFormik({
        initialValues: {
            receiverName: '',
            products: [
                {
                    product: null,
                    measurementUnit: '',
                    currentStock: 0,
                    quantity: '',
                },
            ],
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                setIsSubmitting(true);

                const productOutData = {
                    receiverName: values.receiverName,
                    productOutList: values.products.map(product => ({
                        productName: product.productName,
                        measurementUnit: product.measurementUnit,
                        quantity: parseInt(product.quantity, 10),
                        unitPrice: parseFloat(product.unitPrice),
                        relatedUserUUID: localStorage.getItem('uuid'),
                    }))
                };

                const response = await registerProductOut(productOutData);

                if (response.state === 'success') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Salida registrada',
                        text: 'La salida de productos se registró correctamente.',
                    });
                    resetForm();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.message || 'No se pudo registrar la salida de productos.',
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Error al procesar la solicitud',
                    icon: 'error',
                    timer: 2000
                });
            } finally {
                setIsSubmitting(false);
            }
        }
    });


    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <Row className='h-100'>
            <Col lg={8} className='slide-up'>
                <div className='bg-white rounded shadow-sm p-4 h-100'>
                    <h1 className={`mb-5 ${styles['title']}`}>
                        Registro de salida de productos
                    </h1>
                    <form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
                        <div className='form-group'>
                            <label
                                className={`form-label fw-semibold ${styles['label']}`}
                                htmlFor="receiverName"
                            >
                                Nombre del receptor:
                            </label>
                            <input
                                type="text"
                                id='receiverName'
                                name="receiverName"
                                className={`form-control ${touched.receiverName && errors.receiverName ? 'is-invalid' : ''}`}
                                value={values.receiverName}
                                onChange={(e) => setFieldValue('receiverName', e.target.value)}
                                onBlur={() => setFieldTouched('receiverName', true)}
                                placeholder="Ej: Juan Pérez"
                            />
                            {touched.receiverName && errors.receiverName && (
                                <div className="text-danger mt-1">{errors.receiverName}</div>
                            )}
                        </div>

                        {values.products.map((product, index) => (
                            <div key={index} className="d-flex flex-column gap-3 border p-3 rounded mb-3">
                                <div className="form-group">
                                    <label
                                        className={`form-label fw-semibold ${styles['label']}`}
                                        htmlFor="products"
                                    >
                                        Seleccionar producto:
                                    </label>
                                    <Select
                                        id='products'
                                        name='products'
                                        options={products}
                                        isLoading={loadingProducts}
                                        onChange={(selected) => handleProductSelect(selected, index)}
                                        value={product.product || null}
                                        placeholder="Buscar producto..."
                                        noOptionsMessage={() => "No se encontraron productos"}
                                        className={`${touched.products?.[index]?.product && errors.products?.[index]?.product ? 'is-invalid' : ''}`}
                                    />
                                    {touched.products?.[index]?.product && errors.products?.[index]?.product && (
                                        <div className="text-danger mt-1">
                                            {errors.products[index].product}
                                        </div>
                                    )}
                                </div>

                                {product.productName && (
                                    <Row>
                                        <Col md={6}>
                                            <div className='form-group'>
                                                <label
                                                    className={`form-label fw-semibold ${styles['label']}`}
                                                    htmlFor='quantity'
                                                >
                                                    Stock disponible:
                                                </label>
                                                <p className="form-control-plaintext">{product.currentStock}</p>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className='form-group'>
                                                <label htmlFor='quantity' className={`form-label fw-semibold ${styles['label']}`}>
                                                    Cantidad a retirar:
                                                </label>
                                                <input
                                                    type="number"
                                                    id='quantity'
                                                    name='quantity'
                                                    className={`form-control ${touched.products?.[index]?.quantity && errors.products?.[index]?.quantity ? 'is-invalid' : ''}`}
                                                    value={product.quantity || 1}
                                                    onChange={(e) => {
                                                        const inputValue = parseInt(e.target.value, 10);
                                                        const value = isNaN(inputValue) ? 0 : Math.min(product.currentStock, Math.max(0, inputValue));
                                                        setFieldValue(`products[${index}].quantity`, value);
                                                    }}
                                                    min="1"
                                                    max={product.currentStock}
                                                    placeholder="Cantidad a retirar"
                                                />
                                                {touched.products?.[index]?.quantity && errors.products?.[index]?.quantity && (
                                                    <div className="text-danger mt-1">
                                                        {errors.products[index].quantity}
                                                    </div>
                                                )}
                                            </div>
                                        </Col>
                                    </Row>
                                )}

                                {values.products.length > 1 && (
                                    <button
                                        type="button"
                                        className={`btn ${styles['danger-btn']} align-self-end`}
                                        onClick={() => {
                                            const updatedProducts = values.products.filter((_, i) => i !== index);
                                            setFieldValue('products', updatedProducts);
                                        }}
                                    >
                                        Eliminar <i className="bi bi-trash"></i>
                                    </button>
                                )}
                            </div>
                        ))}
                        <div className="mt-3">
                            <button
                                type="button"
                                className={`btn ${styles['secondary-btn']}`}
                                onClick={() => {
                                    setFieldValue('products', [...values.products, {
                                        product: null,
                                        measurementUnit: '',
                                        currentStock: 0,
                                        quantity: '',
                                    }]);
                                }}
                            >
                                Agregar Producto <i className="bi bi-plus-lg"></i>
                            </button>
                        </div>

                        <div className="mt-4">
                            <button
                                type="submit"
                                className={`btn ${styles['primary-btn']} w-100`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span>
                                        Procesando... <div className="spinner-border spinner-border-sm"></div>
                                    </span>
                                ) : (
                                    "Registrar Salida"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </Col>

            <Col lg={4} className="mt-4 mt-lg-0 slide-in-right">
                <div className="bg-white rounded shadow-sm p-4 h-100">
                    <h5 className={`fw-bold mb-3 ${styles['title']}`}>Instrucciones</h5>
                    <ul className="small">
                        <li>Selecciona productos del listado desplegable</li>
                        <li>Verifica el stock disponible antes de registrar salidas</li>
                        <li>El nombre del receptor es obligatorio</li>
                        <li>Usa el campo de búsqueda para filtrar productos</li>
                        <li>La cantidad no puede superar el stock disponible</li>
                    </ul>
                </div>
            </Col>
        </Row>
    )
};

export default ProductOutForm;

