import axios from 'axios'

const host = import.meta.env.VITE_API_URL as string

const axiosInstance = () => {
  const instance = axios.create({
    baseURL: host,
    headers: { 'Content-Type': 'application/json' },
  })

  return instance
}

export { axiosInstance }
