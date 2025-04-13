import AxiosClient from '../config/axios-client'

export async function getAllSuppliers() {
  try {
    const response = await AxiosClient.get('/supplier/')
    return { state: 'success', data: response.data }
  } catch (error) {
    return { state: 'error', message: error.message }
  }
}

export async function deleteSupplier(uuid) {
  try {
    const response = await AxiosClient.delete(`/supplier/${uuid}`)
    return {
      state: 'success',
      status: response.status,
      data: response
    }
  } catch (error) {
    return {
      state: 'error',
      status: error.response?.status || 500,
      message: error.message
    }
  }
}
