'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Captions, Copy, Download, FileText } from 'lucide-react';
import { toast } from 'sonner';
import TranscriptLine from './TranscriptLine';
import type { TranscriptEntry } from './TranslationRoomLayout';

interface TranscriptPanelProps {
  sessionState: 'idle' | 'active' | 'ended';
  transcript: TranscriptEntry[];
}

export default function TranscriptPanel({ sessionState, transcript }: TranscriptPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript]);

  const handleCopy = () => {
    if (transcript.length === 0) return;
    const text = transcript.map((e) => `[${e.timestamp}] ${e.letter}`).join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success('Transcripción copiada al portapapeles');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    if (transcript.length === 0) return;
    const text = transcript.map((e) => `[${e.timestamp}] ${e.letter}`).join('\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `senasia-transcripcion-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Transcripción descargada');
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl"
      style={{ minHeight: '300px' }}
    >
      {/* Panel header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
            <Captions size={16} strokeWidth={1.5} className="text-primary" />
          </div>
          <div>
            <h2 className="text-white text-sm font-700">Traducción en vivo</h2>
            <p className="text-slate-500 text-xs font-400">
              {transcript.length > 0 ? `${transcript.length} señas detectadas` : 'Sin detecciones aún'}
            </p>
          </div>
        </div>

        {/* Actions */}
        {transcript.length > 0 && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopy}
              className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200"
              aria-label="Copiar transcripción"
              title="Copiar transcripción"
            >
              {copied ? (
                <span className="text-emerald-400 text-xs font-600">✓</span>
              ) : (
                <Copy size={14} strokeWidth={1.5} />
              )}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200"
              aria-label="Descargar transcripción"
              title="Descargar como .txt"
            >
              <Download size={14} strokeWidth={1.5} />
            </button>
          </div>
        )}
      </div>

      {/* Transcript content */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-5 py-4 scrollbar-hide"
      >
        {transcript.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center h-full gap-4 py-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center">
              <FileText size={24} strokeWidth={1.5} className="text-slate-500" />
            </div>
            <div>
              <p className="text-slate-300 text-sm font-600 mb-1.5">
                {sessionState === 'idle' ?'Aquí aparecerá el texto de tus señas'
                  : sessionState === 'active' ?'Detectando señas...' :'Sin señas detectadas en esta sesión'}
              </p>
              <p className="text-slate-500 text-xs font-400 max-w-[200px] leading-relaxed">
                {sessionState === 'idle' ?'Activa la cámara para comenzar la transcripción automática'
                  : sessionState === 'active' ?'Realiza señas frente a la cámara para ver la transcripción' :'Inicia una nueva sesión para comenzar'}
              </p>
            </div>
            {sessionState === 'active' && (
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <div
                    key={`loading-dot-${i}`}
                    className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col">
            {transcript.map((entry, index) => (
              <TranscriptLine
                key={entry.id}
                entry={entry}
                isLatest={index === transcript.length - 1}
              />
            ))}

            {/* Active detection indicator */}
            {sessionState === 'active' && (
              <div className="flex items-center gap-2 py-3 px-1">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={`typing-dot-${i}`}
                      className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
                <span className="text-slate-600 text-xs font-400">Analizando...</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-slate-800 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${
            sessionState === 'active' ? 'bg-emerald-400 pulse-dot' : 'bg-slate-600'
          }`} />
          <span className="text-slate-500 text-xs font-400">
            {sessionState === 'active' ? 'Escuchando señas' : 'En pausa'}
          </span>
        </div>
        <span className="text-slate-600 text-xs font-400 font-mono">LSP · v2.1</span>
      </div>
    </div>
  );
}