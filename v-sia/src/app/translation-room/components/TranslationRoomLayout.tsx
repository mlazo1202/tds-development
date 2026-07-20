'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import TranslationRoomHeader from './TranslationRoomHeader';
import VideoArea from './VideoArea';
import TranscriptPanel from './TranscriptPanel';

export interface TranscriptEntry {
  id: string;
  word: string;
  timestamp: string;
  confidence: number;
}

type SessionState = 'idle' | 'active' | 'ended';


const MOCK_SIGNS: string[] = [
  'HOLA', 'BUENOS DÍAS', 'ME LLAMO', 'LUCÍA', 'NECESITO', 'AYUDA',
  'GRACIAS', 'POR FAVOR', 'SÍ', 'NO', 'ENTIENDO', 'REPITE',
  'DESPACIO', 'AGUA', 'COMIDA', 'CASA', 'FAMILIA', 'AMIGO',
  'TRABAJO', 'ESCUELA', 'DOCTOR', 'HOSPITAL', 'URGENTE', 'BIEN',
];

function formatTimestamp(date: Date): string {
  const h = date.getHours().toString().padStart(2, '0');
  const m = date.getMinutes().toString().padStart(2, '0');
  const s = date.getSeconds().toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export default function TranslationRoomLayout() {
  const [sessionState, setSessionState] = useState<SessionState>('idle');
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [signIndex, setSignIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const entryCounter = useRef(0);

  
  const addTranscriptEntry = useCallback((word: string) => {
    entryCounter.current += 1;
    const id = `transcript-${entryCounter.current}-${Date.now()}`;
    const now = new Date();
    const entry: TranscriptEntry = {
      id,
      word,
      timestamp: formatTimestamp(now),
      confidence: 88 + Math.floor(signIndex % 3) * 3,
    };
    setTranscript((prev) => [...prev, entry]);
  }, [signIndex]);

  useEffect(() => {
    if (sessionState === 'active') {
      
      intervalRef.current = setInterval(() => {
        const word = MOCK_SIGNS[signIndex % MOCK_SIGNS.length];
        addTranscriptEntry(word);
        setSignIndex((i) => i + 1);
      }, 1800);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [sessionState, signIndex, addTranscriptEntry]);

  const handleStartSession = () => {
    setSessionState('active');
    setTranscript([]);
    setSignIndex(0);
    entryCounter.current = 0;
  };

  const handleEndSession = () => {
    setSessionState('ended');
  };

  const handleNewSession = () => {
    setSessionState('idle');
    setTranscript([]);
    setSignIndex(0);
    entryCounter.current = 0;
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <TranslationRoomHeader sessionState={sessionState} />

      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 lg:p-6 max-w-screen-2xl mx-auto w-full">
        {/* Video area — 65% */}
        <div className="w-full lg:flex-[65]">
          <VideoArea
            sessionState={sessionState}
            onStart={handleStartSession}
            onEnd={handleEndSession}
            onNewSession={handleNewSession}
          />
        </div>

        {/* Transcript panel — 35% */}
        <div className="w-full lg:flex-[35] lg:min-w-[320px] lg:max-w-[480px]">
          <TranscriptPanel
            sessionState={sessionState}
            transcript={transcript}
          />
        </div>
      </div>
    </div>
  );
}