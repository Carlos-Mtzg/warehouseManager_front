import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AxiosClient from "../config/axios-client";

const AddSupplierModal = ({ show, handleClose, onSupplierAdded }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async () => {
    const requestBody = {
      name,
      email,
    };
  
    try {
      const token = localStorage.getItem("accessToken"); // Retrieve the token if needed
      const response = await AxiosClient.post("suplier/", requestBody, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the request headers
        },
      });
      console.log("Proveedor registrado exitosamente:", response);
      alert("Proveedor registrado exitosamente.");
      handleClose(); // Close the modal after successful registration
      if (onSupplierAdded) onSupplierAdded(); // Refresh the supplier list

    } catch (error) {
      console.error("Error al registrar el proveedor:", error);
      alert("Error al registrar el proveedor. Por favor, inténtalo de nuevo.");
    }
  };



  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="p-5 rounded" style={{ backgroundColor: "#fff" }}>
        <h4 className="text-center fw-bold mb-4" style={{ color: "#1f3f38" }}>
          Agregar proveedor
        </h4>

        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold" style={{ color: "#1f3f38" }}>
            Nombre del proveedor o empresa:
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              backgroundColor: "#f8f8f8",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "16px",
              padding: "10px",
            }}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold" style={{ color: "#1f3f38" }}>
            Correo electrónico del proveedor
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              backgroundColor: "#f8f8f8",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "16px",
              padding: "10px",
            }}
          />
        </Form.Group>

        <div className="d-flex justify-content-between">
          <Button
            variant="outline-success"
            className="w-50 me-2 fw-semibold"
            style={{
              fontSize: "18px",
              borderColor: "#3d5c51",
              color: "#3d5c51",
              borderWidth: "2px",
            }}
            onClick={handleClose}
          >
            Cancelar
          </Button>

          <Button
            className="w-50 fw-semibold"
            style={{
              backgroundColor: "#1f3f38",
              borderColor: "#1f3f38",
              fontSize: "18px",
            }}
            onClick={handleRegister}
          >
            Registrar
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddSupplierModal;