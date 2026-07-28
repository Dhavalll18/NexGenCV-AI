'use client';

import React from 'react';
import { ATSIssue } from '@/types';
import { AlertCircle, AlertOctagon, Info } from 'lucide-react';

interface IssuesCardProps {
  issues: ATSIssue[];
}

export default function IssuesCard({ issues }: IssuesCardProps) {
  const getSeverityBadge = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical':
      case 'high':
        return { icon: AlertOctagon, color: 'text-red-400 bg-red-500/10 border-red-500/30' };
      case 'warning':
      case 'medium':
        return { icon: AlertCircle, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
      default:
        return { icon: Info, color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' };
    }
  };

  return (
    <div className="glass-card p-6 space-y-4">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-[#FF2D55]" />
        ATS Compliance Warnings & Format Errors ({issues.length})
      </h3>

      <div className="space-y-3">
        {issues.map((issue, idx) => {
          const badge = getSeverityBadge(issue.severity);
          const Icon = badge.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-3"
            >
              <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${badge.color.split(' ')[0]}`} />
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-zinc-400">
                    {issue.category}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${badge.color}`}>
                    {issue.severity}
                  </span>
                </div>
                <p className="text-xs text-zinc-200 leading-relaxed font-medium">
                  {issue.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
