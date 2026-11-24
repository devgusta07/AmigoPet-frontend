import axios from 'axios'

export const TOKEN_KEY = 'amigopet.jwt'

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export function getStoredToken(): string | null {
  const token = sessionStorage.getItem(TOKEN_KEY)
  if (!token || isTokenExpired(token)) {
    sessionStorage.removeItem(TOKEN_KEY)
    return null
  }
  return token
}

export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return typeof payload.exp !== 'number' || payload.exp * 1000 <= Date.now()
  } catch {
    return true
  }
}

http.interceptors.request.use((config) => {
  const token = getStoredToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem(TOKEN_KEY)
      window.dispatchEvent(new Event('amigopet:unauthorized'))
    }
    return Promise.reject(error)
  },
)

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const message = (error.response?.data as { message?: string } | undefined)?.message
    if (message) return message

    switch (error.response?.status) {
      case 401:
        return 'Sua sessão expirou. Faça login novamente.'
      case 403:
        return 'Você não tem permissão para realizar esta ação.'
      case 404:
        return 'O recurso solicitado não foi encontrado.'
      case 500:
        return 'O servidor encontrou um erro. Tente novamente mais tarde.'
      default:
        return error.message || fallback
    }
  }
  return fallback
}
