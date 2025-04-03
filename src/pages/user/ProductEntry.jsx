import React, { useState, useEffect } from "react";
import {
  Container,
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
  const [categories, setCategories] = useState([]); // State to store categories
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category
  const [supliers, sestSupliers] = useState([]);
  const [selectedSuplier, setSelectedSuplier] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [measurementUnit, setMeasurementUnit] = useState("");
  const [showAddCategoryModal, setShowAddCategoryModal] = useState("");
  const [showAddSupplierModal, setShowAddSupplierModal] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const totalAmount = quantity * unitPrice; // Calculate total amount
    const requestBody = {
      productName,
      suplierId: selectedSuplier,
      categoryId: selectedCategory,
      quantity,
      unitPrice,
      totalAmount,
      measurementUnit,
      relatedUserId: 0, // Replace with the actual user ID if needed
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
        icon: 'success',
        title: 'Registro guardado exitosamente.',
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.error("Error saving product entry:", error);
      await Swal.fire({
        icon: 'error',
        title: 'Error al guardar el registro.',
        text: error.message,
      });
    }
  };

  // Fetch categories from the backend
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await AxiosClient.get(`category/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  
    // Function to fetch suppliers from the backend
    const fetchSuppliers = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await AxiosClient.get(`supplier/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        sestSupliers(response.data); // Update the suppliers state
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    // Use useEffect to call fetchCategories and fetchSuppliers only once when the component mounts
  useEffect(() => {
    fetchCategories();
    fetchSuppliers();
  }, []); // Empty dependency array ensures this runs only once

    

  const handleAddCategoryModalClose = () => {
    setShowAddCategoryModal(false);
    fetchCategories();
  }

  const handleAddSupplierModalClose = () => {
    setShowAddSupplierModal(false);
    fetchSuppliers(); // Fetch the updated supplier list after modal closes
  };

  return (
    <Container fluid className="bg-light min-vh-100 p-0">
      <>
        <AddCategoryModal
          show={showAddCategoryModal}
          handleClose={handleAddCategoryModalClose}
        />
      </>

      <AddSupplierModal
        show={showAddSupplierModal}
        handleClose={handleAddSupplierModalClose}
      />

      <Container className="py-4">
        <Row>
          <Col lg={8}>
            <div className="bg-white rounded shadow-sm p-4">
              <h4 className="text-center mb-4">
                Registro de entrada de productos
              </h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 d-flex align-items-center">
                  {/* <Form.Label className="me-2">Categoría:</Form.Label> */}
                  <div className="d-flex flex-grow-1">
                    <Form.Select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
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
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </Form.Group>

                <Row>
                  <Col md={4} className="mb-3">
                    <Form.Label>Unidad de entrada:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="&quot;cajas&quot;"
                      value={measurementUnit}
                      onChange={(e) => setMeasurementUnit(e.target.value)}
                    />
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Label>Cantidad de unidades:</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="0"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                  </Col>
                  <Col md={4} className="mb-3">
                    <Form.Label>Precio de cada unidad:</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>$</InputGroup.Text>
                      <Form.Control
                        type="number"
                        placeholder="0.00"
                        value={unitPrice}
                        onChange={(e) => setUnitPrice(Number(e.target.value))}
                      />
                    </InputGroup>
                  </Col>
                </Row>

                <Form.Group className="mb-4 d-flex align-items-center">
                  {/* <Form.Label className="me-2">Proveedor:</Form.Label> */}
                  <div className="d-flex flex-grow-1">
                    <Form.Select
                      value={selectedSuplier}
                      onChange={(e) => setSelectedSuplier(e.target.value)}
                    >
                      <option value="">Selecciona un proveedor</option>
                      {supliers.map((suplier) => (
                        <option key={suplier.id} value={suplier.id}>
                          {suplier.name}
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

                <div className="d-flex flex-column flex-md-row gap-3 justify-content-end">
                  {/* <Button
                    variant="outline-success"
                    className="w-100 w-md-auto"
                    type="button"
                  >
                    Cancelar
                  </Button> */}
                  <Button
                    variant="dark"
                    className="w-100 w-md-auto"
                    type="submit"
                  >
                    Registrar
                  </Button>
                </div>
              </Form>
            </div>
          </Col>

          {/* Recomendaciones section */}
          <Col lg={4} className="mt-4 mt-lg-0">
            <div className="bg-white rounded shadow-sm p-4 h-100">
              <h5 className="fw-bold mb-3">Recomendaciones</h5>
              <ul className="small">
                <li>Verifica que has llenado correctamente todos los campos.</li>
                <li>Registra la entrada de los productos en cuanto lleguen al almacén.</li>
                <li>Verifica los datos de la entrada de productos antes de confirmar el registro.</li>
                <li>
                  En caso de que exista algún error al registrar la entrada de productos ve a la
                  sección de entradas, cancela el registro y vuelve a registrar la entrada de los
                  productos correctamente.
                </li>
              </ul>
            </div>
          </Col>



        </Row>
      </Container>
    </Container>
  );
};

export default ProductEntryForm;