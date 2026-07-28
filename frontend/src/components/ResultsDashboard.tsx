'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AnalysisResult } from '@/types';
import { downloadReport } from '@/services/api';
import ScoreCircle from './results/ScoreCircle';
import ScoreBreakdownCard from './results/ScoreBreakdownCard';
import SkillsCard from './results/SkillsCard';
import ExperienceCard from './results/ExperienceCard';
import ProjectsCard from './results/ProjectsCard';
import KeywordsCard from './results/KeywordsCard';
import IssuesCard from './results/IssuesCard';
import SuggestionsCard from './results/SuggestionsCard';
import { 
  Download, 
  RotateCcw, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  CheckCircle2, 
  Cpu, 
  FileText 
} from 'lucide-react';

interface ResultsDashboardProps {
  results: AnalysisResult;
  onReset: () => void;
}

export default function ResultsDashboard({ results, onReset }: ResultsDashboardProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await downloadReport(results);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  const candidateName = results.candidate?.name || 'Candidate Resume';
  const primaryDomain = results.domain?.primary || 'General Professional';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"
    >
      {/* Top Banner & Candidate Summary */}
      <div className="glass-card p-6 sm:p-8 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#FF2D55]/10 border border-[#FF2D55]/30 text-xs font-mono text-[#FF2D55] font-medium flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              Domain: {primaryDomain}
            </span>
            {results.parsing_method && (
              <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-400">
                Parser: {results.parsing_method.toUpperCase()}
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {candidateName}
          </h2>

          {/* Contact Details */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 pt-1">
            {results.candidate?.email && (
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#FF2D55]" />
                {results.candidate.email}
              </span>
            )}
            {results.candidate?.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#FF2D55]" />
                {results.candidate.phone}
              </span>
            )}
            {results.candidate?.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FF2D55]" />
                {results.candidate.location}
              </span>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={onReset}
            className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-medium text-zinc-300 flex items-center justify-center gap-2 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Analyze New Resume</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF2D55] to-[#FF5E7E] text-xs font-semibold text-white shadow-[0_0_20px_rgba(255,45,85,0.4)] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isDownloading ? 'Generating PDF...' : 'Download Report'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: ATS Score & Score Breakdown */}
        <div className="space-y-6">
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4">
              Overall ATS Compatibility
            </h3>
            <ScoreCircle 
              score={results.ats_score} 
              category={results.score_category} 
            />
          </div>

          {results.score_breakdown && (
            <ScoreBreakdownCard breakdown={results.score_breakdown} />
          )}
        </div>

        {/* Middle & Right Column: Skills, Recommendations & Compliance Warnings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Skill Analysis & Missing Skills */}
          {results.skills && <SkillsCard skills={results.skills} />}

          {/* AI Suggestions */}
          {results.suggestions && results.suggestions.length > 0 && (
            <SuggestionsCard suggestions={results.suggestions} />
          )}

          {/* Keywords & ATS Warnings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.keywords_analysis && (
              <KeywordsCard keywords={results.keywords_analysis} />
            )}
            {results.issues && results.issues.length > 0 && (
              <IssuesCard issues={results.issues} />
            )}
          </div>

          {/* Work Experience & Projects */}
          {results.experience && <ExperienceCard experience={results.experience} />}
          {results.projects && <ProjectsCard projects={results.projects} />}
        </div>
      </div>
    </motion.div>
  );
}
