'use client';

import React, { useState, useEffect } from 'react';
import { Play, X, RefreshCw, Camera, Radio } from 'lucide-react';
import AppImage from '@/components/ui/AppImage';

interface VideoAreaProps {
  sessionState: 'idle' | 'active' | 'ended';
  onStart: () => void;
  onEnd: () => void;
  onNewSession: () => void;
}

export default function VideoArea({ sessionState, onStart, onEnd, onNewSession }: VideoAreaProps) {
  const [initializing, setInitializing] = useState(false);

  const handleStart = () => {
    setInitializing(true);
    setTimeout(() => {
      setInitializing(false);
      onStart();
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Video card */}
      <div className="relative bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl"
      style={{ aspectRatio: '16/9', minHeight: '300px' }}>
        
        {/* IDLE state */}
        {sessionState === 'idle' && !initializing &&
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
            {/* Background hint */}
            <div className="absolute inset-0 opacity-10">
              <AppImage
              src="https://images.unsplash.com/photo-1704282610652-0c8a44a2bf20"
              alt="Fondo difuminado de persona haciendo señas"
              fill
              className="object-cover blur-sm"
              sizes="(max-width: 1024px) 100vw, 65vw" />
            
            </div>

            <div className="relative z-10 flex flex-col items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                <Camera size={32} strokeWidth={1.5} className="text-slate-400" />
              </div>
              <div className="text-center">
                <p className="text-white font-600 text-lg mb-1.5">Cámara desactivada</p>
                <p className="text-slate-400 text-sm font-400 max-w-xs text-center">
                  Activa tu cámara para comenzar la detección de señas en tiempo real
                </p>
              </div>

              <button
              onClick={handleStart}
              className="flex flex-col items-center gap-3 group"
              aria-label="Iniciar cámara">
              
                <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center shadow-violet group-hover:scale-105 group-hover:shadow-[0_12px_40px_rgba(124,58,237,0.5)] active:scale-95 transition-all duration-200">
                  <Play size={28} fill="white" strokeWidth={0} className="ml-1" />
                </div>
                <span className="text-white/70 text-sm font-500 group-hover:text-white transition-colors">
                  Iniciar cámara
                </span>
              </button>
            </div>
          </div>
        }

        {/* INITIALIZING state */}
        {initializing &&
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-950">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
              <Camera size={20} strokeWidth={1.5} className="text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <p className="text-slate-300 text-sm font-500">Activando cámara...</p>
            <p className="text-slate-500 text-xs font-400">Verificando permisos del dispositivo</p>
          </div>
        }

        {/* ACTIVE state */}
        {sessionState === 'active' &&
        <>
            {/* Simulated camera feed */}
            <div className="absolute inset-0">
              <AppImage
              src="http://localhost:5000/video_feed"
              alt="Vista principal"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 65vw" />
            
              <div className="absolute inset-0 bg-slate-950/30" />
            </div>

            {/* Top badges */}
            <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
              <div className="badge-active">
                <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
                Detección activa
              </div>

              <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-full px-3 py-1.5">
                <Radio size={12} strokeWidth={2} className="text-primary" />
                <span className="text-white text-xs font-600">EN VIVO</span>
              </div>
            </div>

            {/* Corner scan animation */}
            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="absolute top-12 left-8 w-12 h-12 border-t-2 border-l-2 border-primary/70 rounded-tl-lg" />
              <div className="absolute top-12 right-8 w-12 h-12 border-t-2 border-r-2 border-primary/70 rounded-tr-lg" />
              <div className="absolute bottom-16 left-8 w-12 h-12 border-b-2 border-l-2 border-primary/70 rounded-bl-lg" />
              <div className="absolute bottom-16 right-8 w-12 h-12 border-b-2 border-r-2 border-primary/70 rounded-br-lg" />
            </div>

            {/* Stop button */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10">
              <button
              onClick={onEnd}
              className="flex flex-col items-center gap-2 group"
              aria-label="Detener sesión">
              
                <div className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 border-4 border-red-400/40 flex items-center justify-center transition-all duration-200 group-hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(239,68,68,0.4)]">
                  <X size={22} strokeWidth={2.5} className="text-white" />
                </div>
                <span className="text-white/60 text-xs font-500 group-hover:text-white/90 transition-colors">
                  Detener
                </span>
              </button>
            </div>
          </>
        }

        {/* ENDED state */}
        {sessionState === 'ended' &&
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-slate-950">
            <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
              <Camera size={26} strokeWidth={1.5} className="text-slate-500" />
            </div>
            <div className="text-center">
              <p className="text-white font-600 text-lg mb-1.5">Sesión finalizada</p>
              <p className="text-slate-400 text-sm font-400 max-w-xs">
                Tu transcripción ha quedado guardada en el panel. Puedes iniciar una nueva sesión cuando quieras.
              </p>
            </div>
            <button
            onClick={onNewSession}
            className="flex items-center gap-2 btn-primary px-6 py-3 text-sm font-600 rounded-xl">
            
              <RefreshCw size={15} strokeWidth={2} />
              Nueva sesión
            </button>
          </div>
        }
      </div>

      {/* Info bar below video */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${
            sessionState === 'active' ? 'bg-emerald-400 pulse-dot' :
            sessionState === 'ended' ? 'bg-amber-400' : 'bg-slate-600'}`
            } />
            <span className="text-slate-400 text-xs font-500">
              {sessionState === 'active' ? 'Cámara activa' :
              sessionState === 'ended' ? 'Cámara detenida' : 'Cámara inactiva'}
            </span>
          </div>
          <span className="text-slate-600 text-xs">·</span>
          <span className="text-slate-500 text-xs font-400">Latencia &lt;300ms</span>
        </div>
        <span className="text-slate-600 text-xs font-400">SeñasIA v2.1</span>
      </div>
    </div>);

}