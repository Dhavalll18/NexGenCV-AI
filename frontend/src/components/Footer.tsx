import React from 'react';
import { ShieldCheck } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#050505] py-8 px-4 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
        
        <Logo size="sm" />

        <div className="flex items-center gap-4 text-zinc-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            100% In-Memory Processing
          </span>
          <span>•</span>
          <span>Privacy Guaranteed</span>
        </div>

      </div>
    </footer>
  );
}
