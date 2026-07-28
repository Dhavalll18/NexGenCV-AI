import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NexGenCV AI — AI Powered Resume Intelligence Platform',
  description: 'Analyze your resume with precision AI, calculate real-time ATS compatibility scores, identify critical missing skills, and unlock actionable recruiter insights.',
  keywords: 'NexGenCV AI, ATS score checker, resume intelligence, resume scanner, career tech, skill gap analysis',
  metadataBase: new URL('https://nexgencv-ai.com'),
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'NexGenCV AI — AI Powered Resume Intelligence Platform',
    description: 'Precision resume analysis, ATS scoring, and recruiter-level optimization.',
    type: 'website',
    siteName: 'NexGenCV AI',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <meta name="theme-color" content="#050505" />
      </head>
      <body className="min-h-screen bg-[#050505] text-white selection:bg-[#FF2D55] selection:text-white antialiased">
        <div className="ambient-glow" />
        {children}
      </body>
    </html>
  );
}
