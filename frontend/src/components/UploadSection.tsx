'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, AlertCircle, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface UploadSectionProps {
  onAnalyze: (file: File) => void;
  error?: string | null;
}

export default function UploadSection({ onAnalyze, error }: UploadSectionProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
  });

  const handleStartAnalysis = () => {
    if (selectedFile) {
      onAnalyze(selectedFile);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="glass-card p-6 sm:p-10 relative overflow-hidden"
      >
        {/* Ambient Top Glow inside Card */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#FF2D55]/15 blur-3xl rounded-full pointer-events-none" />

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Analysis Failed</p>
              <p className="text-red-300/80 text-xs mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Dropzone Container */}
        <div
          {...getRootProps()}
          className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 ${
            isDragActive
              ? 'border-[#FF2D55] bg-[#FF2D55]/10 scale-[1.01]'
              : isDragReject
              ? 'border-red-500 bg-red-500/10'
              : selectedFile
              ? 'border-emerald-500/40 bg-emerald-500/[0.03]'
              : 'border-white/10 hover:border-[#FF2D55]/50 bg-white/[0.01] hover:bg-white/[0.02]'
          }`}
        >
          <input {...getInputProps()} />

          <AnimatePresence mode="wait">
            {selectedFile ? (
              <motion.div
                key="file-selected"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-white font-medium text-base">{selectedFile.name}</p>
                  <p className="text-xs font-mono text-zinc-400 mt-1">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for Analysis
                  </p>
                </div>
                <span className="text-xs text-zinc-500 underline hover:text-zinc-300 mt-2">
                  Click or drag another file to replace
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="upload-prompt"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#FF2D55]/10 border border-[#FF2D55]/30 flex items-center justify-center text-[#FF2D55] group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-white font-semibold text-lg">
                    Drop your resume here, or <span className="text-[#FF2D55] underline">browse</span>
                  </p>
                  <p className="text-xs text-zinc-400">
                    Supports PDF or DOCX formats (Up to 5MB)
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Files processed securely in-memory & deleted instantly</span>
          </div>

          <button
            onClick={handleStartAnalysis}
            disabled={!selectedFile}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
              selectedFile
                ? 'bg-gradient-to-r from-[#FF2D55] to-[#FF5E7E] text-white shadow-[0_0_25px_rgba(255,45,85,0.4)] hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-white/5 text-zinc-500 cursor-not-allowed border border-white/5'
            }`}
          >
            <span>Analyze Resume</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
