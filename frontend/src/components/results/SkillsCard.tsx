'use client';

import React from 'react';
import { SkillsData } from '@/types';
import { Award, AlertTriangle, CheckCircle2, Code2, Wrench, Database, Cpu, MessageSquare } from 'lucide-react';

interface SkillsCardProps {
  skills: SkillsData;
}

export default function SkillsCard({ skills }: SkillsCardProps) {
  const categories = [
    { title: 'Languages', items: skills.programming_languages, icon: Code2, color: 'text-blue-400' },
    { title: 'Frameworks', items: skills.frameworks, icon: Cpu, color: 'text-purple-400' },
    { title: 'Tools & Cloud', items: skills.tools, icon: Wrench, color: 'text-amber-400' },
    { title: 'Databases', items: skills.databases, icon: Database, color: 'text-emerald-400' },
    { title: 'Soft Skills', items: skills.soft_skills, icon: MessageSquare, color: 'text-pink-400' },
  ];

  return (
    <div className="glass-card p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-[#FF2D55]" />
          Skill Matrix & Gap Analysis
        </h3>
        <span className="text-xs font-mono text-zinc-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
          Total Skills Detected: {skills.total_count || 0}
        </span>
      </div>

      {/* Detected Skills Categories */}
      <div className="space-y-4">
        {categories.map((cat, idx) => {
          if (!cat.items || cat.items.length === 0) return null;
          const Icon = cat.icon;
          return (
            <div key={idx} className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                <Icon className={`w-3.5 h-3.5 ${cat.color}`} />
                <span>{cat.title} ({cat.items.length})</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-zinc-200 font-mono hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Missing Skills Section */}
      {skills.missing_skills && skills.missing_skills.length > 0 && (
        <div className="pt-4 border-t border-white/[0.08] space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-red-400">
            <AlertTriangle className="w-4 h-4 text-[#FF2D55]" />
            <span>Missing Industry Skills (Recommended Additions)</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.missing_skills.map((item, mIdx) => (
              <span
                key={mIdx}
                className="px-3 py-1 rounded-lg bg-[#FF2D55]/10 border border-[#FF2D55]/30 text-xs text-red-300 font-mono flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D55]" />
                {item.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
