import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import { LandingPage } from './pages/LandingPage'
import { ForgotPasswordPage, LoginPage, RegisterPage, ResetPasswordPage } from './pages/AuthPages'
import { AdminPage, AnimalsPage, AppointmentsPage, HomePage, ProfilePage } from './pages/AppPages'

function App() {
  return <BrowserRouter><AuthProvider><Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/cadastro" element={<RegisterPage />} />
    <Route path="/recuperar-senha" element={<ForgotPasswordPage />} />
    <Route path="/redefinir-senha" element={<ResetPasswordPage />} />
    <Route element={<ProtectedRoute />}><Route element={<Layout />}>
      <Route path="/app" element={<HomePage />} />
      <Route path="/app/perfil" element={<ProfilePage />} />
      <Route path="/app/animais" element={<AnimalsPage />} />
      <Route path="/app/agendamentos" element={<AppointmentsPage />} />
    </Route></Route>
    <Route element={<ProtectedRoute requiredRole="ADMIN" />}><Route element={<Layout />}><Route path="/app/admin" element={<AdminPage />} /></Route></Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></AuthProvider></BrowserRouter>
}

export default App
