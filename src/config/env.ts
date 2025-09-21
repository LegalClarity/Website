// Environment configuration
export const config = {
  api: {
    // Different base URLs for different services
    uploadBaseUrl: import.meta.env.VITE_UPLOAD_API_BASE_URL || 'https://vectordb-229593799477.asia-south1.run.app',
    analysisBaseUrl: import.meta.env.VITE_ANALYSIS_API_BASE_URL || 'http://localhost:8000',
    summarizerBaseUrl: import.meta.env.VITE_SUMMARIZER_API_BASE_URL || 'http://localhost:8000',
    chatbotBaseUrl: import.meta.env.VITE_CHATBOT_API_BASE_URL || 'http://localhost:8000',
    
    endpoints: {
      // Upload service endpoints
      documentUpload: import.meta.env.VITE_DOCUMENT_UPLOAD_ENDPOINT || '/documents/upload',
      
      // Analysis service endpoints (new API structure)
      documentSummarize: import.meta.env.VITE_DOCUMENT_SUMMARIZE_ENDPOINT || '/api/v1/documents/summarize',
      audioConvert: import.meta.env.VITE_AUDIO_CONVERT_ENDPOINT || '/api/v1/audio/pdf-to-speech',
      
      // Health check endpoints
      healthCheck: import.meta.env.VITE_HEALTH_CHECK_ENDPOINT || '/health',
      healthDetailed: import.meta.env.VITE_HEALTH_DETAILED_ENDPOINT || '/health/detailed',
      healthServices: import.meta.env.VITE_HEALTH_SERVICES_ENDPOINT || '/health/services',
      healthMetrics: import.meta.env.VITE_HEALTH_METRICS_ENDPOINT || '/health/metrics',
      
      // Chatbot endpoints
      chatbot: import.meta.env.VITE_CHATBOT_ENDPOINT || '/api/v1/chat',
    }
  },
  env: import.meta.env.VITE_ENV || 'development',
  features: {
    enableAdvancedAnalysis: import.meta.env.VITE_ENABLE_ADVANCED_ANALYSIS === 'true',
    enableChatbot: import.meta.env.VITE_ENABLE_CHATBOT !== 'false', // enabled by default
    enableAudioConversion: import.meta.env.VITE_ENABLE_AUDIO_CONVERSION === 'true',
  }
} as const;

// Helper function to build full API URLs for different services
export const buildApiUrl = (baseUrl: string, endpoint: string): string => {
  return `${baseUrl}${endpoint}`;
};

// API endpoints ready to use with correct base URLs
export const apiEndpoints = {
  // Upload service (existing)
  documentUpload: buildApiUrl(config.api.uploadBaseUrl, config.api.endpoints.documentUpload),
  
  // Analysis & Summarization service (new)
  documentSummarize: buildApiUrl(config.api.summarizerBaseUrl, config.api.endpoints.documentSummarize),
  audioConvert: buildApiUrl(config.api.summarizerBaseUrl, config.api.endpoints.audioConvert),
  
  // Health checks for analysis/summarizer service
  healthCheck: buildApiUrl(config.api.analysisBaseUrl, config.api.endpoints.healthCheck),
  healthDetailed: buildApiUrl(config.api.analysisBaseUrl, config.api.endpoints.healthDetailed),
  healthServices: buildApiUrl(config.api.analysisBaseUrl, config.api.endpoints.healthServices),
  healthMetrics: buildApiUrl(config.api.analysisBaseUrl, config.api.endpoints.healthMetrics),
  
  // Chatbot service
  chatbot: buildApiUrl(config.api.chatbotBaseUrl, config.api.endpoints.chatbot),
} as const;

// Helper function to check if we're in development
export const isDevelopment = config.env === 'development';
export const isProduction = config.env === 'production';