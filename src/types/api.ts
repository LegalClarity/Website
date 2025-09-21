// API Response Types based on the Postman collection

// Document Upload Response (existing)
export interface UploadResponse {
  document_id: string;
  gcs_url: string;
  public_url: string;
  requires_signed_url: boolean;
  message: string;
}

// Document Summarization Request
export interface SummarizeRequest {
  file: File;
  include_financial_analysis?: boolean;
  include_risk_assessment?: boolean;
  summary_length?: 'brief' | 'standard' | 'comprehensive';
  language_preference?: string;
}

// Document Summarization Response
export interface SummarizeResponse {
  summary: string;
  key_points: string[];
  financial_analysis?: {
    cost_implications: string[];
    financial_risks: string[];
    potential_savings: string[];
    estimated_costs?: {
      implementation: number;
      maintenance: number;
      legal_fees: number;
    };
  };
  risk_assessment?: {
    legal_risks: Array<{
      category: string;
      description: string;
      severity: 'low' | 'medium' | 'high';
      recommendation: string;
    }>;
    compliance_issues: string[];
    risk_level: 'low' | 'medium' | 'high';
    risk_score: number;
    recommendations: Array<{
      type: 'high' | 'medium' | 'low';
      title: string;
      description: string;
    }>;
  };
  document_analysis?: {
    document_type: string;
    total_clauses: number;
    critical_issues: number;
    compliance_score: number;
    key_clauses: Array<{
      id: string;
      category: string;
      title: string;
      description: string;
      page?: number;
      severity?: 'low' | 'medium' | 'high';
      financial_impact?: boolean;
      legal_impact?: boolean;
    }>;
    flow_steps?: Array<{
      id: string;
      type: 'action' | 'decision' | 'process';
      title: string;
      description: string;
      timeline?: string;
      responsible_party?: string;
    }>;
  };
  document_metadata: {
    document_type: string;
    page_count: number;
    word_count: number;
    language: string;
    confidence_score?: number;
  };
  processing_time: number;
  request_id: string;
  timestamp: string;
}

// Audio Conversion Request
export interface AudioConvertRequest {
  file: File;
  document_title?: string;
  summary_length?: 'brief' | 'standard' | 'comprehensive';
  voice_name?: string;
  model_name?: string;
  speaking_rate?: number;
  pitch?: number;
}

// Health Check Response
export interface HealthResponse {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  services: {
    [serviceName: string]: {
      status: 'up' | 'down';
      response_time?: number;
      details?: string;
    };
  };
  version?: string;
  uptime?: number;
}

// Detailed Health Response
export interface DetailedHealthResponse extends HealthResponse {
  system_metrics: {
    cpu_usage: number;
    memory_usage: number;
    disk_usage: number;
    active_connections: number;
  };
  configuration: {
    max_file_size: string;
    supported_formats: string[];
    features_enabled: string[];
  };
}

// API Error Response
export interface ApiError {
  error: string;
  detail?: string;
  status_code: number;
  request_id?: string;
  timestamp: string;
}
