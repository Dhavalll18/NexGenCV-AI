'use client';

import React from 'react';
import { ExperienceSummary } from '@/types';
import { Briefcase, Check, X } from 'lucide-react';

interface ExperienceCardProps {
  experience: ExperienceSummary;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  const metrics = [
    { label: 'Action Verbs Usage', value: experience?.action_verb_count || 0, check: (experience?.action_verb_count || 0) >= 5 },
    { label: 'Quantified Impact Metrics', value: experience?.metrics_count || 0, check: (experience?.metrics_count || 0) >= 3 },
    { label: 'Identified Work Roles', value: experience?.total_roles || 0, check: (experience?.total_roles || 0) > 0 },
  ];

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-[#FF2D55]" />
        Work Experience Analysis
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {metrics.map((item, idx) => (
          <div key={idx} className="bg-white/[0.02] border border-white/[0.06] p-3.5 rounded-xl space-y-1">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>{item.label}</span>
              {item.check ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-amber-400" />}
            </div>
            <p className="text-xl font-bold text-white">{item.value}</p>
          </div>
        ))}
      </div>

      {experience?.summary && (
        <p className="text-xs text-zinc-400 leading-relaxed bg-white/[0.02] p-3.5 rounded-xl border border-white/[0.06]">
          {experience.summary}
        </p>
      )}
    </div>
  );
}
