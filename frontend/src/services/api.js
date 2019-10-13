import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:3333',
  timeout: 1000
})

api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
