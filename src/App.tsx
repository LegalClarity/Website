import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LandingPage } from './components/LandingPage';
import { DocumentUpload } from './components/DocumentUpload';
import { DocumentProcessor } from './components/DocumentProcessor';
import { FeaturesPage } from './components/FeaturesPage';
import { AboutPage } from './components/AboutPage';
// Removed StepIndicator - no longer needed with streamlined flow

interface UploadResponse {
  document_id: string;
  gcs_url: string;
  public_url: string;
  requires_signed_url: boolean;
  message: string;
}

type AppState = 'landing' | 'upload' | 'processing' | 'features' | 'about';

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadData, setUploadData] = useState<UploadResponse | null>(null);

  const handleGetStarted = () => {
    setCurrentState('upload');
  };

  const handleUploadComplete = (file: File, uploadResponse: UploadResponse) => {
    setUploadedFile(file);
    setUploadData(uploadResponse);
    setCurrentState('processing');
  };

  const handleBack = () => {
    setCurrentState('landing');
  };

  const handleFeaturesClick = () => {
    setCurrentState('features');
  };

  const handleAboutClick = () => {
    setCurrentState('about');
  };

  // No step indicator needed - users navigate via back button only

  // Enhanced page transitions
  const pageTransitions = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -20 }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Dark theme gradient background */}
      <div className="absolute inset-0 dark-gradient-bg" />
      
      {/* No step indicator - users navigate between Analysis and Research tabs freely */}

      <AnimatePresence mode="wait">
        {currentState === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02, blur: 10 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <LandingPage 
              onGetStarted={handleGetStarted} 
              onFeaturesClick={handleFeaturesClick}
              onAboutClick={handleAboutClick}
            />
          </motion.div>
        )}

        {currentState === 'features' && (
          <motion.div
            key="features"
            {...pageTransitions}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <FeaturesPage onBack={handleBack} />
          </motion.div>
        )}

        {currentState === 'about' && (
          <motion.div
            key="about"
            {...pageTransitions}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <AboutPage onBack={handleBack} />
          </motion.div>
        )}

        {currentState === 'upload' && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, x: 100, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -100, rotateY: 15 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <DocumentUpload onUploadComplete={handleUploadComplete} onBack={handleBack} />
          </motion.div>
        )}

        {currentState === 'processing' && uploadedFile && uploadData && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 1.05 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <DocumentProcessor file={uploadedFile} uploadData={uploadData} onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}