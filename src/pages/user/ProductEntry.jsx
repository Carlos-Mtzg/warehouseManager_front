import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    Form,
    Button,
    InputGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AxiosClient from "../../config/axios-client";
import AddSupplierModal from "../../components/AddSupplierModal";
import AddCategoryModal from "../../components/AddCategoryModal";
import Swal from "sweetalert2";

const ProductEntryForm = () => {
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState("");
    const [products, setProducts] = useState([
        {
            productName: "",
            selectedCategory: "",
            quantity: "",
            unitPrice: "",
            measurementUnit: "",
        },
    ]);
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
    const [validFields, setValidFields] = useState(true)

    const handleQuantityChange = (index, field, value) => {
        const newProducts = products.map((product, i) => {
            if (i === index) {
                const updatedProduct = { ...product, [field]: value };
                if (field === "quantity") {
                    if (!value || value <= 0) {
                        updatedProduct.quantityError = "La cantidad debe ser mayor a cero";
                        setValidFields(false)

                    } else {
                        updatedProduct.quantityError = "";
                    }
                }
                return updatedProduct;
            }
            return product;
        });
        setProducts(newProducts);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validFields) {
            const requestBody = {
                supplierId: selectedSupplier,
                productEntryList: products.map((product) => ({
                    productName: product.productName,
                    supplierId: selectedSupplier,
                    categoryId: product.selectedCategory,
                    quantity: product.quantity,
                    unitPrice: product.unitPrice,
                    totalAmount: product.quantity * product.unitPrice,
                    measurementUnit: product.measurementUnit,
                    relatedUserId: 0,
                })),
            };

            try {
                const token = localStorage.getItem("accessToken");
                const response = await AxiosClient.post("productEntry/", requestBody, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Product entry saved successfully:", response);
                await Swal.fire({
                    icon: "success",
                    title: "Registro guardado exitosamente.",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setSelectedSupplier("");
                setProducts([
                    {
                        productName: "",
                        selectedCategory: "",
                        quantity: "",
                        unitPrice: "",
                        measurementUnit: "",
                    },
                ]);
            } catch (error) {
                console.error("Error saving product entry:", error);
                await Swal.fire({
                    icon: "error",
                    title: "Error al guardar el registro.",
                    text: error.message,
                });
            }
        } else {
            await Swal.fire({
                icon: "error",
                title: "Error al guardar el registro.",
                text: "Verifica los campos",
            })
        }
    };

    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await AxiosClient.get("category/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchSuppliers = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await AxiosClient.get("supplier/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSuppliers(response.data);
        } catch (error) {
            console.error("Error fetching suppliers:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchSuppliers();
    }, []);

    const handleAddProduct = () => {
        setProducts([
            ...products,
            {
                productName: "",
                selectedCategory: "",
                quantity: "",
                unitPrice: "",
                measurementUnit: "",
            },
        ]);
    };

    const handleRemoveProduct = (index) => {
        const newProducts = products.filter((_, i) => i !== index);
        setProducts(newProducts);
    };

    const handleProductChange = (index, field, value) => {
        const newProducts = products.map((product, i) =>
            i === index ? { ...product, [field]: value } : product
        );
        setProducts(newProducts);
    };

    const handleAddCategoryModalClose = () => {
        setShowAddCategoryModal(false);
        fetchCategories();
    };

    const handleAddSupplierModalClose = () => {
        setShowAddSupplierModal(false);
        fetchSuppliers();
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
                        <h4 className="text-center mb-4">
                            Registro de entrada de productos
                        </h4>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-4 d-flex align-items-center">
                                <div className="d-flex flex-grow-1 mb-3">
                                    <Form.Select
                                        value={selectedSupplier}
                                        onChange={(e) => setSelectedSupplier(e.target.value)}
                                    >
                                        <option value="">Selecciona un proveedor</option>
                                        {suppliers.map((supplier) => (
                                            <option key={supplier.id} value={supplier.id}>
                                                {supplier.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Button
                                        variant="outline-primary"
                                        className="ms-2"
                                        onClick={() => setShowAddSupplierModal(true)}
                                    >
                                        +
                                    </Button>
                                </div>
                            </Form.Group>
                            <hr />
                            {products.map((product, index) => (
                                <div key={index} className="mb-4">
                                    <Form.Group className="mb-3 d-flex align-items-center">
                                        <div className="d-flex flex-grow-1">
                                            <Form.Select
                                                value={product.selectedCategory}
                                                onChange={(e) =>
                                                    handleProductChange(
                                                        index,
                                                        "selectedCategory",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">Selecciona una categoría</option>
                                                {categories.map((category) => (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                            <Button
                                                variant="outline-primary"
                                                className="ms-2"
                                                onClick={() => setShowAddCategoryModal(true)}
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Producto:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Escribe o selecciona el nombre del producto"
                                            value={product.productName}
                                            onChange={(e) =>
                                                handleProductChange(
                                                    index,
                                                    "productName",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Form.Group>

                                    <Row>
                                        <Col md={4} className="mb-3">
                                            <Form.Label>Unidad de entrada:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="&quot;cajas&quot;"
                                                value={product.measurementUnit}
                                                onChange={(e) =>
                                                    handleProductChange(
                                                        index,
                                                        "measurementUnit",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </Col>
                                        <Col md={4} className="mb-3">
                                            <Form.Label>Cantidad de unidades:</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="0"
                                                min="1"
                                                value={product.quantity}
                                                onChange={(e) =>
                                                    handleQuantityChange(index, "quantity", Number(e.target.value))
                                                }
                                            />
                                            {product.quantityError && (
                                                <div style={{ color: "red" }}>{product.quantityError}</div>
                                            )}
                                        </Col>
                                        <Col md={4} className="mb-3">
                                            <Form.Label>Precio de cada unidad:</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Text>$</InputGroup.Text>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="0.00"
                                                    min="1"
                                                    value={product.unitPrice}
                                                    onChange={(e) =>
                                                        handleProductChange(
                                                            index,
                                                            "unitPrice",
                                                            Number(e.target.value)
                                                        )
                                                    }
                                                />
                                            </InputGroup>
                                        </Col>
                                    </Row>

                                    {products.length > 1 && (
                                        <Button
                                            variant="outline-danger"
                                            className="w-100 w-md-auto mt-2"
                                            onClick={() => handleRemoveProduct(index)}
                                        >
                                            Eliminar producto
                                        </Button>
                                    )}
                                    <hr />
                                </div>
                            ))}

                            <Button
                                variant="success"
                                className="w-100 w-md-auto mb-3"
                                onClick={handleAddProduct}
                            >
                                Agregar producto
                            </Button>

                            <div className="d-flex flex-column flex-md-row gap-3 justify-content-end mt-3">
                                <Button
                                    variant="dark"
                                    className="w-50 w-md-auto"
                                    type="submit"
                                >
                                    Registrar
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Col>

                <Col lg={4} className="mt-4 mt-lg-0 slide-in-right">
                    <div className="bg-white rounded shadow-sm p-4 h-100">
                        <h5 className="fw-bold mb-3">Recomendaciones</h5>
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