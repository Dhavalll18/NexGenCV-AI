'use client';

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const dimensions = {
    sm: { icon: 'w-7 h-7', text: 'text-base', badge: 'text-[9px] px-1 py-0.2' },
    md: { icon: 'w-9 h-9', text: 'text-lg', badge: 'text-xs px-1.5 py-0.5' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl', badge: 'text-xs px-2 py-0.5' },
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Sleek Futuristic Logo Icon */}
      <div className={`${dimensions.icon} rounded-xl bg-gradient-to-br from-[#161622] to-[#0A0A10] border border-[#FF2D55]/40 flex items-center justify-center shadow-[0_0_20px_rgba(255,45,85,0.25)] group-hover:border-[#FF2D55] group-hover:shadow-[0_0_30px_rgba(255,45,85,0.45)] transition-all duration-300 relative overflow-hidden shrink-0`}>
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF2D55]/20 to-transparent opacity-50 group-hover:opacity-80 transition-opacity" />
        
        {/* Futuristic N + Circuit Vector SVG */}
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 relative z-10">
          <path d="M9 27V9L21 27V9" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 9L27 15M27 15V27M27 15L21 21" stroke="#FF2D55" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="27" cy="15" r="2" fill="#FF2D55" />
          <circle cx="9" cy="9" r="1.5" fill="#FFFFFF" />
          <circle cx="21" cy="27" r="1.5" fill="#FFFFFF" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-extrabold tracking-tight text-white flex items-center gap-1.5 ${dimensions.text}`}>
            NexGenCV{' '}
            <span className={`text-[#FF2D55] font-mono font-semibold rounded bg-[#FF2D55]/10 border border-[#FF2D55]/30 shadow-[0_0_10px_rgba(255,45,85,0.2)] ${dimensions.badge}`}>
              AI
            </span>
          </span>
          <span className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase">
            Resume Intelligence Platform
          </span>
        </div>
      )}
    </div>
  );
}
