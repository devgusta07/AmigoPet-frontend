import { Link, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function Layout() {
  const { logout, roles } = useAuth()

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link className="brand" to="/app">AmigoPet</Link>
        <nav className="main-nav">
          <NavLink to="/app">Início</NavLink>
          <NavLink to="/app/animais">Meus animais</NavLink>
          <NavLink to="/app/agendamentos">Agendamentos</NavLink>
          {roles.includes('ADMIN') && <NavLink to="/app/admin">Administração</NavLink>}
          <button className="link-button" onClick={logout}>Sair</button>
        </nav>
      </header>
      <main className="page-content"><Outlet /></main>
    </div>
  )
}
