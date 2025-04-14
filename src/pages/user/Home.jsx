import React, { useEffect, useState } from 'react'
import entradaImg from '../../assets/images/CheckingBoxes.png'
import salidaImg from '../../assets/images/Logistics.png'
import styles from '../../assets/css/admin/admin.module.css'
import localStyles from '../../assets/css/users.module.css'
import { useNavigate } from 'react-router-dom'
import AxiosClient from '../../config/axios-client'
import PrimaryButton from '../../components/buttons/PrimaryButton'

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
      className={`container-fluid mx-auto p-4 ${localStyles['user-home-container']}`}
    >
      <div>
        <div className="mb-4 d-flex align-items-center gap-3 flex-wrap">
          <h1 className={`font-bold text-2xl me-auto ${styles.title} slide-in-right`}>
            Bienvenido(a), {userName} {lastname}
          </h1>
        </div>

        <div className="row justify-content-center g-4">
          <div className="col-12 col-md-6 slide-in-left">
            <div
              className={`bg-card p-4 rounded shadow text-center ${localStyles['card-hover']}`}
            >
              <PrimaryButton
                text="Registrar entrada"
                type="button"
                onClick={() => navigate('/product-entries')}
                icon="bi bi-box-arrow-in-down"
                className="w-100"
              />
              <img
                src={entradaImg}
                alt="Registrar entrada"
                className={localStyles.image}
              />
            </div>
          </div>

          <div className="col-12 col-md-6 slide-in-right">
            <div
              className={`bg-card p-4 rounded shadow text-center ${localStyles['card-hover']}`}
            >
              <PrimaryButton
                text="Registrar salida"
                type="button"
                onClick={() => navigate('/product-out')}
                icon="bi bi-box-arrow-in-up"
                className="w-100"
              />
              <img
                src={salidaImg}
                alt="Registrar salida"
                className={localStyles.image}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={`bg-card p-4 rounded shadow mt-5 slide-up`}>
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
