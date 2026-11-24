export type Role = 'USER' | 'ADMIN'

export interface LoginResponse {
  jwt: string
}

export interface Tutor {
  nome: string
  contato: string
  endereco: string
  email: string
  cpf: string
}

export interface Animal {
  id: number
  nome: string
  raca: string
  peso: number
}

export type TipoServico =
  | 'BANHO_E_TOSA'
  | 'HIDRATACAO_E_PENTEADOS'
  | 'CONSULTA_VETERINARIA'

export interface Agendamento {
  id: number
  data: string
  horario: string
  servico: TipoServico
  nome: string
}

export interface ApiErrorResponse {
  message?: string
}
