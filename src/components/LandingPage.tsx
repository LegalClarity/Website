import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Search, Menu, ArrowRight, ChevronDown, Shield, FileText, Brain, Scale, Gavel, BookOpen, Zap } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import svgPaths from '../imports/svg-85hlve0zg7';

interface LandingPageProps {
  onGetStarted: () => void;
  onFeaturesClick: () => void;
  onAboutClick: () => void;
}

export function LandingPage({ onGetStarted, onFeaturesClick, onAboutClick }: LandingPageProps) {
  // Legal professional profile data for floating cards
  const profiles = [
    { name: "Sarah Chen", role: "Corporate Lawyer", avatar: "SC", color: "bg-[#c2d6ff]" },
    { name: "Michael Rodriguez", role: "Contract Specialist", avatar: "MR", color: "bg-[#e2e4e9]" },
    { name: "Emily Johnson", role: "Legal Analyst", avatar: "EJ", color: "bg-[#cac2ff]" },
    { name: "David Kim", role: "Compliance Officer", avatar: "DK", color: "bg-[#c2d6ff]" },
    { name: "Lisa Thompson", role: "Risk Assessor", avatar: "LT", color: "bg-[#cac2ff]" },
    { name: "James Wilson", role: "Legal Tech Expert", avatar: "JW", color: "bg-[#e2e4e9]" }
  ];

  const LegalLensLogo = () => (
    <div className="flex items-center space-x-3">
      <div className="relative w-12 h-12">
        {/* Search icon from SVG paths */}
        <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 57 56">
          <g>
            <path d={svgPaths.p17786600} fill="#BD3F14" />
            <path d={svgPaths.p1b5e7d80} fill="#EF6537" />
          </g>
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-white leading-tight">Legal</span>
        <span className="text-sm font-bold text-[#d6d6d6] leading-tight">Lens</span>
      </div>
    </div>
  );

  const KeyboardKey = ({ letter }: { letter: string }) => (
    <div className="bg-[#202020] opacity-75 rounded-lg shrink-0">
      <div className="flex gap-1 items-center justify-start overflow-hidden px-2.5 py-0.5 relative">
        <div className="h-1.5 relative shrink-0 w-2">
          <div className="absolute inset-[-10%_-5.83%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 7">
              <path d={svgPaths.pcb5d680} stroke="#D6D6D6" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <div className="font-medium text-[#d6d6d6] text-sm text-center text-nowrap">
          {letter}
        </div>
      </div>
      <div className="absolute border-2 border-[#424242] border-solid inset-0 pointer-events-none rounded-lg shadow-[0px_3.5px_0px_0px_#424242]" />
    </div>
  );

  return (
    <div className="min-h-screen dark-gradient-bg relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-repeat" style={{ 
          backgroundSize: '1024px 1024px',
          backgroundPosition: 'top left'
        }} />
      </div>

      {/* Header Navigation */}
      <motion.header
        className="w-full px-8 py-6 flex items-center justify-between relative z-10 backdrop-blur-xl bg-[#141414]/40 border-b border-[rgba(255,255,255,0.1)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          background: 'rgba(20, 20, 20, 0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
        }}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.02 }}
        >
          <LegalLensLogo />
        </motion.div>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center space-x-10">
          <div className="flex items-center gap-3">
            <button 
              onClick={onAboutClick}
              className="text-[#d6d6d6] hover:text-white transition-colors font-medium"
            >
              About Us
            </button>
            <KeyboardKey letter="A" />
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={onFeaturesClick}
              className="text-[#d6d6d6] hover:text-white transition-colors font-medium"
            >
              Services
            </button>
            <KeyboardKey letter="S" />
          </div>
          
          <div className="flex items-center gap-3">
            <button className="text-[#d6d6d6] hover:text-white transition-colors font-medium">
              Pricing
            </button>
            <KeyboardKey letter="P" />
          </div>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          <Button className="bg-[#292929] text-white hover:bg-[#424242] rounded-full px-6 py-2 font-medium hidden md:inline-flex">
            Create Account For Free
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden bg-[#292929] text-white rounded-full p-2"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-8">
        {/* Centered Hero Text */}
        <motion.div
          className="text-center pt-20 pb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Simplify your legal documents.<br />
            Smarter.
          </motion.h1>
          
          <motion.p
            className="text-lg text-[#d6d6d6] max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Powerful AI-powered legal document analysis to help you understand, analyze, and extract insights from complex legal documents. Trusted by over 4,000 legal professionals.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="flex flex-col items-center justify-center gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="h-[52px] relative w-[320px]">
              <div className="absolute h-[52px] left-0 top-0 w-[320px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 320 52">
                  <g>
                    <path d={svgPaths.p3dcc3100} fill="#FF4929" />
                    <path d={svgPaths.p3dcc3100} fill="url(#paint0_linear)" fillOpacity="0.15" />
                  </g>
                  <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear" x1="160" x2="160" y1="0" y2="52">
                      <stop stopColor="#BEBEBE" />
                      <stop offset="0.84" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <button
                onClick={onGetStarted}
                className="absolute flex flex-col font-normal justify-center leading-[0] left-[134px] text-lg text-center text-nowrap text-white top-[26px] translate-x-[-50%] translate-y-[-50%] [text-shadow:#ffffff_0px_0px_0.5px]"
              >
                Analyze Document For Free
              </button>
              <div className="absolute flex items-center justify-center left-[289px] size-[10px] top-[21px]">
                <div className="flex-none scale-y-[-100%]">
                  <div className="relative size-[10px]">
                    <div className="absolute inset-[-10%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                        <path d="M1 1L11 11M11 11V1M11 11H1" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* User Reviews */}
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={`user-avatar-${i}`} className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-200 to-purple-200 border-2 border-[#121212]" />
              ))}
            </div>
            <div className="flex flex-col items-start">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={`star-${i}`} className="w-5 h-5" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                    <path d={svgPaths.p2f878000} fill="#FEC84B" />
                  </svg>
                ))}
                <span className="text-white ml-2">5.0</span>
              </div>
              <span className="text-[#b8b8b8] text-sm">from 200+ reviews</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Feature Cards Section */}
        <motion.div
          className="pb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            
            {/* Main Feature Card - Document Analysis */}
            <div className="legal-dark-container p-6 relative">
              <div className="flex gap-3 items-start mb-4">
                <div className="p-2 bg-gradient-to-br from-[#FF4929] to-[#EF6537] rounded-xl">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-[#f0f0f0] mb-1">
                    AI-Powered Document Analysis
                  </h3>
                  <p className="text-[#787878] text-sm">
                    Instantly analyze legal documents with advanced AI
                  </p>
                </div>
              </div>
              
              {/* Sample user avatars */}
              <div className="flex gap-1 mb-4">
                {profiles.slice(0, 5).map((profile, i) => (
                  <div
                    key={`profile-avatar-${i}`}
                    className={`w-10 h-10 ${profile.color} rounded-full flex items-center justify-center text-[#292929] text-sm font-semibold border-2 border-[#292929]`}
                  >
                    {profile.avatar}
                  </div>
                ))}
              </div>
              
              <Button className="w-full bg-[#292929] hover:bg-[#424242] text-white rounded-full border border-[#424242]">
                Try Analysis
              </Button>
            </div>

            {/* Stats Card */}
            <div className="legal-dark-container p-6 flex flex-col justify-center">
              <div className="text-center">
                <div className="text-3xl font-medium text-[#f0f0f0] mb-2">78%</div>
                <p className="text-[#787878] text-sm">
                  Of businesses don't check their <span className="text-[#d6d6d6]">legal risks</span>.
                </p>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="legal-dark-container p-6 flex flex-col justify-center">
              <div className="flex items-center gap-3">
                <div className="text-3xl font-medium text-[#f0f0f0]">$2.1K</div>
                <p className="text-[#787878] text-sm flex-1">
                  Average cost to fix a <span className="text-[#d6d6d6]">legal oversight</span>.
                </p>
              </div>
            </div>

            {/* Visual Feature Card */}
            <div className="md:col-span-2 lg:col-span-1 legal-dark-container h-[244px] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF4929]/10 to-[#EF6537]/5" />
              <div className="absolute bottom-4 right-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1B1C1F] to-[#232628] rounded-xl border border-[#2D2E31] flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                    <path d={svgPaths.p2df400} fill="white" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Analytics Visualization */}
            <div className="md:col-span-2 legal-dark-container p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-[#f0f0f0]">Document Insights</h3>
                <div className="flex gap-1">
                  {[1, 1, 0, 1].map((active, i) => (
                    <div
                      key={`indicator-dot-${i}`}
                      className={`w-3 h-3 rounded-full ${
                        active ? 'bg-[#a93521] shadow-[0px_1.5px_0px_0px_inset_#f89281]' : 'bg-[#424242] shadow-[0px_1.5px_0px_0px_inset_rgba(241,241,241,0.27)]'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-medium text-[#f0f0f0]">94%</div>
                  <div className="text-xs text-[#787878]">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-medium text-[#f0f0f0]">&lt; 30s</div>
                  <div className="text-xs text-[#787878]">Analysis Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-medium text-[#f0f0f0]">12K+</div>
                  <div className="text-xs text-[#787878]">Documents</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          className="py-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Intelligent Legal Document Analysis</h2>
              <p className="text-lg text-[#d6d6d6] max-w-2xl mx-auto">
                Leverage advanced AI to understand, analyze, and extract insights from any legal document
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: FileText,
                  title: "Smart Document Upload",
                  description: "Upload contracts, agreements, and legal documents in any format for instant AI analysis"
                },
                {
                  icon: Brain,
                  title: "AI-Powered Analysis",
                  description: "Advanced natural language processing identifies key clauses, terms, and potential risks"
                },
                {
                  icon: Shield,
                  title: "Risk Assessment",
                  description: "Comprehensive risk evaluation with recommendations to protect your interests"
                },
                {
                  icon: Scale,
                  title: "Legal Compliance",
                  description: "Ensure your documents meet legal standards and regulatory requirements"
                },
                {
                  icon: Gavel,
                  title: "Contract Review",
                  description: "Detailed contract analysis highlighting important terms and potential issues"
                },
                {
                  icon: BookOpen,
                  title: "Plain English Summary",
                  description: "Complex legal language translated into clear, understandable explanations"
                }
              ].map((feature, index) => (
                <motion.div
                  key={`main-feature-${index}`}
                  className="dark-glass-card p-8 rounded-3xl hover:bg-[rgba(20,20,20,0.9)] transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.0 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF4929] to-[#EF6537] rounded-2xl flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-[#b8b8b8] leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="py-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.6 }}
        >
          <h2 className="text-5xl font-bold text-white mb-6">Ready to Simplify Legal Documents?</h2>
          <p className="text-lg text-[#d6d6d6] mb-10 max-w-2xl mx-auto">
            Join thousands of legal professionals who trust Legal Lens for clear, actionable document insights.
          </p>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={onGetStarted}
              className="bg-[#FF4929] text-white hover:bg-[#EF6537] rounded-full px-12 py-6 text-lg font-medium"
            >
              Start Free Analysis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
          <p className="text-sm text-[#b8b8b8] mt-6">
            No signup required • Results in 30 seconds • Enterprise security
          </p>
        </motion.div>
      </div>
    </div>
  );
}