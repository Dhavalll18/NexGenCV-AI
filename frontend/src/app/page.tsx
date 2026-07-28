'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import UploadSection from '@/components/UploadSection';
import ResultsDashboard from '@/components/ResultsDashboard';
import LoadingOverlay from '@/components/LoadingOverlay';
import Footer from '@/components/Footer';
import { analyzeResume } from '@/services/api';
import { AnalysisResult } from '@/types';

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (file: File) => {
    setIsAnalyzing(true);
    setError(null);
    setResults(null);

    try {
      const data = await analyzeResume(file);
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
  };

  return (
    <main className="min-h-screen flex flex-col justify-between relative bg-[#050505]">
      <Header onReset={handleReset} isAnalyzing={isAnalyzing} />

      {isAnalyzing && <LoadingOverlay />}

      <div className="flex-grow">
        {results ? (
          <ResultsDashboard results={results} onReset={handleReset} />
        ) : (
          <>
            <Hero />
            <UploadSection onAnalyze={handleAnalyze} error={error} />
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}
