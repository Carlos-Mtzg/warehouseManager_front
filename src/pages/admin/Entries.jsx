import React, { useState, useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Table,
  Pagination,
  Button,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AxiosClient from '../../config/axios-client';

const Entries = () => {
  const [entries, setEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(5);

  const fetchEntries = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await AxiosClient.get(`productEntry/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container fluid className="bg-light min-vh-100 p-0">
      <Container className="py-4">
        <Row>
          <Col lg={12}>
            <div className="bg-white rounded shadow-sm p-4">
              <h4 className="text-center mb-4">Entradas</h4>
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Cantidad</th>
                    <th>Unidad de Medida</th>
                    <th>Producto</th>
                    <th>Monto Total</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEntries.map((entry) => (
                    <tr key={entry.id}>
                      <td>{entry.quantity}</td>
                      <td>{entry.measurementUnit}</td>
                      <td>{entry.productName}</td>
                      <td>${entry.totalAmount}</td>
                      <td>{entry.entryDate}</td>
                      <td>
                        <Button variant="danger" size="sm">
                          Cancelar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Pagination className="justify-content-center">
                {Array.from(
                  { length: Math.ceil(entries.length / entriesPerPage) },
                  (_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  )
                )}
              </Pagination>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Entries;
