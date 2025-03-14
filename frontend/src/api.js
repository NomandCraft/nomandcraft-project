import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Получить всех кемперов
export const fetchCampers = async () => {
  const response = await api.get('/api/campers')
  return response.data
}

// Получить категории
export const fetchCategories = async () => {
  const response = await api.get('/api/categories')
  return response.data
}

// Получить пользователей (только для админов)
export const fetchUsers = async () => {
  const response = await api.get('/api/users')
  return response.data
}

export default api
