import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AxiosClient from "../config/axios-client";
const AddCategoryModal = ({ show, handleClose, onCategoryAdded }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleRegister = async () => {
    const requestBody = {
      name: categoryName
    };
  
    try {
      const token = localStorage.getItem("accessToken"); // Retrieve the token if needed
      const response = await AxiosClient.post("category/", requestBody, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the request headers
        },
      });
      console.log("Categoria registrado exitosamente:", response);
      alert("Proveedor registrado exitosamente.");
      handleClose(); // Close the modal after successful registration

    } catch (error) {
      console.error("Error al registrar el categoria:", error);
      alert("Error al registrar la categoria. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="p-5 rounded" style={{ backgroundColor: "#fff" }}>
        <h4 className="text-center fw-bold text-dark mb-4" style={{ color: "#1f3f38" }}>
          Agregar categoría
        </h4>

        <Form.Control
          type="text"
          placeholder="Nombre de la categoría"
          className="mb-4 py-2"
          style={{
            backgroundColor: "#f8f8f8",
            borderRadius: "8px",
            border: "1px solid #eee",
            fontSize: "16px",
          }}
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />

        <div className="d-flex justify-content-between">
          <Button
            variant="outline-success"
            className="w-50 me-2 fw-semibold"
            style={{
              borderWidth: "2px",
              fontSize: "18px",
              borderColor: "#3d5c51",
              color: "#3d5c51",
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

export default AddCategoryModal;