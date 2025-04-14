import AxiosClient from '../config/axios-client'

export async function getAllCategories() {
  try {
    const response = await AxiosClient.get('category/')
    return { state: 'success', data: response.data }
  } catch (error) {
    return { state: 'error', message: error.message }
  }
}

export async function deleteCategory(uuid) {
  try {
    const response = await AxiosClient.delete(`category/${uuid}`)
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
