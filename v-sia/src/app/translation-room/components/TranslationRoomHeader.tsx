'use client';

import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { Radio, User, Settings, LogOut } from 'lucide-react';

interface TranslationRoomHeaderProps {
  sessionState: 'idle' | 'active' | 'ended';
}

export default function TranslationRoomHeader({ sessionState }: TranslationRoomHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 lg:px-6 h-14 bg-slate-900 border-b border-slate-800 flex-shrink-0">
      {/* Left: Logo */}
      <Link href="/" className="flex items-center gap-2.5 group">
        <AppLogo size={30} />
        <span className="font-display text-base font-700 text-white tracking-tight group-hover:text-primary transition-colors">
          SeñasIA
        </span>
      </Link>

      {/* Center: Session status */}
      <div className="flex items-center gap-2">
        {sessionState === 'active' && (
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 rounded-full px-3 py-1">
            <Radio size={13} strokeWidth={2} className="text-emerald-400" />
            <span className="text-emerald-400 text-xs font-600 tracking-wide">Sesión activa</span>
          </div>
        )}
        {sessionState === 'idle' && (
          <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-full px-3 py-1">
            <span className="w-2 h-2 rounded-full bg-slate-500" />
            <span className="text-slate-400 text-xs font-500">Sin sesión</span>
          </div>
        )}
        {sessionState === 'ended' && (
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/25 rounded-full px-3 py-1">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-amber-400 text-xs font-500">Sesión finalizada</span>
          </div>
        )}
      </div>

      {/* Right: User actions */}
      <div className="flex items-center gap-2">
        {/* <button
          className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200"
          aria-label="Configuración"
        >
          <Settings size={16} strokeWidth={1.5} />
        </button> */}
        {/* <button
          className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200"
          aria-label="Perfil de usuario"
        >
          <User size={16} strokeWidth={1.5} />
        </button> */}
        <Link
          href="/"
          className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
          aria-label="Cerrar sesión"
        >
          <LogOut size={16} strokeWidth={1.5} />
        </Link>
      </div>
    </header>
  );
}