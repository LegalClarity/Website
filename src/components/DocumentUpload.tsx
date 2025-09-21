import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { ArrowLeft, Upload, FileText, AlertCircle, Check, Zap } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { v4 as uuidv4 } from 'uuid';
import { api } from '../services/api';
import type { UploadResponse } from '../types/api';

interface DocumentUploadProps {
  onUploadComplete: (file: File, uploadData: UploadResponse) => void;
  onBack: () => void;
}

export function DocumentUpload({ onUploadComplete, onBack }: DocumentUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileUpload = async (file: File) => {
    if (!file || file.type !== 'application/pdf') {
      setUploadError('Please upload a PDF file');
      return;
    }

    setIsUploading(true);
    setUploadedFile(file);
    setUploadError(null);
    setUploadProgress(0);

    try {
      // Generate UUID for user_id
      const userId = uuidv4();
      
      console.log('Uploading file:', {
        name: file.name,
        size: file.size,
        type: file.type,
        userId: userId
      });

      // Simulate progress while uploading
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Make API request using the new API service
      const uploadResponse = await api.upload.uploadDocument(file, userId);

      clearInterval(progressInterval);
      console.log('Upload successful:', uploadResponse);

      // Complete progress
      setUploadProgress(100);

      setTimeout(() => {
        setIsUploading(false);
        onUploadComplete(file, uploadResponse);
      }, 500);

    } catch (error) {
      console.error('Upload error:', error);
      setUploadError(error instanceof Error ? error.message : 'Upload failed. Please try again.');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen dark-gradient-bg relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-repeat" style={{ 
          backgroundSize: '1024px 1024px',
          backgroundPosition: 'top left'
        }} />
      </div>

      {/* Header */}
      <motion.header
        className="w-full px-8 py-6 flex items-center justify-between relative z-10"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-[#d6d6d6] hover:text-white"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Button>
        
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#FF4929] to-[#EF6537] rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white leading-tight">Legal</span>
            <span className="text-sm font-bold text-[#d6d6d6] leading-tight">Lens</span>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl font-bold text-white mb-6">
            Upload Your Legal Document
          </h1>
          <p className="text-lg text-[#d6d6d6] max-w-2xl mx-auto">
            Upload any legal document for instant AI analysis. We support PDF files up to 10MB.
          </p>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="legal-dark-container p-0 border-2 border-dashed border-[#424242] transition-all duration-300 hover:border-[#FF4929]">
            <CardContent className="p-12">
              <div
                className={`
                  relative min-h-[300px] flex flex-col items-center justify-center text-center
                  transition-all duration-300 rounded-2xl
                  ${isDragOver ? 'bg-[#FF4929]/10 border-[#FF4929]' : ''}
                  ${isUploading ? 'pointer-events-none' : 'cursor-pointer'}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-input')?.click()}
              >
                <input
                  id="file-input"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {!isUploading && !uploadedFile && !uploadError && (
                  <motion.div
                    className="flex flex-col items-center"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-24 h-24 bg-gradient-to-br from-[#FF4929] to-[#EF6537] rounded-3xl flex items-center justify-center mb-6">
                      <Upload className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      Drop your PDF here, or click to browse
                    </h3>
                    <p className="text-[#b8b8b8] mb-6">
                      Supports PDF files up to 10MB
                    </p>
                    <div className="flex items-center gap-4 text-sm text-[#787878]">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        Secure & Private
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#FF4929]" />
                        Instant Analysis
                      </div>
                    </div>
                  </motion.div>
                )}

                {isUploading && uploadedFile && (
                  <motion.div
                    className="flex flex-col items-center w-full"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-24 h-24 bg-gradient-to-br from-[#FF4929] to-[#EF6537] rounded-3xl flex items-center justify-center mb-6">
                      <FileText className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      Uploading Document...
                    </h3>
                    <p className="text-[#b8b8b8] mb-6">
                      {uploadedFile.name} • {formatFileSize(uploadedFile.size)}
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="w-full max-w-md">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-[#d6d6d6]">Upload Progress</span>
                        <span className="text-sm text-[#FF4929]">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-[#202020] rounded-full h-3 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#FF4929] to-[#EF6537] rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${uploadProgress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Error State */}
                {uploadError && (
                  <motion.div
                    className="flex flex-col items-center w-full"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-24 h-24 bg-red-500/20 border-2 border-red-500/30 rounded-3xl flex items-center justify-center mb-6">
                      <AlertCircle className="w-12 h-12 text-red-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      Upload Failed
                    </h3>
                    <p className="text-red-400 mb-6 text-center max-w-md">
                      {uploadError}
                    </p>
                    <Button
                      onClick={() => {
                        setUploadError(null);
                        setUploadedFile(null);
                        setUploadProgress(0);
                      }}
                      className="bg-[#FF4929] hover:bg-[#EF6537] text-white px-6 py-2 rounded-xl"
                    >
                      Try Again
                    </Button>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upload Tips */}
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            {
              icon: FileText,
              title: "PDF Documents",
              description: "Upload contracts, agreements, terms of service, and any legal documents"
            },
            {
              icon: Zap,
              title: "Instant Analysis",
              description: "Get comprehensive analysis and insights in under 30 seconds"
            },
            {
              icon: AlertCircle,
              title: "Privacy First",
              description: "Your documents are processed securely and never stored permanently"
            }
          ].map((tip, index) => (
            <motion.div
              key={`upload-tip-${index}`}
              className="dark-glass-card p-6 rounded-2xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF4929] to-[#EF6537] rounded-xl flex items-center justify-center mx-auto mb-4">
                <tip.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{tip.title}</h3>
              <p className="text-[#b8b8b8] text-sm">{tip.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Security Notice */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="inline-flex items-center gap-2 bg-[#202020] border border-[#424242] rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-[#d6d6d6]">
              Secure SSL encryption • GDPR compliant • No data retention
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}