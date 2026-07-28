'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ScoreCircleProps {
  score: number;
  category: string;
}

export default function ScoreCircle({ score, category }: ScoreCircleProps) {
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = () => {
    if (score >= 80) return '#10B981'; // Emerald
    if (score >= 60) return '#F59E0B'; // Amber
    return '#FF2D55'; // Crimson
  };

  const color = getScoreColor();

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="relative w-44 h-44 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
          {/* Background Ring */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="12"
            fill="transparent"
          />
          {/* Progress Ring */}
          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            stroke={color}
            strokeWidth="12"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-extrabold text-white tracking-tight">
            {score}
          </span>
          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest mt-0.5">
            / 100 ATS Score
          </span>
        </div>
      </div>

      {/* Category Pill */}
      <div 
        className="mt-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase border"
        style={{
          color,
          borderColor: `${color}40`,
          backgroundColor: `${color}15`,
        }}
      >
        {category}
      </div>
    </div>
  );
}
