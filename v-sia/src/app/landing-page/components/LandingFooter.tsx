import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { Globe, MessageCircle, Code2 } from 'lucide-react';

export default function LandingFooter() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-14">
      <div className="max-w-screen-xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <AppLogo size={32} />
              <span className="font-display text-lg font-700 text-white tracking-tight">
                SeñasIA
              </span>
            </div>
            <p className="text-sm font-400 leading-relaxed max-w-xs">
              Traducción de lengua de señas en tiempo real. Tecnología para la inclusión.
            </p>
            <p className="text-xs font-400 text-slate-500">
              © 2026 SeñasIA. Todos los derechos reservados.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-8 text-sm">
            <div className="flex flex-col gap-2">
              <p className="text-white font-600 text-xs uppercase tracking-widest mb-1">Plataforma</p>
              <Link href="/sign-up-login-screen" className="hover:text-white transition-colors">Iniciar sesión</Link>
              <Link href="/sign-up-login-screen?mode=register" className="hover:text-white transition-colors">Registrarse</Link>
              <Link href="/translation-room" className="hover:text-white transition-colors">Sala de traducción</Link>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-white font-600 text-xs uppercase tracking-widest mb-1">Legal</p>
              <Link href="/" className="hover:text-white transition-colors">Privacidad</Link>
              <Link href="/" className="hover:text-white transition-colors">Términos de uso</Link>
              <Link href="/" className="hover:text-white transition-colors">Accesibilidad</Link>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <p className="text-white font-600 text-xs uppercase tracking-widest">Síguenos</p>
            <div className="flex items-center gap-3">
              {[
                { SocialIcon: Globe, label: 'Sitio web', key: 'social-web' },
                { SocialIcon: MessageCircle, label: 'Comunidad', key: 'social-community' },
                { SocialIcon: Code2, label: 'GitHub', key: 'social-github' },
              ]?.map(({ SocialIcon: SocialIconComponent, label, key }) => (
                <a
                  key={key}
                  href="/"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-primary flex items-center justify-center transition-all duration-200 hover:scale-105"
                >
                  <SocialIconComponent size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}