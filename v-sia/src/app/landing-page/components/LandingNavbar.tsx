'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { LogIn, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Producto', href: '#producto', key: 'nav-producto' },
  { label: 'Cómo funciona', href: '#como-funciona', key: 'nav-como-funciona' },
  { label: 'Nosotros', href: '#nosotros', key: 'nav-nosotros' },
  { label: 'Contacto', href: '#contacto', key: 'nav-contacto' },
];

export default function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['producto', 'como-funciona', 'nosotros', 'contacto'];
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-card border-b border-border'
            : 'bg-black/30 backdrop-blur-md'
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <AppLogo size={36} />
            <span className={`font-display text-xl font-700 tracking-tight transition-colors duration-200 ${
              scrolled ? 'text-foreground group-hover:text-primary' : 'text-white group-hover:text-white/80'
            }`}>
              SeñasIA
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={link.key}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-4 py-2 text-sm font-500 rounded-lg transition-all duration-200 ${
                    scrolled
                      ? isActive
                        ? 'text-primary bg-violet-50'
                        : 'text-muted-foreground hover:text-foreground hover:bg-slate-50'
                      : isActive
                        ? 'text-white bg-white/20' :'text-white/85 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className={`block h-0.5 mt-0.5 rounded-full ${scrolled ? 'bg-primary' : 'bg-white'}`} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Login icon */}
          <div className="flex items-center gap-3">
            <Link
              href="/sign-up-login-screen"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-white hover:bg-teal-700 transition-all duration-200 hover:shadow-teal hover:scale-105 active:scale-95"
              aria-label="Iniciar sesión"
            >
              <LogIn size={18} strokeWidth={2} />
            </Link>

            {/* Mobile hamburger */}
            <button
              className={`md:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${
                scrolled ? 'hover:bg-slate-100 text-foreground' : 'hover:bg-white/10 text-white'
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menú"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed top-16 left-0 right-0 z-40 bg-white border-b border-border shadow-card transition-all duration-300 md:hidden ${
          mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={`mobile-${link.key}`}
              onClick={() => handleNavClick(link.href)}
              className="text-left px-4 py-3 text-sm font-500 text-muted-foreground hover:text-primary hover:bg-violet-50 rounded-lg transition-all duration-200"
            >
              {link.label}
            </button>
          ))}
          <Link
            href="/sign-up-login-screen"
            className="mt-2 flex items-center gap-2 px-4 py-3 text-sm font-600 text-white rounded-lg btn-primary text-center justify-center"
            onClick={() => setMobileOpen(false)}
          >
            <LogIn size={16} />
            Iniciar sesión
          </Link>
        </div>
      </div>
    </>
  );
}