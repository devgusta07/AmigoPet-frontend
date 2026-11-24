import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { adminApi, animalsApi, appointmentsApi, profileApi } from '../api/services'
import { getApiErrorMessage } from '../api/http'
import { useAuth } from '../hooks/useAuth'
import type { Agendamento, Animal, TipoServico, Tutor } from '../types/api'
import { Icon } from '../components/Icons'

function PageTitle({ title, description }: { title: string; description: string }) { return <div className="page-title"><div><h1>{title}</h1><p className="muted">{description}</p></div></div> }
function Feedback({ error, success }: { error?: string; success?: string }) { return <>{error && <p className="form-error">{error}</p>}{success && <p className="form-success">{success}</p>}</> }

export function HomePage() {
  const { roles } = useAuth()
  return <><PageTitle title="Olá, tutor!" description="Tudo pronto para cuidar melhor do seu melhor amigo?" /><div className="dashboard-grid"><Link className="dashboard-card" to="/app/animais"><Icon className="dashboard-icon" name="paw" /><h2>Meus animais</h2><p>Cadastre e acompanhe os dados dos seus pets.</p></Link><Link className="dashboard-card" to="/app/agendamentos"><Icon className="dashboard-icon" name="calendar" /><h2>Agendamentos</h2><p>Consulte e marque os próximos cuidados.</p></Link><Link className="dashboard-card" to="/app/perfil"><Icon className="dashboard-icon" name="user" /><h2>Meu perfil</h2><p>Atualize seus dados e sua senha.</p></Link>{roles.includes('ADMIN') && <Link className="dashboard-card" to="/app/admin"><Icon className="dashboard-icon" name="admin" /><h2>Administração</h2><p>Consulte tutores e agendamentos.</p></Link>}</div></>
}

export function ProfilePage() {
  const [profile, setProfile] = useState<Tutor | null>(null)
  const [form, setForm] = useState({ nome: '', contato: '', endereco: '', email: '' })
  const [password, setPassword] = useState({ senhaAtual: '', novaSenha: '', confirmacaoNovaSenha: '' })
  const [error, setError] = useState(''); const [success, setSuccess] = useState(''); const [loading, setLoading] = useState(true)
  useEffect(() => { profileApi.get().then(({ data }) => { setProfile(data); setForm({ nome: data.nome, contato: data.contato, endereco: data.endereco, email: data.email }) }).catch((err) => setError(getApiErrorMessage(err, 'Não foi possível carregar o perfil.'))).finally(() => setLoading(false)) }, [])
  async function update(event: FormEvent) { event.preventDefault(); setError(''); setSuccess(''); try { const { data } = await profileApi.update(form); setProfile(data); setSuccess('Perfil atualizado com sucesso.') } catch (err) { setError(getApiErrorMessage(err, 'Não foi possível atualizar o perfil.')) } }
  async function changePassword(event: FormEvent) { event.preventDefault(); setError(''); setSuccess(''); try { await profileApi.changePassword(password); setPassword({ senhaAtual: '', novaSenha: '', confirmacaoNovaSenha: '' }); setSuccess('Senha alterada com sucesso.') } catch (err) { setError(getApiErrorMessage(err, 'Não foi possível alterar a senha.')) } }
  if (loading) return <p className="loading">Carregando perfil...</p>
  return <><PageTitle title="Meu perfil" description="Mantenha seus dados sempre atualizados." /><div className="two-column"><section className="panel"><h2>Dados pessoais</h2><form className="form-stack" onSubmit={update}>{(['nome', 'contato', 'endereco', 'email'] as const).map((field) => <label key={field}>{field === 'nome' ? 'Nome' : field === 'contato' ? 'Contato' : field === 'endereco' ? 'Endereço' : 'E-mail'}<input type={field === 'email' ? 'email' : 'text'} value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} required /></label>)}<p className="muted">CPF: {profile?.cpf}</p><button className="button button-primary">Salvar dados</button></form></section><section className="panel"><h2>Alterar senha</h2><form className="form-stack" onSubmit={changePassword}>{[['senhaAtual', 'Senha atual'], ['novaSenha', 'Nova senha'], ['confirmacaoNovaSenha', 'Confirme a nova senha']].map(([field, label]) => <label key={field}>{label}<input type="password" value={password[field as keyof typeof password]} onChange={(e) => setPassword({ ...password, [field]: e.target.value })} required /></label>)}<button className="button button-primary">Alterar senha</button></form></section></div><Feedback error={error} success={success} /></>
}

export function AnimalsPage() {
  const [animals, setAnimals] = useState<Animal[]>([]); const [form, setForm] = useState({ nome: '', raca: '', peso: '' }); const [error, setError] = useState(''); const [success, setSuccess] = useState(''); const [loading, setLoading] = useState(true)
  const load = () => animalsApi.list().then(({ data }) => setAnimals(data)).catch((err) => setError(getApiErrorMessage(err, 'Não foi possível carregar os animais.'))).finally(() => setLoading(false))
  useEffect(() => { void load() }, [])
  async function submit(event: FormEvent) { event.preventDefault(); setError(''); setSuccess(''); try { await animalsApi.create({ ...form, peso: Number(form.peso) }); setForm({ nome: '', raca: '', peso: '' }); setSuccess('Animal cadastrado com sucesso.'); load() } catch (err) { setError(getApiErrorMessage(err, 'Não foi possível cadastrar o animal.')) } }
  async function remove(id: number) { if (!window.confirm('Deseja remover este animal?')) return; try { await animalsApi.remove(id); setAnimals(animals.filter((animal) => animal.id !== id)) } catch (err) { setError(getApiErrorMessage(err, 'Não foi possível remover o animal.')) } }
  return <><PageTitle title="Meus animais" description="Cadastre e acompanhe seus companheiros." /><div className="two-column"><section className="panel"><h2>Novo animal</h2><form className="form-stack" onSubmit={submit}>{[['nome', 'Nome'], ['raca', 'Raça'], ['peso', 'Peso (kg)']].map(([field, label]) => <label key={field}>{label}<input type={field === 'peso' ? 'number' : 'text'} step={field === 'peso' ? '0.1' : undefined} value={form[field as keyof typeof form]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} required /></label>)}<button className="button button-primary">Cadastrar animal</button></form></section><section className="panel"><h2>Animais cadastrados</h2>{loading ? <p className="loading">Carregando...</p> : animals.length === 0 ? <p className="muted">Nenhum animal cadastrado.</p> : <div className="list">{animals.map((animal) => <div className="list-item" key={animal.id}><div><strong>{animal.nome}</strong><span>{animal.raca} · {animal.peso} kg</span></div><button className="button button-danger" onClick={() => remove(animal.id)}>Remover</button></div>)}</div>}</section></div><Feedback error={error} success={success} /></>
}

const serviceLabels: Record<TipoServico, string> = { BANHO_E_TOSA: 'Banho e tosa', HIDRATACAO_E_PENTEADOS: 'Hidratação e penteados', CONSULTA_VETERINARIA: 'Consulta veterinária' }
export function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Agendamento[]>([]); const [animals, setAnimals] = useState<Animal[]>([]); const [form, setForm] = useState({ data: '', horario: '', servico: 'BANHO_E_TOSA' as TipoServico, idAnimal: '' }); const [error, setError] = useState(''); const [success, setSuccess] = useState('')
  useEffect(() => { Promise.all([appointmentsApi.list(), animalsApi.list()]).then(([a, b]) => { setAppointments(a.data); setAnimals(b.data) }).catch((err) => setError(getApiErrorMessage(err, 'Não foi possível carregar os agendamentos.'))) }, [])
  async function submit(event: FormEvent) { event.preventDefault(); setError(''); setSuccess(''); try { const { data } = await appointmentsApi.create({ ...form, idAnimal: Number(form.idAnimal) }); setAppointments([...appointments, data]); setSuccess('Agendamento realizado com sucesso.') } catch (err) { setError(getApiErrorMessage(err, 'Não foi possível realizar o agendamento.')) } }
  async function remove(id: number) { try { await appointmentsApi.remove(id); setAppointments(appointments.filter((item) => item.id !== id)) } catch (err) { setError(getApiErrorMessage(err, 'Não foi possível remover o agendamento.')) } }
  return <><PageTitle title="Agendamentos" description="Organize os próximos cuidados do seu pet." /><div className="two-column"><section className="panel"><h2>Novo agendamento</h2>{animals.length === 0 ? <p className="muted">Cadastre um animal antes de agendar.</p> : <form className="form-stack" onSubmit={submit}><label>Animal<select value={form.idAnimal} onChange={(e) => setForm({ ...form, idAnimal: e.target.value })} required><option value="">Selecione</option>{animals.map((animal) => <option value={animal.id} key={animal.id}>{animal.nome}</option>)}</select></label><label>Data<input type="date" value={form.data} onChange={(e) => setForm({ ...form, data: e.target.value })} required /></label><label>Horário<input type="time" value={form.horario} onChange={(e) => setForm({ ...form, horario: e.target.value })} required /></label><label>Serviço<select value={form.servico} onChange={(e) => setForm({ ...form, servico: e.target.value as TipoServico })}>{Object.entries(serviceLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label><button className="button button-primary">Agendar</button></form>}</section><section className="panel"><h2>Próximos agendamentos</h2>{appointments.length === 0 ? <p className="muted">Nenhum agendamento encontrado.</p> : <div className="list">{appointments.map((item) => <div className="list-item" key={item.id}><div><strong>{item.nome}</strong><span>{item.data} às {item.horario} · {serviceLabels[item.servico]}</span></div><button className="button button-danger" onClick={() => remove(item.id)}>Cancelar</button></div>)}</div>}</section></div><Feedback error={error} success={success} /></>
}

export function AdminPage() {
  const [cpf, setCpf] = useState('')
  const [tutor, setTutor] = useState<Tutor | null>(null)
  const [animals, setAnimals] = useState<Animal[]>([])
  const [appointments, setAppointments] = useState<Agendamento[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function search(event: FormEvent) {
    event.preventDefault()
    setError('')
    setTutor(null)
    setLoading(true)
    try {
      const [tutorResponse, animalsResponse, appointmentsResponse] = await Promise.all([
        adminApi.findTutor(cpf),
        adminApi.findAnimals(cpf),
        adminApi.findAppointments(cpf),
      ])
      setTutor(tutorResponse.data)
      setAnimals(animalsResponse.data)
      setAppointments(appointmentsResponse.data)
    } catch (err) {
      setError(getApiErrorMessage(err, 'Não foi possível consultar o tutor.'))
    } finally {
      setLoading(false)
    }
  }

  async function removeAppointment(id: number) {
    try {
      await adminApi.removeAppointment(id, cpf)
      setAppointments(appointments.filter((item) => item.id !== id))
    } catch (err) {
      setError(getApiErrorMessage(err, 'Não foi possível remover o agendamento.'))
    }
  }

  async function removeTutor() {
    if (!window.confirm('Deseja remover este tutor?')) return
    try {
      await adminApi.removeTutor(cpf)
      setTutor(null)
      setAnimals([])
      setAppointments([])
    } catch (err) {
      setError(getApiErrorMessage(err, 'Não foi possível remover o tutor.'))
    }
  }

  return <><PageTitle title="Administração" description="Consulte tutores e gerencie seus agendamentos." />
    <section className="panel">
      <form className="inline-form" onSubmit={search}>
        <label>CPF do tutor<input value={cpf} onChange={(event) => setCpf(event.target.value)} required /></label>
        <button className="button button-primary" disabled={loading}>{loading ? 'Consultando...' : 'Consultar'}</button>
      </form>
      <Feedback error={error} />
    </section>
    {tutor && <div className="admin-results">
      <section className="panel"><div className="panel-heading"><div><h2>{tutor.nome}</h2><p className="muted">{tutor.email} · {tutor.cpf}</p></div><button className="button button-danger" onClick={removeTutor}>Remover tutor</button></div><h3>Animais ({animals.length})</h3>{animals.length === 0 ? <p className="muted">Nenhum animal.</p> : <div className="list">{animals.map((animal) => <div className="list-item" key={animal.id}><strong>{animal.nome}</strong><span>{animal.raca} · {animal.peso} kg</span></div>)}</div>}</section>
      <section className="panel"><h2>Agendamentos ({appointments.length})</h2>{appointments.length === 0 ? <p className="muted">Nenhum agendamento.</p> : <div className="list">{appointments.map((item) => <div className="list-item" key={item.id}><div><strong>{item.nome}</strong><span>{item.data} às {item.horario} · {serviceLabels[item.servico]}</span></div><button className="button button-danger" onClick={() => removeAppointment(item.id)}>Remover</button></div>)}</div>}</section>
    </div>}
  </>
}
