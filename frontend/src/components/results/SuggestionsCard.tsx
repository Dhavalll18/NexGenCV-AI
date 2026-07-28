'use client';

import React from 'react';
import { Suggestion } from '@/types';
import { Sparkles, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface SuggestionsCardProps {
  suggestions: Suggestion[];
}

export default function SuggestionsCard({ suggestions }: SuggestionsCardProps) {
  const getPriorityStyle = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'text-[#FF2D55] bg-[#FF2D55]/10 border-[#FF2D55]/30';
      case 'medium':
        return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      default:
        return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    }
  };

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-[#FF2D55]" />
        AI Recommendations & Optimization Roadmap
      </h3>

      <div className="space-y-3">
        {suggestions.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-[#FF2D55]/30 transition-colors space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white flex items-center gap-2">
                <ArrowUpRight className="w-4 h-4 text-[#FF2D55]" />
                {item.title}
              </span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase border ${getPriorityStyle(item.priority)}`}>
                {item.priority} Priority
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed pl-6">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
