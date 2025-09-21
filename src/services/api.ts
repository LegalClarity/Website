import { apiEndpoints } from '../config/env';
import type { 
  UploadResponse, 
  SummarizeRequest, 
  SummarizeResponse, 
  AudioConvertRequest,
  HealthResponse,
  DetailedHealthResponse,
  ApiError
} from '../types/api';

// Utility function to handle API errors
const handleApiError = async (response: Response): Promise<never> => {
  let errorData: ApiError;
  
  try {
    errorData = await response.json();
  } catch {
    errorData = {
      error: 'Unknown error occurred',
      status_code: response.status,
      timestamp: new Date().toISOString()
    };
  }
  
  throw new Error(`API Error ${response.status}: ${errorData.error || 'Unknown error'}`);
};

// Upload Service API
export const uploadApi = {
  async uploadDocument(file: File, userId: string): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_id', userId);

    const response = await fetch(apiEndpoints.documentUpload, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      await handleApiError(response);
    }

    return response.json();
  }
};

// Analysis & Summarization Service API
export const analysisApi = {
  async summarizeDocument(request: SummarizeRequest): Promise<SummarizeResponse> {
    const formData = new FormData();
    formData.append('file', request.file);
    
    // Optional parameters
    if (request.include_financial_analysis !== undefined) {
      formData.append('include_financial_analysis', request.include_financial_analysis.toString());
    }
    if (request.include_risk_assessment !== undefined) {
      formData.append('include_risk_assessment', request.include_risk_assessment.toString());
    }
    if (request.summary_length) {
      formData.append('summary_length', request.summary_length);
    }
    if (request.language_preference) {
      formData.append('language_preference', request.language_preference);
    }

    const response = await fetch(apiEndpoints.documentSummarize, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      await handleApiError(response);
    }

    return response.json();
  },

  async convertToAudio(request: AudioConvertRequest): Promise<Blob> {
    const formData = new FormData();
    formData.append('file', request.file);
    
    // Optional parameters
    if (request.document_title) {
      formData.append('document_title', request.document_title);
    }
    if (request.summary_length) {
      formData.append('summary_length', request.summary_length);
    }
    if (request.voice_name) {
      formData.append('voice_name', request.voice_name);
    }
    if (request.model_name) {
      formData.append('model_name', request.model_name);
    }
    if (request.speaking_rate !== undefined) {
      formData.append('speaking_rate', request.speaking_rate.toString());
    }
    if (request.pitch !== undefined) {
      formData.append('pitch', request.pitch.toString());
    }

    const response = await fetch(apiEndpoints.audioConvert, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'audio/mpeg',
      },
    });

    if (!response.ok) {
      await handleApiError(response);
    }

    return response.blob();
  }
};

// Health Check API
export const healthApi = {
  async basicHealthCheck(): Promise<HealthResponse> {
    const response = await fetch(apiEndpoints.healthCheck, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      await handleApiError(response);
    }

    return response.json();
  },

  async detailedHealthCheck(): Promise<DetailedHealthResponse> {
    const response = await fetch(apiEndpoints.healthDetailed, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      await handleApiError(response);
    }

    return response.json();
  },

  async servicesHealthCheck(): Promise<HealthResponse> {
    const response = await fetch(apiEndpoints.healthServices, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      await handleApiError(response);
    }

    return response.json();
  },

  async metricsHealthCheck(): Promise<any> {
    const response = await fetch(apiEndpoints.healthMetrics, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      await handleApiError(response);
    }

    return response.json();
  }
};

// Chatbot API (placeholder for future implementation)
export const chatbotApi = {
  async sendMessage(message: string, documentId?: string): Promise<any> {
    const payload = {
      message,
      document_id: documentId,
      timestamp: new Date().toISOString()
    };

    const response = await fetch(apiEndpoints.chatbot, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      await handleApiError(response);
    }

    return response.json();
  }
};

// Combined API object for easy importing
export const api = {
  upload: uploadApi,
  analysis: analysisApi,
  health: healthApi,
  chatbot: chatbotApi,
};