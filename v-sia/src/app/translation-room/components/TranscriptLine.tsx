'use client';

import React from 'react';
import type { TranscriptEntry } from './TranslationRoomLayout';

interface TranscriptLineProps {
  entry: TranscriptEntry;
  isLatest: boolean;
}

function getConfidenceColor(confidence: number): string {
  if (confidence >= 93) return 'text-emerald-400';
  if (confidence >= 85) return 'text-blue-400';
  return 'text-amber-400';
}

export default function TranscriptLine({ entry, isLatest }: TranscriptLineProps) {
  return (
    <div
      className={`transcript-line-enter flex items-baseline justify-between py-2.5 border-b border-slate-800/60 last:border-b-0 group ${
        isLatest ? 'bg-primary/5 -mx-2 px-2 rounded-lg' : ''
      }`}
    >
      {/* Left: timestamp + word */}
      <div className="flex items-baseline gap-3 flex-1 min-w-0">
        <span className="text-slate-600 text-xs font-mono flex-shrink-0 tabular-nums">
          {entry.timestamp}
        </span>
        <span className={`text-sm font-700 tracking-wide truncate ${
          isLatest ? 'text-white' : 'text-slate-200'
        }`}>
          {entry.word}
        </span>
      </div>

      {/* Right: confidence */}
      <div className="flex items-center gap-1.5 flex-shrink-0 ml-3">
        <span className={`text-xs font-600 tabular-nums ${getConfidenceColor(entry.confidence)}`}>
          {entry.confidence}%
        </span>
        {isLatest && (
          <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-dot" />
        )}
      </div>
    </div>
  );
}