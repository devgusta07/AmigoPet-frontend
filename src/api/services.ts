import { http } from './http'
import type {
  Agendamento,
  Animal,
  LoginResponse,
  TipoServico,
  Tutor,
} from '../types/api'

export const authApi = {
  login: (cpf: string, senha: string) =>
    http.post<LoginResponse>('/login', { cpf, senha }),
  register: (data: {
    nome: string
    contato: string
    endereco: string
    email: string
    cpf: string
    senha: string
  }) => http.post<Tutor>('/creat', data),
  requestPasswordReset: (email: string) =>
    http.post('/recuperacao-senha/solicitar', { email }),
  resetPassword: (token: string, senha: string) =>
    http.post('/recuperacao-senha/redefinir', { token, senha }),
}

export const profileApi = {
  get: () => http.get<Tutor>('/meuPerfil/meuPerfil'),
  update: (data: Omit<Tutor, 'cpf'>) => http.put<Tutor>('/meuPerfil/meuPerfil', data),
  changePassword: (data: {
    senhaAtual: string
    novaSenha: string
    confirmacaoNovaSenha: string
  }) => http.put('/meuPerfil/alterarSenha', data),
}

export const animalsApi = {
  list: () => http.get<Animal[]>('/animais/MeusAnimais'),
  search: (nome: string) => http.get<Animal>('/animais/buscarAnimal', { params: { nome } }),
  create: (data: { nome: string; raca: string; peso: number }) =>
    http.post<Animal>('/animais/salvarAnimal', data),
  update: (id: number, data: { nome: string; raca: string; peso: number }) =>
    http.put<Animal>(`/animais/update/${id}`, data),
  remove: (id: number) => http.delete(`/animais/removerAnimal/${id}`),
}

export const appointmentsApi = {
  list: () => http.get<Agendamento[]>('/agendamento/agendamentos'),
  create: (data: {
    data: string
    horario: string
    servico: TipoServico
    idAnimal: number
  }) => http.post<Agendamento>('/agendamento/realizarAgendamento', data),
  update: (
    id: number,
    data: { data: string; horario: string; servico: TipoServico; idAnimal: number },
  ) => http.put<Agendamento>(`/agendamento/updateAgendamento/${id}`, data),
  remove: (id: number) => http.delete(`/agendamento/removerAgendamento/${id}`),
}

export const adminApi = {
  findTutor: (cpf: string) => http.get<Tutor>(`/admin/buscarTutorPorCpf/${cpf}`),
  findAnimals: (cpf: string) => http.get<Animal[]>(`/admin/animaisVinculados/${cpf}`),
  findAppointments: (cpf: string) => http.get<Agendamento[]>(`/admin/agendamentos/${cpf}`),
  removeTutor: (cpf: string) => http.delete(`/admin/removerTutor/${cpf}`),
  removeAppointment: (id: number, cpf: string) =>
    http.delete(`/admin/removerAgendamento/${id}/${cpf}`),
}
