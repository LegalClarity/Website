/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Service Base URLs
  readonly VITE_UPLOAD_API_BASE_URL: string;
  readonly VITE_ANALYSIS_API_BASE_URL: string;
  readonly VITE_SUMMARIZER_API_BASE_URL: string;
  readonly VITE_CHATBOT_API_BASE_URL: string;
  
  // Upload Service Endpoints
  readonly VITE_DOCUMENT_UPLOAD_ENDPOINT: string;
  
  // Analysis & Summarization Service Endpoints
  readonly VITE_DOCUMENT_SUMMARIZE_ENDPOINT: string;
  readonly VITE_AUDIO_CONVERT_ENDPOINT: string;
  
  // Health Check Endpoints
  readonly VITE_HEALTH_CHECK_ENDPOINT: string;
  readonly VITE_HEALTH_DETAILED_ENDPOINT: string;
  readonly VITE_HEALTH_SERVICES_ENDPOINT: string;
  readonly VITE_HEALTH_METRICS_ENDPOINT: string;
  
  // Chatbot Endpoints
  readonly VITE_CHATBOT_ENDPOINT: string;
  
  // Feature Flags
  readonly VITE_ENABLE_ADVANCED_ANALYSIS: string;
  readonly VITE_ENABLE_CHATBOT: string;
  readonly VITE_ENABLE_AUDIO_CONVERSION: string;
  
  // General Settings
  readonly VITE_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}