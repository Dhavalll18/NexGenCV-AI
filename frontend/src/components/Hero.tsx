'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Cpu, Target, FileText, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  const targetAudience = [
    { label: 'Students', desc: 'Entry-level optimization' },
    { label: 'Developers', desc: 'Tech stack matrix' },
    { label: 'Job Seekers', desc: 'ATS pass rate' },
    { label: 'Recruiters', desc: 'Screening insights' },
  ];

  return (
    <div className="relative pt-12 pb-8 sm:pt-16 sm:pb-12 text-center px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-6"
      >
        {/* Top Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#121218] via-[#1a1a24] to-[#121218] border border-[#FF2D55]/30 text-xs font-mono text-white shadow-[0_0_15px_rgba(255,45,85,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-[#FF2D55]" />
          <span>Next-Generation Resume Intelligence & ATS Scoring</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
          Engineered for <br className="hidden sm:inline" />
          <span className="gradient-accent-text">Maximum Recruiter Impact</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed">
          Upload your resume to calculate instant ATS compatibility, identify critical missing skills, analyze keyword density, and generate recruiter-grade reports.
        </p>

        {/* Target Users Pill Chips */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {targetAudience.map((item, idx) => (
            <div 
              key={idx}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-zinc-300 font-medium hover:border-[#FF2D55]/40 transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#FF2D55]" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
