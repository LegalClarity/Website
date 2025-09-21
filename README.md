
  # Legal Document Simplification Tool

  This is a code bundle for Legal Document Simplification Tool. The original project is available at https://www.figma.com/design/KcaREmx2QxUtFZb91ynx8M/Legal-Document-Simplification-Tool.

  ## Setup

  ### 1. Install Dependencies
  ```bash
  npm i
  ```

  ### 2. Environment Configuration
  Copy the environment example file and configure your API endpoints:
  ```bash
  cp .env.example .env
  ```

  Update the `.env` file with your actual API endpoints:
  ```env
  # API Endpoints
  VITE_API_BASE_URL=https://your-api-base-url.com
  VITE_DOCUMENT_UPLOAD_ENDPOINT=/documents/upload
  VITE_DOCUMENT_ANALYSIS_ENDPOINT=/documents/analyze
  VITE_DOCUMENT_SUMMARY_ENDPOINT=/documents/summary
  VITE_CHATBOT_ENDPOINT=/chat

  # Feature Flags
  VITE_ENABLE_ADVANCED_ANALYSIS=true
  VITE_ENABLE_CHATBOT=true

  # Development settings
  VITE_ENV=development
  ```

  ### 3. Start Development Server
  ```bash
  npm run dev
  ```

  ## Environment Variables

  | Variable | Description | Default Value |
  |----------|-------------|---------------|
  | `VITE_UPLOAD_API_BASE_URL` | Base URL for document upload service | `https://vectordb-229593799477.asia-south1.run.app` |
  | `VITE_ANALYSIS_API_BASE_URL` | Base URL for document analysis service | `http://localhost:8000` |
  | `VITE_SUMMARIZER_API_BASE_URL` | Base URL for document summarization service | `http://localhost:8000` |
  | `VITE_CHATBOT_API_BASE_URL` | Base URL for chatbot service | `http://localhost:8000` |
  | `VITE_DOCUMENT_UPLOAD_ENDPOINT` | Document upload endpoint | `/documents/upload` |
  | `VITE_DOCUMENT_SUMMARIZE_ENDPOINT` | Document summarization endpoint | `/api/v1/documents/summarize` |
  | `VITE_AUDIO_CONVERT_ENDPOINT` | Audio conversion endpoint | `/api/v1/audio/pdf-to-speech` |
  | `VITE_CHATBOT_ENDPOINT` | Chatbot API endpoint | `/api/v1/chat` |
  | `VITE_HEALTH_CHECK_ENDPOINT` | Basic health check endpoint | `/health` |
  | `VITE_HEALTH_DETAILED_ENDPOINT` | Detailed health check endpoint | `/health/detailed` |
  | `VITE_HEALTH_SERVICES_ENDPOINT` | Services health check endpoint | `/health/services` |
  | `VITE_HEALTH_METRICS_ENDPOINT` | Metrics health check endpoint | `/health/metrics` |
  | `VITE_ENABLE_ADVANCED_ANALYSIS` | Enable advanced analysis features | `true` |
  | `VITE_ENABLE_CHATBOT` | Enable chatbot functionality | `true` |
  | `VITE_ENABLE_AUDIO_CONVERSION` | Enable audio conversion features | `true` |
  | `VITE_ENV` | Environment mode | `development` |

  ## API Configuration

  The application now supports multiple microservices with different base URLs:

  - **Upload Service**: Handles document upload and storage
  - **Analysis/Summarization Service**: Processes documents for analysis and summarization
  - **Chatbot Service**: Provides AI-powered document Q&A
  - **Health Monitoring**: Tracks service health and metrics

  Each service can be configured with its own base URL, allowing for flexible deployment architectures.

  ### API Services Available

  ```typescript
  import { api } from '../services/api';

  // Upload a document
  const uploadResponse = await api.upload.uploadDocument(file, userId);

  // Analyze/Summarize a document
  const analysisResponse = await api.analysis.summarizeDocument({
    file,
    include_financial_analysis: true,
    include_risk_assessment: true,
    summary_length: 'comprehensive'
  });

  // Convert document to audio
  const audioBlob = await api.analysis.convertToAudio({
    file,
    voice_name: 'Charon',
    speaking_rate: 1.0
  });

  // Health checks
  const health = await api.health.basicHealthCheck();
  const detailedHealth = await api.health.detailedHealthCheck();

  // Chatbot (when implemented)
  const chatResponse = await api.chatbot.sendMessage('What are the main risks?', documentId);
  ```

  ### Supported Analysis Features

  Based on the integrated API, the application supports:

  - **Document Summarization**: Brief, standard, or comprehensive summaries
  - **Financial Analysis**: Cost implications, risks, and potential savings
  - **Risk Assessment**: Legal risks, compliance issues, and recommendations
  - **Audio Conversion**: Text-to-speech with multiple voice options
  - **Health Monitoring**: Service status and performance metrics
  