export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  category: "cloud" | "ai" | "engineering" | "security" | "data" | "modernization";
  features: string[];
  techStack: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  architectureHighlights: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  clientName: string;
  clientIndustry: string;
  summary: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    label: string;
  }[];
  techUsed: string[];
  beforeMetric: string;
  afterMetric: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  featuredImage?: string;
}

export interface CloudNode {
  id: string;
  name: string;
  type: "dns" | "lb" | "app" | "db" | "cache" | "ai" | "sec";
  status: "online" | "degraded" | "offline";
  cpuUsage: number; // percentage
  memoryUsage: number; // percentage
  latencyMs: number;
  requestsPerSec: number;
  connections: string[]; // target node IDs
}

export interface TechStackItem {
  name: string;
  category: "Frontend" | "Backend" | "Cloud & DevOps" | "AI & Data" | "Mobile & IoT" | "Security";
  level: "Expert" | "Core Stack" | "Specialized";
  description: string;
  icon: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  expertise: string[];
  linkedinUrl?: string;
  githubUrl?: string;
}

export interface CalculatorInputs {
  projectType: "fullstack" | "ai_ml" | "cloud_devops" | "cybersecurity" | "mobile";
  teamScale: "starter" | "growth" | "enterprise";
  timeline: "rush" | "standard" | "extended";
  features: string[];
  complianceRequired: boolean;
  slaSupport: boolean;
}

export interface AuditReport {
  healthScore: number;
  summary: string;
  securityScore: number;
  performanceScore: number;
  maintainabilityScore: number;
  strengths: string[];
  criticalIssues: {
    severity: "Critical" | "High" | "Medium" | "Low";
    title: string;
    description: string;
    recommendation: string;
  }[];
  dibiTechRecommendations: {
    category: string;
    title: string;
    details: string;
  }[];
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget: string;
  message: string;
  preferredDate?: string;
}
