'use client';

import React from 'react';
import { Sparkles, ShieldCheck, Terminal } from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  onReset?: () => void;
  isAnalyzing?: boolean;
}

export default function Header({ onReset, isAnalyzing }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#050505]/70 border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Identity */}
        <div 
          onClick={onReset} 
          className="cursor-pointer group transition-transform active:scale-95"
        >
          <Logo size="md" />
        </div>

        {/* Right Status Badge */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI Engine Online</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF2D55]/10 border border-[#FF2D55]/20 text-xs text-[#FF2D55] font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Encrypted & Private</span>
          </div>
        </div>

      </div>
    </header>
  );
}
