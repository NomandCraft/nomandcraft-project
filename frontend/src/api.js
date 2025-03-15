import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Get all campers
export const fetchCampers = async () => {
  try {
    const response = await api.get('/api/campers')
    return response.data || { campers: [] } // ✅ Возвращаем объект с campers
  } catch (error) {
    console.error('Ошибка при получении кемперов:', error)
    return { campers: [] } // ✅ Безопасное значение
  }
}

// Get categories
export const fetchCategories = async () => {
  try {
    const response = await api.get('/api/categories')
    return Array.isArray(response.data) ? response.data : []
  } catch (error) {
    console.error('Error when receiving categories:', error)
    return []
  }
}

// Get users (only for admins)
export const fetchUsers = async () => {
  try {
    const response = await api.get('/api/users')
    return Array.isArray(response.data) ? response.data : []
  } catch (error) {
    console.error('Error when receiving users:', error)
    return []
  }
}

export default api
