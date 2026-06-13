/**
 * Core types for the Cloud Cost Optimization Advisor
 */

export interface BillingRecord {
  service: string;
  cost: number;
  usage: number;
  instance_type?: string;
  region?: string;
  date?: string;
}

export interface Recommendation {
  id: string;
  type: 'idle' | 'underutilized' | 'rightsizing' | 'reserved_instance';
  resource: string;
  currentCost: number;
  estimatedSavings: number;
  savingsPercentage: number;
  description: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
}

export interface AnalysisResult {
  id: string;
  uploadedAt: Date;
  recommendations: Recommendation[];
  totalCurrentSpend: number;
  totalPotentialSavings: number;
  totalSavingsPercentage: number;
}

export interface DashboardMetrics {
  currentSpend: number;
  potentialSavings: number;
  savingsPercentage: number;
  topOffenders: ServiceCost[];
  recommendationsByType: Record<string, number>;
}

export interface ServiceCost {
  service: string;
  cost: number;
}

export interface ExportData {
  format: 'pdf' | 'csv';
  analysisId: string;
  filename: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface UploadResponse {
  analysisId: string;
  fileName: string;
  recordsProcessed: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  tier: 'free' | 'pro' | 'enterprise';
  analysesThisMonth: number;
  createdAt: Date;
}

export const RECOMMENDATION_TYPES = {
  IDLE: 'idle',
  UNDERUTILIZED: 'underutilized',
  RIGHTSIZING: 'rightsizing',
  RESERVED_INSTANCE: 'reserved_instance',
} as const;

export const USER_TIERS = {
  FREE: 'free',
  PRO: 'pro',
  ENTERPRISE: 'enterprise',
} as const;

export const ANALYSIS_LIMITS = {
  free: 1,
  pro: -1, // unlimited
  enterprise: -1,
} as const;