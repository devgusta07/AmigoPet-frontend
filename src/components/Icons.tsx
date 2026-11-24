import type { ReactNode, SVGProps } from 'react'

type IconName = 'paw' | 'calendar' | 'user' | 'admin' | 'scissors' | 'sparkles' | 'stethoscope' | 'arrow'

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
}

export function Icon({ name, ...props }: IconProps) {
  const paths: Record<IconName, ReactNode> = {
    paw: <><path d="M8.8 10.1c-1.6 1.7-2.5 4-1.4 5.3 1 1.2 2.8.8 4.6-.4 1.2-.8 2.8-.8 4 0 1.8 1.2 3.6 1.6 4.6.4 1.1-1.3.2-3.6-1.4-5.3-1.4-1.5-2.2-3.2-2.7-5-.5-1.8-1.6-2.9-2.5-2.9s-2 1.1-2.5 2.9c-.5 1.8-1.3 3.5-2.7 5Z" /><ellipse cx="6.3" cy="7.2" rx="2.1" ry="2.8" transform="rotate(-28 6.3 7.2)" /><ellipse cx="21.7" cy="7.2" rx="2.1" ry="2.8" transform="rotate(28 21.7 7.2)" /><ellipse cx="11" cy="4.3" rx="2" ry="2.7" transform="rotate(-10 11 4.3)" /><ellipse cx="17" cy="4.3" rx="2" ry="2.7" transform="rotate(10 17 4.3)" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c.7-3.7 3.3-5.5 8-5.5s7.3 1.8 8 5.5" /></>,
    admin: <><path d="M12 3 4 6v5c0 5 3.3 8.5 8 10 4.7-1.5 8-5 8-10V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></>,
    scissors: <><circle cx="6" cy="7" r="3" /><circle cx="6" cy="17" r="3" /><path d="m8.6 8.6 10.4 8.8M8.6 15.4 19 6.6" /></>,
    sparkles: <><path d="m12 3 1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4L12 3ZM19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" /><path d="m5 14 .6 2L8 17l-2.4 1L5 20l-.6-2L2 17l2.4-1L5 14Z" /></>,
    stethoscope: <><path d="M6 3v5a4 4 0 0 0 8 0V3M4 3h4M12 3h4" /><path d="M14 8v4a5 5 0 0 0 10 0v-1" /><circle cx="21" cy="8" r="2" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  }

  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>
}

export function PetIllustration() {
  return <span className="pet-illustration" role="img" aria-label="Cachorro">🐶</span>
}

export function AuthIllustration() {
  return <span className="auth-illustration" role="img" aria-label="Cachorro">🐶</span>
}
