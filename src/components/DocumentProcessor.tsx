import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  ArrowDown, 
  ArrowRight,
  Brain,
  Shield,
  Scale,
  Eye,
  MessageSquare,
  TrendingUp,
  BarChart3,
  Users,
  Send,
  Search,
  Bookmark,
  ArrowLeft,
  FileCheck
} from 'lucide-react';
import { useDocumentAnalysis } from '../hooks/useDocumentAnalysis';
import type { UploadResponse, SummarizeResponse } from '../types/api';

interface DocumentProcessorProps {
  file: File;
  uploadData: UploadResponse;
  onBack: () => void;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface KeyHighlight {
  id: string;
  category: 'risk' | 'opportunity' | 'compliance' | 'financial' | 'timeline';
  title: string;
  description: string;
  severity?: 'low' | 'medium' | 'high';
  page?: number;
}

export function DocumentProcessor({ file, uploadData, onBack }: DocumentProcessorProps) {
  const [activeTab, setActiveTab] = useState('analysis');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'ve analyzed your document and I\'m ready to answer any questions you have about it. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedHighlight, setSelectedHighlight] = useState<string | null>(null);

  // Use the document analysis hook
  const { analyzeDocument, isAnalyzing, analysisData, analysisError } = useDocumentAnalysis();

  // Start analysis when component mounts
  useEffect(() => {
    const startAnalysis = async () => {
      try {
        await analyzeDocument(file, {
          include_financial_analysis: true,
          include_risk_assessment: true,
          summary_length: 'comprehensive',
          language_preference: 'en'
        });
      } catch (error) {
        console.error('Analysis failed:', error);
      }
    };

    startAnalysis();
  }, [file, analyzeDocument]);

  // Key highlights derived from API data
  const keyHighlights = analysisData?.document_analysis?.key_clauses?.map(clause => ({
    id: clause.id,
    category: clause.category as 'risk' | 'opportunity' | 'compliance' | 'financial' | 'timeline',
    title: clause.title,
    description: clause.description,
    severity: clause.severity,
    page: clause.page
  })) || [];

  const getRiskColor = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'low': return 'text-green-500 bg-green-500/10';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10';
      case 'high': return 'text-red-500 bg-red-500/10';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'risk': return <AlertTriangle className="w-4 h-4" />;
      case 'opportunity': return <TrendingUp className="w-4 h-4" />;
      case 'compliance': return <Scale className="w-4 h-4" />;
      case 'financial': return <DollarSign className="w-4 h-4" />;
      case 'timeline': return <Clock className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'risk': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'opportunity': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'compliance': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'financial': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'timeline': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getSeverityColor = (severity?: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'low': return 'text-green-500 bg-green-500/10';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10';
      case 'high': return 'text-red-500 bg-red-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'process': return <ArrowRight className="w-4 h-4" />;
      case 'decision': return <MessageSquare className="w-4 h-4" />;
      case 'outcome': return <CheckCircle className="w-4 h-4" />;
      case 'risk': return <AlertTriangle className="w-4 h-4" />;
      default: return <ArrowRight className="w-4 h-4" />;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(inputMessage),
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const getAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('non-compete') || lowerMessage.includes('competition')) {
      return 'I can help explain non-compete clauses in your document. Please refer to the analysis for specific details about restrictions and timeframes.';
    }
    
    if (lowerMessage.includes('salary') || lowerMessage.includes('compensation')) {
      return 'For compensation details, please check the document analysis which will extract specific salary and benefit information from your contract.';
    }
    
    return 'I can help you understand any aspect of this legal document. Feel free to ask about specific clauses, terms, or any concerns you might have.';
  };

  const renderFlowChart = () => {
    if (!analysisData?.document_analysis?.flow_steps || analysisData.document_analysis.flow_steps.length === 0) {
      return (
        <div className="text-center text-[#b8b8b8] py-8">
          <FileText className="w-16 h-16 mx-auto mb-4 text-[#FF4929]" />
          <p>Flow chart will be generated based on document analysis</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center space-y-6 py-8">
        {analysisData.document_analysis.flow_steps.map((step, index) => (
          <motion.div
            key={`flowchart-step-${step.id}-${index}`}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            {/* Step Card */}
            <Card className={`
              legal-dark-container w-80 transition-all duration-300 hover:scale-105
              ${step.type === 'process' ? 'border-blue-500/30' : 'border-[#424242]'}
              ${step.type === 'decision' ? 'border-yellow-500/30' : ''}
              ${step.type === 'action' ? 'border-green-500/30' : ''}
            `}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center
                    ${step.type === 'decision' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                    ${step.type === 'process' ? 'bg-blue-500/20 text-blue-400' : ''}
                    ${step.type === 'action' ? 'bg-green-500/20 text-green-400' : ''}
                  `}>
                    {getStepIcon(step.type)}
                  </div>
                  <CardTitle className="text-lg text-white">{step.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[#b8b8b8] text-sm">{step.description}</p>
                <div className="flex gap-2 mt-3">
                  <Badge variant="secondary" className="capitalize">
                    {step.type}
                  </Badge>
                  {step.timeline && (
                    <Badge variant="outline" className="text-[#d6d6d6] border-[#424242]">
                      <Clock className="w-3 h-3 mr-1" />
                      {step.timeline}
                    </Badge>
                  )}
                  {step.responsible_party && (
                    <Badge variant="outline" className="text-[#d6d6d6] border-[#424242]">
                      <Users className="w-3 h-3 mr-1" />
                      {step.responsible_party}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Arrow Connector */}
            {index < analysisData.document_analysis.flow_steps.length - 1 && (
              <motion.div
                className="flex items-center justify-center my-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2 + 0.1 }}
              >
                <ArrowDown className="w-6 h-6 text-[#FF4929]" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    );
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen dark-gradient-bg flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-24 h-24 bg-gradient-to-br from-[#FF4929] to-[#EF6537] rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Brain className="w-12 h-12 text-white animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Analyzing Document</h2>
          <p className="text-[#d6d6d6] mb-8">AI is processing your legal document...</p>
          <div className="w-80 mx-auto">
            <Progress value={analysisProgress} className="mb-4" />
            <p className="text-sm text-[#b8b8b8]">{analysisProgress}% Complete</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark-gradient-bg">
      {/* Header */}
      <motion.header
        className="px-6 py-4 border-b border-[#424242] bg-[#141414]/80 backdrop-blur-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-[#d6d6d6] hover:text-white"
              onClick={onBack}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF4929] to-[#EF6537] rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">{file.name}</h1>
                <p className="text-sm text-[#b8b8b8]">Document Analysis</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge className={`${getRiskColor(analysisData?.riskLevel || 'medium')} border-none`}>
              Risk: {analysisData?.riskLevel?.toUpperCase()}
            </Badge>
            <Badge variant="outline" className="border-[#424242] text-[#d6d6d6]">
              <Clock className="w-3 h-3 mr-1" />
              28s analysis
            </Badge>
          </div>
        </div>
      </motion.header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-[#202020] border border-[#424242] p-2 rounded-2xl shadow-lg z-50 relative">
              <TabsTrigger 
                value="analysis" 
                className="data-[state=active]:bg-[#FF4929] data-[state=active]:text-white text-[#d6d6d6] rounded-xl px-10 py-4 text-base font-medium transition-all duration-300 hover:bg-[#292929] hover:text-white data-[state=active]:shadow-lg"
              >
                <Brain className="w-5 h-5 mr-3" />
                Analysis
              </TabsTrigger>
              <TabsTrigger 
                value="research" 
                className="data-[state=active]:bg-[#FF4929] data-[state=active]:text-white text-[#d6d6d6] rounded-xl px-10 py-4 text-base font-medium transition-all duration-300 hover:bg-[#292929] hover:text-white data-[state=active]:shadow-lg"
              >
                <MessageSquare className="w-5 h-5 mr-3" />
                Research
              </TabsTrigger>
              <TabsTrigger 
                value="summary" 
                className="data-[state=active]:bg-[#FF4929] data-[state=active]:text-white text-[#d6d6d6] rounded-xl px-10 py-4 text-base font-medium transition-all duration-300 hover:bg-[#292929] hover:text-white data-[state=active]:shadow-lg"
              >
                <FileCheck className="w-5 h-5 mr-3" />
                Summary
              </TabsTrigger>
            </TabsList>
          </div>

          <AnimatePresence mode="wait">
            {/* Analysis Tab */}
            <TabsContent value="analysis">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                {/* Numerical Analysis Section */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="legal-dark-container text-center p-6">
                    <div className="text-3xl font-bold text-[#FF4929] mb-2">
                      {analysisData?.risk_assessment?.risk_score || 0}%
                    </div>
                    <div className="text-sm text-[#b8b8b8]">Risk Score</div>
                  </Card>
                  <Card className="legal-dark-container text-center p-6">
                    <div className="text-3xl font-bold text-green-500 mb-2">
                      {analysisData?.document_metadata?.confidence_score || 0}%
                    </div>
                    <div className="text-sm text-[#b8b8b8]">Confidence</div>
                  </Card>
                  <Card className="legal-dark-container text-center p-6">
                    <div className="text-3xl font-bold text-[#d6d6d6] mb-2">
                      {analysisData?.document_analysis?.total_clauses || 0}
                    </div>
                    <div className="text-sm text-[#b8b8b8]">Total Clauses</div>
                  </Card>
                  <Card className="legal-dark-container text-center p-6">
                    <div className="text-3xl font-bold text-red-500 mb-2">
                      {analysisData?.document_analysis?.critical_issues || 0}
                    </div>
                    <div className="text-sm text-[#b8b8b8]">Critical Issues</div>
                  </Card>
                </div>

                {/* Flow Chart Section */}
                <Card className="legal-dark-container">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white text-center justify-center">
                      <TrendingUp className="w-5 h-5 text-[#FF4929]" />
                      Document Process Flow
                    </CardTitle>
                    <p className="text-center text-[#b8b8b8]">
                      Step-by-step breakdown of the legal process outlined in your document
                    </p>
                  </CardHeader>
                  <CardContent>
                    {renderFlowChart()}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Research Tab */}
            <TabsContent value="research">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="h-[calc(100vh-200px)]"
              >
                <div className="flex h-full gap-6">
                  
                  {/* Left Panel - AI Insights */}
                  <div className="w-80 legal-dark-container p-6 overflow-hidden">
                    <div className="h-full flex flex-col">
                      <div className="mb-6">
                        <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                          <Eye className="w-5 h-5 text-[#FF4929]" />
                          AI Insights
                        </h2>
                        <p className="text-sm text-[#b8b8b8]">
                          Key takeaways and highlights
                        </p>
                      </div>

                      <ScrollArea className="flex-1">
                        <div className="space-y-3">
                          {keyHighlights.map((highlight, index) => (
                            <motion.div
                              key={`research-highlight-${highlight.id}-${highlight.category}`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <Card 
                                className={`
                                  cursor-pointer transition-all duration-200 border p-4
                                  ${selectedHighlight === highlight.id 
                                    ? 'bg-[#FF4929]/10 border-[#FF4929]/30' 
                                    : 'bg-[#202020] border-[#424242] hover:border-[#FF4929]/50'
                                  }
                                `}
                                onClick={() => setSelectedHighlight(
                                  selectedHighlight === highlight.id ? null : highlight.id
                                )}
                              >
                                <div className="flex items-start gap-3">
                                  <div className={`
                                    w-8 h-8 rounded-lg flex items-center justify-center border
                                    ${getCategoryColor(highlight.category)}
                                  `}>
                                    {getCategoryIcon(highlight.category)}
                                  </div>
                                  
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                      <h3 className="font-medium text-white text-sm truncate">
                                        {highlight.title}
                                      </h3>
                                      {highlight.severity && (
                                        <Badge className={`${getSeverityColor(highlight.severity)} text-xs`}>
                                          {highlight.severity}
                                        </Badge>
                                      )}
                                    </div>
                                    
                                    <p className="text-xs text-[#b8b8b8] line-clamp-2 mb-2">
                                      {highlight.description}
                                    </p>
                                    
                                    <div className="flex items-center justify-between">
                                      <Badge 
                                        variant="secondary" 
                                        className="text-xs capitalize bg-[#292929] text-[#d6d6d6]"
                                      >
                                        {highlight.category}
                                      </Badge>
                                      {highlight.page && (
                                        <span className="text-xs text-[#787878]">
                                          Page {highlight.page}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>

                  {/* Center Panel - Document Preview */}
                  <div className="flex-1 legal-dark-container flex flex-col">
                    <div className="p-4 border-b border-[#424242]">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-white">Document Preview</h3>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="text-[#d6d6d6]">
                            <Search className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-[#d6d6d6]">
                            <Bookmark className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* PDF Viewer */}
                    <div className="flex-1 p-6">
                      <div className="h-full bg-[#202020] rounded-lg border border-[#424242] overflow-hidden">
                        {uploadData.public_url ? (
                          <iframe
                            src={uploadData.public_url}
                            className="w-full h-full"
                            title="PDF Document Viewer"
                            style={{ border: 'none' }}
                            onError={() => console.error('PDF iframe failed to load')}
                          />
                        ) : (
                          <div className="h-full flex items-center justify-center text-center p-8">
                            <div>
                              <FileText className="w-16 h-16 text-[#FF4929] mx-auto mb-4" />
                              <h3 className="text-xl font-semibold text-white mb-2">Document Processing</h3>
                              <p className="text-[#b8b8b8]">
                                PDF viewer will appear here once processing is complete.
                              </p>
                              <p className="text-sm text-[#787878] mt-2">
                                📄 {file.name}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Panel - Chatbot */}
                  <div className="w-96 legal-dark-container flex flex-col">
                    <div className="p-6 border-b border-[#424242]">
                      <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-[#FF4929]" />
                        AI Assistant
                      </h2>
                      <p className="text-sm text-[#b8b8b8]">
                        Ask questions about your document
                      </p>
                    </div>

                    {/* Chat Messages */}
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        <AnimatePresence>
                          {chatMessages.map((message, messageIndex) => (
                            <motion.div
                              key={`chat-message-${message.id}-${messageIndex}`}
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div className={`
                                max-w-[80%] rounded-2xl p-4 ${
                                  message.type === 'user'
                                    ? 'bg-gradient-to-r from-[#FF4929] to-[#EF6537] text-white'
                                    : 'bg-[#202020] text-[#d6d6d6] border border-[#424242]'
                                }
                              `}>
                                {message.type === 'ai' && (
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="w-5 h-5 bg-gradient-to-r from-[#FF4929] to-[#EF6537] rounded-full flex items-center justify-center">
                                      <Brain className="w-3 h-3 text-white" />
                                    </div>
                                    <span className="text-xs font-medium text-[#FF4929]">AI Assistant</span>
                                  </div>
                                )}
                                <p className="text-sm leading-relaxed">{message.content}</p>
                                <p className={`text-xs mt-2 ${
                                  message.type === 'user' ? 'text-white/70' : 'text-[#787878]'
                                }`}>
                                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>

                        {isTyping && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-start"
                          >
                            <div className="bg-[#202020] border border-[#424242] rounded-2xl p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-5 h-5 bg-gradient-to-r from-[#FF4929] to-[#EF6537] rounded-full flex items-center justify-center">
                                  <Brain className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-xs font-medium text-[#FF4929]">AI Assistant</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-[#FF4929] rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-[#FF4929] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-[#FF4929] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </ScrollArea>

                    {/* Chat Input */}
                    <div className="p-4 border-t border-[#424242]">
                      <div className="flex gap-2">
                        <Input
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          placeholder="Ask about the document..."
                          className="flex-1 bg-[#202020] border-[#424242] text-white placeholder:text-[#787878]"
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <Button
                          onClick={handleSendMessage}
                          disabled={!inputMessage.trim() || isTyping}
                          className="bg-gradient-to-r from-[#FF4929] to-[#EF6537] hover:from-[#EF6537] hover:to-[#BD3F14] text-white"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      {/* Quick Questions */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {[
                          "What are the main risks?",
                          "Explain key clauses",
                          "Risk assessment details?"
                        ].map((question, index) => (
                          <Button
                            key={`chatbot-quick-question-${index}-${question.slice(0, 5)}`}
                            variant="ghost"
                            size="sm"
                            onClick={() => setInputMessage(question)}
                            className="text-xs text-[#b8b8b8] hover:text-white bg-[#202020] hover:bg-[#292929] border border-[#424242]"
                          >
                            {question}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>

            {/* Summary Tab */}
            <TabsContent value="summary">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto"
              >
                <div className="legal-dark-container p-8 rounded-2xl">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                      <FileCheck className="w-6 h-6 text-[#FF4929]" />
                      Document Summary
                    </h2>
                    <p className="text-[#b8b8b8]">
                      Key insights and executive summary of your legal document
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Overview Section */}
                    <div className="bg-[#202020] border border-[#424242] rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Eye className="w-5 h-5 text-[#FF4929]" />
                        Document Overview
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-[#b8b8b8] mb-1">Document Type</p>
                          <p className="text-white font-medium">{analysisData?.document_metadata?.document_type || 'Legal Document'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-[#b8b8b8] mb-1">Risk Level</p>
                          <Badge className={`${getRiskColor(analysisData?.risk_assessment?.risk_level || 'medium')} border-none`}>
                            {analysisData?.risk_assessment?.risk_level?.toUpperCase() || 'MEDIUM'}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm text-[#b8b8b8] mb-1">Total Pages</p>
                          <p className="text-white font-medium">{analysisData?.document_metadata?.page_count || '0'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-[#b8b8b8] mb-1">Word Count</p>
                          <p className="text-white font-medium">{analysisData?.document_metadata?.word_count || '0'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Key Points Section */}
                    <div className="bg-[#202020] border border-[#424242] rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-[#FF4929]" />
                        Key Points
                      </h3>
                      <div className="space-y-3">
                        {(analysisData?.key_points || [
                          "Document analysis in progress...",
                          "Key points will be extracted from the legal document",
                          "Summary will include main clauses and important terms",
                          "Risk assessment and recommendations will be provided"
                        ]).map((point, index) => (
                          <div key={`summary-key-point-${index}`} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-[#FF4929] rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-[#d6d6d6] text-sm leading-relaxed">{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommendations Section */}
                    <div className="bg-[#202020] border border-[#424242] rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-[#FF4929]" />
                        Recommendations
                      </h3>
                      <div className="space-y-4">
                        {(analysisData?.recommendations || [
                          {
                            type: "medium",
                            title: "Document Review",
                            description: "Please review the analyzed document for completeness and accuracy"
                          },
                          {
                            type: "low",
                            title: "Legal Consultation", 
                            description: "Consider consulting with a legal professional for complex clauses"
                          },
                          {
                            type: "high",
                            title: "Action Required",
                            description: "Important clauses require immediate attention and understanding"
                          }
                        ]).map((rec: any, index: number) => (
                          <div key={`summary-recommendation-${index}`} className="flex items-start gap-4">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              rec.type === 'high' ? 'bg-red-500/20 text-red-400' :
                              rec.type === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              <AlertTriangle className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-white mb-1">{rec.title}</h4>
                              <p className="text-sm text-[#b8b8b8] leading-relaxed">{rec.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Items */}
                    <div className="bg-gradient-to-r from-[#FF4929]/10 to-[#EF6537]/10 border border-[#FF4929]/30 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-[#FF4929]" />
                        Recommended Actions
                      </h3>
                      <div className="space-y-3">
                        {[
                          "Review all highlighted clauses carefully",
                          "Consult with a legal advisor for contract review", 
                          "Request clarification on unclear terms",
                          "Compare with industry standard practices"
                        ].map((action, index) => (
                          <div key={`summary-action-${index}`} className="flex items-center gap-3">
                            <div className="w-5 h-5 border-2 border-[#FF4929] rounded flex items-center justify-center">
                              <CheckCircle className="w-3 h-3 text-[#FF4929]" />
                            </div>
                            <p className="text-[#d6d6d6] text-sm">{action}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  );
}