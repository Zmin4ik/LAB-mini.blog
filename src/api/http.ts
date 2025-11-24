import axios from 'axios'
import { ToastService } from '../services/toast.service'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

export const http = axios.create({ baseURL, timeout: 5000 })

http.interceptors.response.use(
    (res) => {
        if (res.config && ['post', 'put', 'delete'].includes(res.config.method || '')) {
            ToastService.success(res.data?.message || 'Success')
        }
        return res
    },
    (error) => {
        const msg = error?.response?.data?.message || error.message || 'Unknown error'
        ToastService.error(msg)
        return Promise.reject(error)
    }
)

export default http