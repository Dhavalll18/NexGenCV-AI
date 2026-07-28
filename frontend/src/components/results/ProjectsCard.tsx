'use client';

import React from 'react';
import { Project } from '@/types';
import { Rocket, Code } from 'lucide-react';

interface ProjectsCardProps {
  projects: Project[];
}

export default function ProjectsCard({ projects }: ProjectsCardProps) {
  if (!projects || projects.length === 0) {
    return (
      <div className="glass-card p-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
          <Rocket className="w-5 h-5 text-[#FF2D55]" />
          Project Portfolio
        </h3>
        <p className="text-xs text-zinc-400">No structured project section detected in resume.</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <Rocket className="w-5 h-5 text-[#FF2D55]" />
        Project Portfolio ({projects.length})
      </h3>

      <div className="space-y-3">
        {projects.map((proj, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">{proj.title || `Project ${idx + 1}`}</span>
            </div>
            {proj.description && (
              <p className="text-xs text-zinc-400 leading-relaxed">{proj.description}</p>
            )}
            {proj.technologies && proj.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {proj.technologies.map((tech, tIdx) => (
                  <span key={tIdx} className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-zinc-300 font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
