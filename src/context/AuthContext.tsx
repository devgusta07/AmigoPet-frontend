import { useEffect, useMemo, useState } from 'react'
import { authApi } from '../api/services'
import { getApiErrorMessage, getStoredToken, TOKEN_KEY } from '../api/http'
import type { Role } from '../types/api'
import { AuthContext, type AuthContextValue } from './auth-context'

function getRoles(token: string | null): Role[] {
  if (!token) return []
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return Array.isArray(payload.roles) ? payload.roles : []
  } catch {
    return []
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState(getStoredToken)

  const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY)
    setToken(null)
  }

  useEffect(() => {
    const handleUnauthorized = () => logout()
    window.addEventListener('amigopet:unauthorized', handleUnauthorized)
    return () => window.removeEventListener('amigopet:unauthorized', handleUnauthorized)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      roles: getRoles(token),
      isAuthenticated: Boolean(token),
      async login(cpf, senha) {
        try {
          const response = await authApi.login(cpf, senha)
          sessionStorage.setItem(TOKEN_KEY, response.data.jwt)
          setToken(response.data.jwt)
        } catch (error) {
          throw new Error(getApiErrorMessage(error, 'Não foi possível realizar o login.'))
        }
      },
      logout,
    }),
    [token],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

