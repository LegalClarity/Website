import { useState } from 'react';
import { api } from '../services/api';
import type { SummarizeRequest, SummarizeResponse } from '../types/api';

export const useDocumentAnalysis = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<SummarizeResponse | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const analyzeDocument = async (file: File, options?: Partial<SummarizeRequest>) => {
    setIsAnalyzing(true);
    setAnalysisError(null);
    
    try {
      const request: SummarizeRequest = {
        file,
        include_financial_analysis: true,
        include_risk_assessment: true,
        summary_length: 'comprehensive',
        language_preference: 'en',
        ...options
      };

      const response = await api.analysis.summarizeDocument(request);
      setAnalysisData(response);
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Analysis failed';
      setAnalysisError(errorMessage);
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysisData(null);
    setAnalysisError(null);
    setIsAnalyzing(false);
  };

  return {
    analyzeDocument,
    resetAnalysis,
    isAnalyzing,
    analysisData,
    analysisError
  };
};