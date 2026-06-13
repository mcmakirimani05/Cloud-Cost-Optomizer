export const IDLE_THRESHOLD = 10; // % usage
export const UNDERUTILIZED_THRESHOLD = 50; // % usage
export const HIGH_COST_THRESHOLD = 100; // $

export const SAVINGS_MULTIPLIERS = {
  idle: 0.9, // 90% savings for idle resources
  underutilized: 0.3, // 30% savings for underutilized
  rightsizing: 0.2, // 20% savings for rightsizing
} as const;

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const ENDPOINTS = {
  BILLING_UPLOAD: '/api/billing/upload',
  BILLING_ANALYZE: '/api/billing/analyze',
  RECOMMENDATIONS: '/api/recommendations',
  DASHBOARD: '/api/dashboard',
  EXPORT_PDF: '/api/export/pdf',
  EXPORT_CSV: '/api/export/csv',
} as const;