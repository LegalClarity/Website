import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Brain, 
  Shield, 
  Zap, 
  FileText, 
  Search, 
  MessageCircle,
  BarChart3,
  Clock,
  Globe,
  Lock,
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface FeaturesPageProps {
  onBack: () => void;
}

export function FeaturesPage({ onBack }: FeaturesPageProps) {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced natural language processing breaks down complex legal jargon into simple, understandable terms.",
      benefits: ["99.5% accuracy rate", "Multilingual support", "Context-aware analysis"],
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "Identify potential risks and unfavorable terms before you sign any document.",
      benefits: ["Real-time risk scoring", "Comparative analysis", "Legal precedent matching"],
      color: "from-red-500 to-orange-500"
    },
    {
      icon: Search,
      title: "Deep Document Search",
      description: "Find specific clauses, terms, and conditions instantly with intelligent search capabilities.",
      benefits: ["Semantic search", "Cross-reference detection", "Version comparison"],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: BarChart3,
      title: "Visual Analytics",
      description: "Transform complex contract structures into easy-to-understand visual representations.",
      benefits: ["Interactive flowcharts", "Risk heatmaps", "Timeline visualizations"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MessageCircle,
      title: "Interactive Q&A",
      description: "Ask questions about your documents and get instant, accurate answers from our AI assistant.",
      benefits: ["24/7 availability", "Contextual responses", "Learning from feedback"],
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "Bank-level encryption ensures your sensitive documents are always protected.",
      benefits: ["End-to-end encryption", "Zero data retention", "GDPR compliant"],
      color: "from-gray-500 to-slate-500"
    }
  ];

  const integrations = [
    { name: "Google Drive", logo: "📁" },
    { name: "Dropbox", logo: "📦" },
    { name: "OneDrive", logo: "☁️" },
    { name: "Box", logo: "📂" },
    { name: "Slack", logo: "💬" },
    { name: "Teams", logo: "👥" }
  ];

  return (
    <div className="min-h-screen gradient-mesh particle-field">
      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div
        className="relative z-10 p-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onBack}
            className="glass-intense hover:bg-primary/10 neon-border"
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back to Home
          </Button>
          
          <Badge className="holographic animate-glow">
            <Sparkles className="w-3 h-3 mr-1" />
            New Features Available
          </Badge>
        </div>
      </motion.div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.h1
            className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent"
            animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{ backgroundSize: "200%" }}
          >
            Powerful Features
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Discover the advanced capabilities that make LegalAI the most comprehensive 
            legal document analysis platform available today.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="group"
            >
              <Card className="glass-intense h-full p-6 hover:neon-border transition-all duration-300 scan-lines">
                <div className="relative">
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:animate-bounce-subtle`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.1) + (idx * 0.1) + 0.8 }}
                      >
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Performance Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {[
            { number: "99.5%", label: "Accuracy Rate", icon: "🎯" },
            { number: "<2s", label: "Analysis Time", icon: "⚡" },
            { number: "50+", label: "Languages", icon: "🌍" },
            { number: "24/7", label: "Availability", icon: "🕒" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="glass-intense p-6 rounded-2xl text-center group hover:gradient-glow"
              whileHover={{ scale: 1.05 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-primary mb-2 group-hover:animate-glow">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Integrations */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h2 className="text-3xl font-bold mb-8">Seamless Integrations</h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                className="glass p-4 rounded-xl hover:glass-intense transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + index * 0.1 }}
              >
                <div className="text-2xl mb-2">{integration.logo}</div>
                <div className="text-sm font-medium">{integration.name}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <Card className="glass-intense p-12 max-w-4xl mx-auto holographic">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience the Future?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who trust LegalAI to analyze their most important documents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="gradient-primary gradient-glow hover:scale-105 transition-transform px-8 py-4"
              >
                Start Free Trial
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="glass-intense border-primary/30 hover:bg-primary/10 px-8 py-4"
              >
                Schedule Demo
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}