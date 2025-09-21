import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Users, 
  Target, 
  Award,
  ArrowRight,
  Heart,
  Globe,
  Briefcase,
  GraduationCap,
  Building2,
  Lightbulb,
  Rocket,
  Star,
  Shield
} from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

export function AboutPage({ onBack }: AboutPageProps) {
  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "CEO & Co-Founder",
      background: "Former Google AI Research, PhD in Computer Science",
      image: "👩‍💼",
      expertise: ["AI/ML", "NLP", "Legal Tech"]
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder",
      background: "Ex-Microsoft, 15+ years in enterprise software",
      image: "👨‍💻",
      expertise: ["Cloud Architecture", "Security", "Scalability"]
    },
    {
      name: "Emily Watson",
      role: "Chief Legal Officer",
      background: "Harvard Law, Former partner at top law firm",
      image: "⚖️",
      expertise: ["Contract Law", "Compliance", "Legal Strategy"]
    },
    {
      name: "David Kim",
      role: "Head of AI Research",
      background: "PhD from Stanford, Published researcher",
      image: "🧠",
      expertise: ["Deep Learning", "Research", "Innovation"]
    }
  ];

  const milestones = [
    {
      year: "2021",
      title: "Company Founded",
      description: "Started with a vision to democratize legal document analysis",
      icon: Rocket
    },
    {
      year: "2022",
      title: "First Product Launch",
      description: "Released MVP with basic document analysis capabilities",
      icon: Star
    },
    {
      year: "2023",
      title: "AI Breakthrough",
      description: "Achieved 99.5% accuracy with our proprietary AI model",
      icon: Award
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Serving 100,000+ users across 50+ countries",
      icon: Globe
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Transparency",
      description: "We believe everyone deserves to understand the documents they sign.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Security",
      description: "Your documents and data are protected with military-grade encryption.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Constantly pushing the boundaries of what's possible with AI and legal tech.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Users,
      title: "Accessibility",
      description: "Making legal knowledge accessible to everyone, regardless of background.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen gradient-mesh particle-field">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/6 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-foreground/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            x: [0, -50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
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
            Est. 2021
          </Badge>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-20"
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
            About LegalAI
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            We're on a mission to democratize legal document understanding through 
            cutting-edge artificial intelligence, making complex legal language 
            accessible to everyone.
          </motion.p>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="glass-intense p-6 rounded-2xl">
              <div className="text-3xl font-bold text-primary mb-2">100,000+</div>
              <div className="text-sm text-muted-foreground">Documents Analyzed</div>
            </div>
            <div className="glass-intense p-6 rounded-2xl">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Countries Served</div>
            </div>
            <div className="glass-intense p-6 rounded-2xl">
              <div className="text-3xl font-bold text-primary mb-2">99.5%</div>
              <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="glass-intense h-full p-8 scan-lines">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold">Our Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To eliminate the information asymmetry in legal documents by providing 
                everyone with the tools to understand contracts, agreements, and legal 
                texts as clearly as lawyers do.
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="glass-intense h-full p-8 scan-lines">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mr-4">
                  <Lightbulb className="w-6 h-6 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold">Our Vision</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                A world where legal documents are no longer barriers to understanding, 
                but bridges to informed decision-making for individuals and businesses 
                worldwide.
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="glass-intense p-6 h-full hover:neon-border transition-all duration-300">
                  <motion.div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4 group-hover:animate-bounce-subtle`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <value.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.2 }}
              >
                <Card className="glass-intense p-6 hover:gradient-glow transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center mr-3">
                      <milestone.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <Badge variant="outline" className="neon-border">
                      {milestone.year}
                    </Badge>
                  </div>
                  <h3 className="font-semibold mb-2">{milestone.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {milestone.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
              >
                <Card className="glass-intense p-6 h-full hover:neon-border transition-all duration-300">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-3 group-hover:animate-bounce-subtle">
                      {member.image}
                    </div>
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm text-primary mb-2">{member.role}</p>
                    <p className="text-xs text-muted-foreground mb-3">
                      {member.background}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {member.expertise.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <Card className="glass-intense p-12 max-w-4xl mx-auto holographic">
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ready to be part of the legal technology revolution? Let's make legal documents 
              understandable for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="gradient-primary gradient-glow hover:scale-105 transition-transform px-8 py-4"
              >
                Get Started Today
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="glass-intense border-primary/30 hover:bg-primary/10 px-8 py-4"
              >
                Contact Us
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}