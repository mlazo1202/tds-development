'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import TranslationRoomHeader from './TranslationRoomHeader';
import VideoArea from './VideoArea';
import TranscriptPanel from './TranscriptPanel';

export interface TranscriptEntry {
  id: string;
  letter: string;
  timestamp: string;
  confidence: number;
}

type SessionState = 'idle' | 'active' | 'ended';

function formatTimestamp(date: Date): string {
  const h = date.getHours().toString().padStart(2, '0');
  const m = date.getMinutes().toString().padStart(2, '0');
  const s = date.getSeconds().toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export default function TranslationRoomLayout() {
  const [sessionState, setSessionState] = useState<SessionState>('idle');
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const entryCounter = useRef(0);
  const lastLetter = useRef("");

  
  const addTranscriptEntry = useCallback(
  (letter: string, confidence: number) => {
      entryCounter.current++;

      const entry: TranscriptEntry = {
          id: `transcript-${entryCounter.current}`,
          letter,
          timestamp: formatTimestamp(new Date()),
          confidence
      };
      
      setTranscript(prev => [...prev, entry]);
  }, []);

  useEffect(() => {
      if (sessionState !== "active") return;

      intervalRef.current = setInterval(async () => {
          try {
              const response = await fetch("http://localhost:5000/prediction");
              const data = await response.json();
              if (
                  data.letter &&
                  data.letter !== lastLetter.current
              ) {
                  lastLetter.current = data.letter;
                  addTranscriptEntry(
                      data.letter,
                      Math.round(data.confidence * 100)
                  );
              }
          } catch (err) {
              console.error(err);
          }
      }, 300);

      return () => {
          if(intervalRef.current){
              clearInterval(intervalRef.current);
          }
      };
  }, [sessionState, addTranscriptEntry]);

  const handleStartSession = () => {
    setSessionState('active');
    setTranscript([]);
    entryCounter.current = 0;
  };

  const handleEndSession = () => {
    setSessionState('ended');
  };

  const handleNewSession = () => {
    setSessionState('idle');
    setTranscript([]);
    entryCounter.current = 0;
  };

  return (
    <div className="h-screen bg-slate-950 flex flex-col overflow-hidden">
      <TranslationRoomHeader sessionState={sessionState} />

      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4 p-4 lg:p-6 max-w-screen-2xl mx-auto w-full">
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
        <div className="w-full lg:flex-[35] lg:min-w-[320px] lg:max-w-[480px] min-h-0">
          <TranscriptPanel
            sessionState={sessionState}
            transcript={transcript}
          />
        </div>
      </div>
    </div>
  );
}