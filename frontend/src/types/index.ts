export interface CandidateInfo {
  name: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  linkedin: string | null;
  github: string | null;
}

export interface MissingSkill {
  name: string;
  category?: string;
  priority?: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
  strength?: 'Strong' | 'Moderate' | 'Weak';
}

export interface SkillsData {
  programming_languages: string[];
  frameworks: string[];
  tools: string[];
  databases: string[];
  soft_skills: string[];
  other?: string[];
  total_count?: number;
  missing_skills?: MissingSkill[];
  skill_categories?: SkillCategory[];
}

export interface Project {
  title: string;
  technologies?: string[];
  description?: string | null;
  impact?: string | null;
  score?: number;
}

export interface Experience {
  company: string | null;
  role: string | null;
  duration: string | null;
  description: string | null;
  bullet_quality?: number;
  has_metrics?: boolean;
  action_verbs_count?: number;
}

export interface ExperienceSummary {
  total_years?: number;
  total_months?: number;
  positions?: Experience[];
  overall_quality?: number;
  action_verb_count?: number;
  metrics_count?: number;
  total_roles?: number;
  summary?: string;
}

export interface Education {
  degree: string | null;
  institution: string | null;
  year: string | null;
  gpa: string | null;
}

export interface DomainInfo {
  primary: string;
  confidence: number;
  secondary?: string | null;
  keywords_matched?: string[];
}

export interface ATSIssue {
  type?: string;
  category?: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | string;
  message?: string;
  description?: string;
  suggestion?: string;
}

export interface Suggestion {
  category?: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low' | string;
  examples?: string[];
}

export interface ScoreBreakdown {
  keyword_relevance: number;
  section_completeness: number;
  formatting_score: number;
  skill_relevance: number;
  experience_clarity: number;
  project_impact: number;
}

export interface KeywordsAnalysis {
  found?: string[];
  found_keywords?: string[];
  missing?: string[];
  missing_keywords?: string[];
  match_percentage?: number;
  recommended?: string[];
}

export interface AnalysisResult {
  success: boolean;
  candidate: CandidateInfo;
  ats_score: number;
  score_breakdown: ScoreBreakdown;
  score_category: string;
  domain: DomainInfo;
  skills: SkillsData;
  projects?: Project[];
  experience?: ExperienceSummary;
  education?: Education[];
  issues?: ATSIssue[];
  suggestions?: Suggestion[];
  keywords_analysis?: KeywordsAnalysis;
  parsing_method?: 'standard' | 'ocr' | 'ocr_unavailable' | string;
  ocr_confidence?: 'low' | 'medium' | 'high' | string | null;
}
