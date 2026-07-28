import { AnalysisResult } from '@/types';

/**
 * Service module for handling all NexGenCV AI backend API interactions.
 * Kept clean, robust, and production-grade for interview explainability.
 */
export async function analyzeResume(file: File): Promise<AnalysisResult> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/analyze', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Analysis failed' }));
    throw new Error(errorData.detail || 'Failed to process resume');
  }

  return response.json();
}

export async function downloadReport(data: AnalysisResult): Promise<void> {
  const response = await fetch('/api/download-report', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to generate PDF report');
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `NexGenCV-Analysis-Report-${Date.now()}.pdf`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
