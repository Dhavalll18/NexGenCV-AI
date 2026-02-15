'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import UploadSection from '@/components/UploadSection';
import ResultsDashboard from '@/components/ResultsDashboard';
import ContactSection from '@/components/ContactSection';
import PrivacyBanner from '@/components/PrivacyBanner';
import Footer from '@/components/Footer';
import LoadingOverlay from '@/components/LoadingOverlay';
import WakeUpScreen from '@/components/WakeUpScreen';
import BackendStatusBanner from '@/components/BackendStatusBanner';
import { AnalysisResult } from '@/types';

export default function Home() {
  const [isVerified, setIsVerified] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check if user already verified in this session
  useEffect(() => {
    const verified = sessionStorage.getItem('backend_verified');
    if (verified === 'true') {
      setIsVerified(true);
    }
  }, []);

  const handleVerified = () => {
    setIsVerified(true);
    sessionStorage.setItem('backend_verified', 'true');
  };

  const handleAnalyze = async (file: File) => {
    setIsAnalyzing(true);
    setError(null);
    setResults(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to analyze resume');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
  };

  return (
    <main className="min-h-screen">
      {/* Verification gate — wakes up the backend */}
      {!isVerified && <WakeUpScreen onVerified={handleVerified} />}

      <Header />
      <BackendStatusBanner />
      
      {isAnalyzing && <LoadingOverlay />}
      
      {results ? (
        <ResultsDashboard results={results} onReset={handleReset} />
      ) : (
        <>
          <Hero />
          <UploadSection onAnalyze={handleAnalyze} error={error} />
          <HowItWorks />
          <Features />
          <PrivacyBanner />
          <ContactSection />
        </>
      )}
      
      <Footer />
    </main>
  );
}
