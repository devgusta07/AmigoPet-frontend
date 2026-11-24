import { Link } from 'react-router-dom'
import { Icon, PetIllustration } from '../components/Icons'

export function LandingPage() {
  return (
    <main className="landing-page">
      <nav className="landing-nav">
        <Link className="brand" to="/">AmigoPet</Link>
        <div className="nav-actions">
          <Link className="button button-outline" to="/login">Entrar</Link>
          <Link className="button button-primary" to="/cadastro">Criar conta</Link>
        </div>
      </nav>
      <section className="hero-section">
        <div>
          <span className="eyebrow">Cuidado que vira amizade</span>
          <h1>O cuidado do seu pet em um só lugar.</h1>
          <p>Cadastre seus animais, acompanhe seus dados e agende serviços veterinários com praticidade.</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/cadastro">Começar agora</Link>
            <Link className="text-link" to="/login">Já tenho uma conta →</Link>
          </div>
        </div>
        <div className="hero-card">
          <PetIllustration />
          <strong>Seu melhor amigo merece o melhor.</strong>
        </div>
      </section>
      <section className="services-section">
        <span className="eyebrow">Nossos serviços</span>
        <h2>Uma rotina mais simples para você e seu pet</h2>
        <div className="service-grid">
          <article><Icon className="service-icon" name="scissors" /><h3>Banho e tosa</h3><p>Higiene e bem-estar para deixar seu pet ainda mais feliz.</p></article>
          <article><Icon className="service-icon" name="sparkles" /><h3>Hidratação e penteados</h3><p>Cuidados especiais para todos os tipos de pelagem.</p></article>
          <article><Icon className="service-icon" name="stethoscope" /><h3>Consulta veterinária</h3><p>Acompanhamento profissional para a saúde do seu companheiro.</p></article>
        </div>
      </section>
      <footer className="landing-footer">AmigoPet · Cuidando de quem cuida de você.</footer>
    </main>
  )
}
