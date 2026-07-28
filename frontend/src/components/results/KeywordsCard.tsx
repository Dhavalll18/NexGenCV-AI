'use client';

import React from 'react';
import { KeywordsAnalysis } from '@/types';
import { KeyRound, CheckCircle, XCircle } from 'lucide-react';

interface KeywordsCardProps {
  keywords: KeywordsAnalysis;
}

export default function KeywordsCard({ keywords }: KeywordsCardProps) {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-[#FF2D55]" />
          Industry Keyword Density
        </h3>
        <span className="text-xs font-mono text-zinc-400">
          Match Ratio: {keywords?.match_percentage || 0}%
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Present Keywords */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            Detected Keywords ({keywords?.found_keywords?.length || 0})
          </span>
          <div className="flex flex-wrap gap-1.5">
            {(keywords?.found_keywords || []).map((word, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-mono"
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Missing Keywords */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-red-400 flex items-center gap-1.5">
            <XCircle className="w-3.5 h-3.5" />
            Missing Recommended Keywords ({keywords?.missing_keywords?.length || 0})
          </span>
          <div className="flex flex-wrap gap-1.5">
            {(keywords?.missing_keywords || []).map((word, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-[#FF2D55]/10 border border-[#FF2D55]/20 text-xs text-red-300 font-mono"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
