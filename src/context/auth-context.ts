import { createContext } from 'react'
import type { Role } from '../types/api'

export interface AuthContextValue {
  token: string | null
  roles: Role[]
  isAuthenticated: boolean
  login: (cpf: string, senha: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
