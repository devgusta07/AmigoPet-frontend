import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { authApi } from '../api/services'
import { getApiErrorMessage } from '../api/http'
import { useAuth } from '../hooks/useAuth'
import { AuthIllustration } from '../components/Icons'

function AuthCard({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle: string }) {
  return <main className="auth-page"><div className="auth-visual"><Link className="brand" to="/">AmigoPet</Link><span className="eyebrow">Cuidado em cada detalhe, carinho em cada momento</span><h2>Uma experiência feita para quem cuida.</h2><p>Organize a rotina do seu pet com praticidade, segurança e carinho.</p><AuthIllustration /></div><section className="auth-card"><Link className="brand" to="/">AmigoPet</Link><h1>{title}</h1><p className="muted">{subtitle}</p>{children}</section></main>
}

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [cpf, setCpf] = useState('')
  const [senha, setSenha] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(cpf, senha)
      navigate((location.state as { from?: string } | null)?.from || '/app')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível realizar o login.')
    } finally { setLoading(false) }
  }

  return <AuthCard title="Bem-vindo de volta" subtitle="Entre para continuar cuidando do seu pet.">
    <form className="form-stack" onSubmit={submit}>
      <label>CPF<input value={cpf} onChange={(e) => setCpf(e.target.value)} required /></label>
      <label>Senha<input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required /></label>
      {error && <p className="form-error">{error}</p>}
      <button className="button button-primary full-width" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
    </form>
    <div className="auth-links"><Link to="/recuperar-senha">Esqueci minha senha</Link><span>Não possui conta? <Link to="/cadastro">Cadastre-se</Link></span></div>
  </AuthCard>
}

export function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nome: '', contato: '', endereco: '', email: '', cpf: '', senha: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [key]: event.target.value })

  async function submit(event: FormEvent) {
    event.preventDefault(); setError(''); setLoading(true)
    try { await authApi.register(form); navigate('/login') }
    catch (err) { setError(getApiErrorMessage(err, 'Não foi possível criar sua conta.')) }
    finally { setLoading(false) }
  }

  return <AuthCard title="Crie sua conta" subtitle="Tenha todos os cuidados do seu pet na palma da mão.">
    <form className="form-stack" onSubmit={submit}>
      {(['nome', 'contato', 'endereco', 'email', 'cpf', 'senha'] as const).map((field) => <label key={field}>{field === 'nome' ? 'Nome' : field === 'contato' ? 'Contato' : field === 'endereco' ? 'Endereço' : field === 'email' ? 'E-mail' : field === 'cpf' ? 'CPF' : 'Senha'}<input type={field === 'senha' ? 'password' : field === 'email' ? 'email' : 'text'} value={form[field]} onChange={update(field)} required /></label>)}
      {error && <p className="form-error">{error}</p>}
      <button className="button button-primary full-width" disabled={loading}>{loading ? 'Criando...' : 'Criar conta'}</button>
    </form>
    <div className="auth-links"><span>Já possui conta? <Link to="/login">Entrar</Link></span></div>
  </AuthCard>
}

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  async function submit(event: FormEvent) {
    event.preventDefault(); setError(''); setMessage(''); setLoading(true)
    try { await authApi.requestPasswordReset(email); setMessage('Se o e-mail estiver cadastrado, o token de recuperação será enviado.') }
    catch (err) { setError(getApiErrorMessage(err, 'Não foi possível solicitar a recuperação.')) }
    finally { setLoading(false) }
  }
  return <AuthCard title="Recuperar senha" subtitle="Informe seu e-mail para receber um token de recuperação.">
    <form className="form-stack" onSubmit={submit}><label>E-mail<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>{message && <p className="form-success">{message}</p>}{error && <p className="form-error">{error}</p>}<button className="button button-primary full-width" disabled={loading}>{loading ? 'Enviando...' : 'Solicitar recuperação'}</button></form>
    <div className="auth-links"><Link to="/redefinir-senha">Já tenho um token</Link><Link to="/login">Voltar para o login</Link></div>
  </AuthCard>
}

export function ResetPasswordPage() {
  const [token, setToken] = useState('')
  const [senha, setSenha] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  async function submit(event: FormEvent) {
    event.preventDefault(); setError(''); setMessage(''); setLoading(true)
    try { await authApi.resetPassword(token, senha); setMessage('Senha redefinida com sucesso. Você já pode entrar.') }
    catch (err) { setError(getApiErrorMessage(err, 'Token inválido ou expirado.')) }
    finally { setLoading(false) }
  }
  return <AuthCard title="Redefinir senha" subtitle="Use o token recebido no seu e-mail.">
    <form className="form-stack" onSubmit={submit}><label>Token<input value={token} onChange={(e) => setToken(e.target.value)} required /></label><label>Nova senha<input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required /></label>{message && <p className="form-success">{message}</p>}{error && <p className="form-error">{error}</p>}<button className="button button-primary full-width" disabled={loading}>{loading ? 'Salvando...' : 'Redefinir senha'}</button></form>
    <div className="auth-links"><Link to="/login">Voltar para o login</Link></div>
  </AuthCard>
}
