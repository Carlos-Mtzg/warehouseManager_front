import React, { useEffect, useState } from 'react'
import entradaImg from '../../assets/images/CheckingBoxes.png'
import salidaImg from '../../assets/images/Logistics.png'
import styles from '../../assets/css/admin/admin.module.css'
import localStyles from '../../assets/css/users.module.css'
import { useNavigate } from 'react-router-dom'
import AxiosClient from '../../config/axios-client'

const UserHome = () => {
  const [userName, setUserName] = useState('')
  const [lastname, setLastname] = useState('')
  const userUuid = localStorage.getItem('uuid')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await AxiosClient.get(`/user/${userUuid}`)
        setUserName(response.name)
        setLastname(response.lastname)
      } catch (error) {
        console.error('Error al obtener el nombre del usuario:', error)
      }
    }

    if (userUuid) fetchUserName()
  }, [userUuid])

  return (
    <div
      className={`container mx-auto p-4 ${localStyles['user-home-container']}`}
    >
      <div className="slide-in-right">
        <div className="mb-4 d-flex align-items-center gap-3 flex-wrap">
          <h1 className={`font-bold text-2xl me-auto ${styles.title}`}>
            Bienvenido, {userName} {lastname}
          </h1>
        </div>

        <div className="row justify-content-center g-4">
          <div className="col-12 col-md-6 col-lg-5">
            <div
              className={`bg-card p-4 rounded shadow text-center ${localStyles['card-hover']}`}
            >
              <button
                className={`rounded mb-3 w-100 ${styles['submit-btn']}`}
                onClick={() => navigate('/product-entries')}
              >
                <div
                  className={`btn d-flex justify-content-center ${styles['submit-content']}`}
                >
                  Registrar entrada
                  <i className="bi bi-box-arrow-in-down ms-2"></i>
                </div>
                <span></span>
              </button>
              <img
                src={entradaImg}
                alt="Registrar entrada"
                className={localStyles.image}
              />
              <p className="text-muted mt-3">
                Registra todas las entradas de los productos que lleguen
                al almacén.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-5">
            <div
              className={`bg-card p-4 rounded shadow text-center ${localStyles['card-hover']}`}
            >
              <button
                className={`rounded mb-3 w-100 ${styles['submit-btn']}`}
                onClick={() => navigate('/product-outs')}
              >
                <div
                  className={`btn d-flex justify-content-center ${styles['submit-content']}`}
                >
                  Registrar salida<i className="bi bi-box-arrow-up ms-2"></i>
                </div>
                <span></span>
              </button>
              <img
                src={salidaImg}
                alt="Registrar salida"
                className={localStyles.image}
              />
              <p className="text-muted mt-3">
                Registra todas las salidas de los productos que salgan del
                almacén.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={`bg-card p-4 rounded shadow mt-5 slide-in-left`}>
        <h5 className={`fw-bold mb-3 ${styles.title}`}>Recomendaciones</h5>
        <ul className="text-muted">
          <li>
            Registra todas las entradas de productos que recibas en el almacén.
          </li>
          <li>
            Registra la entrada de los productos en cuanto lleguen al almacén.
          </li>
          <li>
            Verifica los datos de la entrada de productos antes de confirmar el
            registro.
          </li>
          <li>
            En caso de que exista algún error al registrar la entrada de
            productos ve a la sección de entradas, cancela el registro y vuelve
            a registrar la entrada de los productos correctamente.
          </li>
          <br />
          <li>
            Registra todas las salidas de productos que salgan del almacén.
          </li>
          <li>Registra las salidas en cuanto se realicen.</li>
          <li>Verifica los datos de salida antes de confirmar el registro.</li>
          <li>
          En caso de que exista algún error al registrar la salida de productos ve a la sección de entradas, cancela el registro y vuelve a registrar la salida de los productos correctamente.
          </li>
        </ul>
      </div>
    </div>
  )
}

export default UserHome
