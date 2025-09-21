import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users, 
  DollarSign, 
  ArrowDown, 
  ArrowRight,
  Brain,
  Shield,
  Scale,
  Eye,
  MessageSquare,
  TrendingUp
} from 'lucide-react';

interface DocumentAnalysisProps {
  file: File;
  onUnderstand: () => void;
}

interface AnalysisData {
  summary: string;
  keyPoints: string[];
  riskLevel: 'low' | 'medium' | 'high';
  risks: Array<{ type: string; description: string; severity: 'low' | 'medium' | 'high' }>;
  opportunities: string[];
  recommendations: string[];
  flowSteps: Array<{ 
    id: string; 
    title: string; 
    description: string; 
    type: 'process' | 'decision' | 'outcome' | 'risk';
    connections: string[];
  }>;
}

export function DocumentAnalysis({ file, onUnderstand }: DocumentAnalysisProps) {
  const [activeTab, setActiveTab] = useState('analysis');
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  // Mock analysis data - in real app this would come from API
  const mockAnalysisData: AnalysisData = {
    summary: "This Employment Agreement establishes the terms of employment between TechCorp Inc. and the Employee for a Software Engineer position. The contract includes standard employment terms with some potentially favorable and concerning clauses that require attention.",
    keyPoints: [
      "2-year initial term with automatic renewal clauses",
      "Non-compete agreement extending 18 months post-employment",
      "Intellectual property assignment covers all work-related inventions",
      "Severance package includes 6 months salary continuation",
      "Stock option vesting schedule over 4 years with 1-year cliff"
    ],
    riskLevel: 'medium',
    risks: [
      { 
        type: "Non-Compete Clause", 
        description: "18-month non-compete period may limit future employment opportunities", 
        severity: 'high' 
      },
      { 
        type: "IP Assignment", 
        description: "Broad intellectual property assignment may include personal projects", 
        severity: 'medium' 
      },
      { 
        type: "Termination Terms", 
        description: "At-will employment with limited severance protections", 
        severity: 'low' 
      }
    ],
    opportunities: [
      "Stock options with potential for significant value",
      "Professional development budget of $5,000 annually",
      "Flexible work arrangements including remote work options",
      "Comprehensive health benefits with company contribution"
    ],
    recommendations: [
      "Negotiate shorter non-compete period (6-12 months maximum)",
      "Clarify intellectual property assignment scope for personal projects",
      "Request additional severance protection in case of company acquisition",
      "Ensure stock option exercise period extends beyond employment termination"
    ],
    flowSteps: [
      {
        id: 'start',
        title: 'Employment Offer Received',
        description: 'TechCorp Inc. extends offer for Software Engineer position',
        type: 'process',
        connections: ['review']
      },
      {
        id: 'review',
        title: 'Contract Review Period',
        description: '14-day review period for terms and conditions',
        type: 'decision',
        connections: ['negotiate', 'accept']
      },
      {
        id: 'negotiate',
        title: 'Negotiate Terms',
        description: 'Discussion of salary, benefits, and contract clauses',
        type: 'process',
        connections: ['revised']
      },
      {
        id: 'accept',
        title: 'Accept Original Terms',
        description: 'Proceed with contract as initially offered',
        type: 'decision',
        connections: ['execute']
      },
      {
        id: 'revised',
        title: 'Revised Contract',
        description: 'Updated terms based on negotiations',
        type: 'process',
        connections: ['final_review']
      },
      {
        id: 'final_review',
        title: 'Final Review',
        description: 'Legal review of negotiated terms',
        type: 'decision',
        connections: ['execute', 'further_negotiate']
      },
      {
        id: 'further_negotiate',
        title: 'Additional Negotiations',
        description: 'Further discussions if terms are unsatisfactory',
        type: 'process',
        connections: ['revised']
      },
      {
        id: 'execute',
        title: 'Contract Execution',
        description: 'Both parties sign the employment agreement',
        type: 'outcome',
        connections: ['onboard']
      },
      {
        id: 'onboard',
        title: 'Employee Onboarding',
        description: 'Begin employment with agreed terms and conditions',
        type: 'outcome',
        connections: []
      }
    ]
  };

  useEffect(() => {
    // Simulate analysis process
    const analyzeDocument = async () => {
      setIsAnalyzing(true);
      
      // Simulate progress
      for (let i = 0; i <= 100; i += 5) {
        setAnalysisProgress(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      // Set analysis data
      setTimeout(() => {
        setAnalysisData(mockAnalysisData);
        setIsAnalyzing(false);
      }, 1000);
    };

    analyzeDocument();
  }, [file]);

  const getRiskColor = (severity: 'low' | 'medium' | 'high') => {
    switch (severity) {
      case 'low': return 'text-green-500 bg-green-500/10';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10';
      case 'high': return 'text-red-500 bg-red-500/10';
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

  const renderFlowChart = () => {
    if (!analysisData) return null;

    return (
      <div className="flex flex-col items-center space-y-6 py-8">
        {analysisData.flowSteps.map((step, index) => (
          <motion.div
            key={step.id}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            {/* Step Card */}
            <Card className={`
              legal-dark-container w-80 transition-all duration-300 hover:scale-105
              ${step.type === 'risk' ? 'border-red-500/30' : 'border-[#424242]'}
              ${step.type === 'outcome' ? 'border-green-500/30' : ''}
            `}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center
                    ${step.type === 'decision' ? 'bg-blue-500/20 text-blue-400' : ''}
                    ${step.type === 'process' ? 'bg-purple-500/20 text-purple-400' : ''}
                    ${step.type === 'outcome' ? 'bg-green-500/20 text-green-400' : ''}
                    ${step.type === 'risk' ? 'bg-red-500/20 text-red-400' : ''}
                  `}>
                    {getStepIcon(step.type)}
                  </div>
                  <CardTitle className="text-lg text-white">{step.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[#b8b8b8] text-sm">{step.description}</p>
                <Badge variant="secondary" className="mt-2 capitalize">
                  {step.type}
                </Badge>
              </CardContent>
            </Card>

            {/* Arrow Connector */}
            {index < analysisData.flowSteps.length - 1 && (
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
      <div className="max-w-6xl mx-auto px-8 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">Document Analysis Complete</h1>
          <p className="text-[#d6d6d6] mb-6">
            AI analysis of <span className="text-[#FF4929] font-medium">{file.name}</span>
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge className={`${getRiskColor(analysisData?.riskLevel || 'medium')} border-none`}>
              Risk Level: {analysisData?.riskLevel?.toUpperCase()}
            </Badge>
            <Badge variant="outline" className="border-[#424242] text-[#d6d6d6]">
              <Clock className="w-3 h-3 mr-1" />
              Analyzed in 28 seconds
            </Badge>
          </div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-[#202020] border border-[#424242] p-1 rounded-2xl">
              <TabsTrigger 
                value="analysis" 
                className="data-[state=active]:bg-[#FF4929] data-[state=active]:text-white rounded-xl px-6 py-2"
              >
                <Brain className="w-4 h-4 mr-2" />
                Analysis
              </TabsTrigger>
              <TabsTrigger 
                value="flow" 
                className="data-[state=active]:bg-[#FF4929] data-[state=active]:text-white rounded-xl px-6 py-2"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Flow Chart
              </TabsTrigger>
            </TabsList>
          </div>

          <AnimatePresence mode="wait">
            <TabsContent value="analysis" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Document Summary */}
                <Card className="legal-dark-container">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white">
                      <FileText className="w-5 h-5 text-[#FF4929]" />
                      Document Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#d6d6d6] leading-relaxed">{analysisData?.summary}</p>
                  </CardContent>
                </Card>

                {/* Key Points */}
                <Card className="legal-dark-container">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white">
                      <Eye className="w-5 h-5 text-[#FF4929]" />
                      Key Points
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {analysisData?.keyPoints.map((point, index) => (
                        <motion.li
                          key={`keypoint-${index}`}
                          className="flex items-start gap-3 text-[#d6d6d6]"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          {point}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Risks and Opportunities Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Risks */}
                  <Card className="legal-dark-container">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-white">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        Identified Risks
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {analysisData?.risks.map((risk, index) => (
                          <motion.div
                            key={`risk-${index}`}
                            className="border border-[#424242] rounded-xl p-4"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium text-white">{risk.type}</h4>
                              <Badge className={getRiskColor(risk.severity)}>{risk.severity}</Badge>
                            </div>
                            <p className="text-sm text-[#b8b8b8]">{risk.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Opportunities */}
                  <Card className="legal-dark-container">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-white">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        Opportunities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {analysisData?.opportunities.map((opportunity, index) => (
                          <motion.li
                            key={`opportunity-${index}`}
                            className="flex items-start gap-3 text-[#d6d6d6]"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            {opportunity}
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Recommendations */}
                <Card className="legal-dark-container">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white">
                      <Shield className="w-5 h-5 text-[#FF4929]" />
                      AI Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {analysisData?.recommendations.map((recommendation, index) => (
                        <motion.div
                          key={`recommendation-${index}`}
                          className="bg-[#202020] border border-[#424242] rounded-xl p-4"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <p className="text-[#d6d6d6] text-sm">{recommendation}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="flow">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="legal-dark-container">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-white text-center justify-center">
                      <Scale className="w-5 h-5 text-[#FF4929]" />
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
          </AnimatePresence>
        </Tabs>

        {/* Action Button */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            onClick={onUnderstand}
            className="bg-gradient-to-r from-[#FF4929] to-[#EF6537] text-white hover:from-[#EF6537] hover:to-[#BD3F14] px-12 py-4 text-lg font-medium rounded-full"
          >
            I Understand - Proceed to Deep Research
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}