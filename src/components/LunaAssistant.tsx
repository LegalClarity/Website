import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import imgUnnamed3 from "figma:asset/a56da53c0284ef4970de70a062da6286773f1235.png";

interface LunaAssistantProps {
  context?: 'landing' | 'upload' | 'analysis' | 'research';
}

export function LunaAssistant({ context = 'landing' }: LunaAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);

  const tips = {
    landing: [
      "Hi! I'm Luna, your AI legal assistant. I'm here to help you understand any legal document!",
      "Click 'Start with Luna' to upload your first document and see what I can do.",
      "I can analyze contracts, terms of service, privacy policies, and more in seconds!"
    ],
    upload: [
      "Drag and drop your legal document here, or click to browse your files.",
      "I support PDF, DOC, DOCX, and TXT files up to 10MB.",
      "Don't worry - your documents are processed securely and never stored."
    ],
    analysis: [
      "I'm analyzing your document right now! This usually takes just a few seconds.",
      "I'm looking for key clauses, potential risks, and important terms you should know about.",
      "Once I'm done, I'll show you a clear summary and highlight anything concerning."
    ],
    research: [
      "Welcome to deep research mode! Here you can explore every detail of your document.",
      "Ask me specific questions about any clause or term - I'm here to help!",
      "Use the chat to dive deeper into anything you don't understand."
    ]
  };

  const contextTips = tips[context] || tips.landing;

  return (
    <>
      {/* Floating Luna Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            y: [0, -10, 0],
            boxShadow: [
              "0 0 20px rgba(239, 101, 55, 0.3)",
              "0 0 30px rgba(239, 101, 55, 0.5)",
              "0 0 20px rgba(239, 101, 55, 0.3)"
            ]
          }}
          transition={{
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            boxShadow: { duration: 2, repeat: Infinity }
          }}
        >
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="w-16 h-16 rounded-full gradient-primary gradient-glow neon-border p-0 overflow-hidden relative"
          >
            <img 
              src={imgUnnamed3} 
              alt="Luna AI Assistant" 
              className="w-full h-full object-cover"
            />
            <motion.div
              className="absolute inset-0 bg-primary/20"
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {!isOpen && (
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </Button>
        </motion.div>
      </motion.div>

      {/* Luna Chat Bubble */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-80"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass-intense p-4 neon-border">
              <div className="flex items-start space-x-3 mb-3">
                <motion.div 
                  className="w-10 h-10 rounded-full overflow-hidden gradient-glow flex-shrink-0"
                  animate={{ 
                    boxShadow: [
                      "0 0 10px rgba(239, 101, 55, 0.3)",
                      "0 0 20px rgba(239, 101, 55, 0.5)",
                      "0 0 10px rgba(239, 101, 55, 0.3)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <img 
                    src={imgUnnamed3} 
                    alt="Luna" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <span className="font-semibold text-primary">Luna</span>
                      <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="w-6 h-6 p-0 hover:bg-primary/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">AI Legal Assistant</p>
                </div>
              </div>

              <motion.div
                key={currentTip}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-primary/10 rounded-lg p-3 mb-3"
              >
                <p className="text-sm leading-relaxed">{contextTips[currentTip]}</p>
              </motion.div>

              <div className="flex items-center justify-between">
                <div className="flex space-x-1">
                  {contextTips.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTip(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentTip ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentTip(Math.max(0, currentTip - 1))}
                    disabled={currentTip === 0}
                    className="text-xs px-2 py-1 h-auto"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentTip(Math.min(contextTips.length - 1, currentTip + 1))}
                    disabled={currentTip === contextTips.length - 1}
                    className="text-xs px-2 py-1 h-auto"
                  >
                    Next
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}