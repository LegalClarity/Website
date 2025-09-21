import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  Send, 
  MessageSquare, 
  FileText, 
  Search, 
  ArrowLeft,
  Brain,
  AlertTriangle,
  CheckCircle,
  Clock,
  Scale,
  Shield,
  Eye,
  Bookmark,
  Zap,
  TrendingUp,
  Users,
  DollarSign
} from 'lucide-react';

interface DeepResearchViewProps {
  file: File;
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

export function DeepResearchView({ file }: DeepResearchViewProps) {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI legal assistant. I\'ve analyzed your document and I\'m ready to answer any questions you have about the employment agreement. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [selectedHighlight, setSelectedHighlight] = useState<string | null>(null);

  const keyHighlights: KeyHighlight[] = [
    {
      id: '1',
      category: 'risk',
      title: 'Non-Compete Clause',
      description: '18-month restriction on working for competitors in the same industry',
      severity: 'high',
      page: 3
    },
    {
      id: '2',
      category: 'financial',
      title: 'Stock Options',
      description: '10,000 shares vesting over 4 years with 1-year cliff',
      severity: 'low',
      page: 5
    },
    {
      id: '3',
      category: 'compliance',
      title: 'IP Assignment',
      description: 'All work-related intellectual property assigned to company',
      severity: 'medium',
      page: 4
    },
    {
      id: '4',
      category: 'opportunity',
      title: 'Professional Development',
      description: '$5,000 annual budget for training and conferences',
      severity: 'low',
      page: 6
    },
    {
      id: '5',
      category: 'timeline',
      title: 'Contract Term',
      description: '2-year initial term with automatic renewal option',
      severity: 'medium',
      page: 2
    },
    {
      id: '6',
      category: 'risk',
      title: 'Termination Clause',
      description: 'At-will employment with 30-day notice period',
      severity: 'medium',
      page: 7
    }
  ];

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
      return 'The non-compete clause in section 8.2 restricts you from working for direct competitors for 18 months after employment ends. This is longer than the typical 6-12 month period. I recommend negotiating this down to 12 months maximum, as 18 months could significantly limit your career options.';
    }
    
    if (lowerMessage.includes('salary') || lowerMessage.includes('compensation')) {
      return 'The base salary is set at $95,000 annually with performance bonuses up to 15% of base salary. This appears competitive for the role. The stock options grant 10,000 shares vesting over 4 years, which could be valuable depending on company growth.';
    }
    
    if (lowerMessage.includes('risk') || lowerMessage.includes('concern')) {
      return 'The main risks I identify are: 1) The 18-month non-compete period 2) Broad IP assignment language that may include personal projects 3) At-will employment with limited severance. The opportunities include stock options, professional development budget, and flexible work arrangements.';
    }

    if (lowerMessage.includes('intellectual property') || lowerMessage.includes('ip')) {
      return 'Section 9 assigns all "work-related" intellectual property to the company. The language is somewhat broad and could potentially include personal projects. I recommend clarifying that IP assignments only apply to work directly related to your employment duties and exclude personal projects developed on your own time.';
    }
    
    return 'I can help you understand any aspect of this employment agreement. Feel free to ask about specific clauses, compensation, benefits, or any concerns you might have about the terms.';
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <div className="min-h-screen dark-gradient-bg">
      <div className="h-screen flex flex-col">
        {/* Header */}
        <motion.header
          className="px-6 py-4 border-b border-[#424242] bg-[#141414]/80 backdrop-blur-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-[#d6d6d6] hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#FF4929] to-[#EF6537] rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-white">{file.name}</h1>
                  <p className="text-sm text-[#b8b8b8]">Deep Research Mode</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-green-500/30 text-green-400">
                <Brain className="w-3 h-3 mr-1" />
                AI Ready
              </Badge>
            </div>
          </div>
        </motion.header>

        {/* Three Panel Layout */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left Panel - AI Key Highlights */}
          <motion.aside
            className="w-80 border-r border-[#424242] bg-[#141414]/50 backdrop-blur-sm"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-[#424242]">
                <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-[#FF4929]" />
                  Key Highlights
                </h2>
                <p className="text-sm text-[#b8b8b8]">
                  AI-identified important sections and clauses
                </p>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  {keyHighlights.map((highlight, index) => (
                    <motion.div
                      key={`highlight-${highlight.id}`}
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
                            w-8 h-8 rounded-lg flex items-center justify-center
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
          </motion.aside>

          {/* Center Panel - Document Preview */}
          <motion.main
            className="flex-1 bg-[#0f0f0f]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-[#424242] bg-[#141414]/50">
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
              
              {/* PDF Viewer Placeholder */}
              <div className="flex-1 p-6 flex items-center justify-center">
                <Card className="legal-dark-container p-12 text-center max-w-md">
                  <FileText className="w-16 h-16 text-[#FF4929] mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Document Viewer</h3>
                  <p className="text-[#b8b8b8] mb-6">
                    PDF document viewer would be integrated here. Click on highlights to navigate to specific sections.
                  </p>
                  <div className="bg-[#202020] border border-[#424242] rounded-lg p-4">
                    <p className="text-sm text-[#d6d6d6] mb-2">
                      📄 {file.name}
                    </p>
                    <p className="text-xs text-[#787878]">
                      PDF rendering would show the actual document content with highlighted sections corresponding to the AI analysis.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </motion.main>

          {/* Right Panel - AI Chatbot */}
          <motion.aside
            className="w-96 border-l border-[#424242] bg-[#141414]/50 backdrop-blur-sm"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="h-full flex flex-col">
              <div className="p-6 border-b border-[#424242]">
                <h2 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#FF4929]" />
                  AI Legal Assistant
                </h2>
                <p className="text-sm text-[#b8b8b8]">
                  Ask questions about your document
                </p>
              </div>

              {/* Chat Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  <AnimatePresence>
                    {chatMessages.map((message) => (
                      <motion.div
                        key={message.id}
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
                <div ref={chatEndRef} />
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
                    "Explain the compensation",
                    "Non-compete details?"
                  ].map((question, index) => (
                    <Button
                      key={`quick-question-${index}`}
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
          </motion.aside>
        </div>
      </div>
    </div>
  );
}