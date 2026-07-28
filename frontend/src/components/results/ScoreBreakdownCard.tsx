'use client';

import React from 'react';
import { ScoreBreakdown } from '@/types';
import { Target, Layers, FileCode, Award, Briefcase, Rocket } from 'lucide-react';

interface ScoreBreakdownCardProps {
  breakdown: ScoreBreakdown;
}

export default function ScoreBreakdownCard({ breakdown }: ScoreBreakdownCardProps) {
  const metrics = [
    { label: 'Keyword Match', score: breakdown.keyword_relevance, weight: '20%', icon: Target },
    { label: 'Section Structure', score: breakdown.section_completeness, weight: '20%', icon: Layers },
    { label: 'Formatting Quality', score: breakdown.formatting_score, weight: '15%', icon: FileCode },
    { label: 'Skill Coverage', score: breakdown.skill_relevance, weight: '20%', icon: Award },
    { label: 'Experience Impact', score: breakdown.experience_clarity, weight: '15%', icon: Briefcase },
    { label: 'Project Portfolio', score: breakdown.project_impact, weight: '10%', icon: Rocket },
  ];

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Layers className="w-5 h-5 text-[#FF2D55]" />
        Score Breakdown
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {metrics.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-white/[0.02] border border-white/[0.06] p-3.5 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-300 font-medium flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-zinc-400" />
                  {item.label}
                </span>
                <span className="font-mono text-zinc-400">{item.score}/100 ({item.weight})</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-[#FF2D55] to-emerald-400"
                  style={{ width: `${item.score}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
