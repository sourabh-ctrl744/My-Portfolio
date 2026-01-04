import axios from 'axios'

// If you prefer env var, set VITE_API_URL (e.g. http://localhost:5002)
// Otherwise, vite.config.js proxies /api to the backend.
const base = import.meta.env.VITE_API_URL || ''
export const api = axios.create({ baseURL: base })

export const sendMessage = (payload) => api.post('/api/messages', payload)
