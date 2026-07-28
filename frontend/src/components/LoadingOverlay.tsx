'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

export default function LoadingOverlay() {
  const steps = [
    'Parsing PDF/DOCX structure & text tokens...',
    'Extracting technical skill matrix & domain keywords...',
    'Classifying industry domain & candidate profile...',
    'Calculating multi-weighted ATS compatibility score...',
    'Generating actionable AI suggestions & PDF report...',
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1200);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]/90 backdrop-blur-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card max-w-md w-full p-8 text-center relative overflow-hidden border border-[#FF2D55]/30 shadow-[0_0_50px_rgba(255,45,85,0.2)]"
      >
        {/* Glow Element */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#FF2D55]/20 blur-3xl rounded-full pointer-events-none" />

        {/* Central Pulse Icon */}
        <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-[#FF2D55]/20 animate-ping" />
          <div className="relative w-16 h-16 rounded-2xl bg-[#121218] border border-[#FF2D55]/50 flex items-center justify-center text-[#FF2D55] shadow-[0_0_25px_rgba(255,45,85,0.4)]">
            <Cpu className="w-8 h-8 animate-pulse" />
          </div>
        </div>

        {/* Header Text */}
        <h3 className="text-xl font-bold text-white tracking-tight mb-1">
          NexGenCV AI Engine
        </h3>
        <p className="text-xs text-zinc-400 mb-6 font-mono">
          Analyzing resume intelligence...
        </p>

        {/* Steps List */}
        <div className="space-y-2.5 text-left bg-black/40 p-4 rounded-xl border border-white/5">
          {steps.map((stepText, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;
            return (
              <div
                key={idx}
                className={`flex items-center gap-3 text-xs transition-colors duration-300 ${
                  isCompleted
                    ? 'text-zinc-400'
                    : isCurrent
                    ? 'text-white font-medium'
                    : 'text-zinc-600'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <Sparkles className="w-4 h-4 text-[#FF2D55] animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-zinc-700 shrink-0" />
                )}
                <span className="truncate">{stepText}</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
