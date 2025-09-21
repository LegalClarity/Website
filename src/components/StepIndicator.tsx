import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
  className?: string;
}

export function StepIndicator({ 
  currentStep, 
  totalSteps, 
  stepLabels = [], 
  className = "" 
}: StepIndicatorProps) {
  return (
    <div className={`flex items-center justify-center space-x-4 ${className}`}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <div key={index} className="flex items-center">
          <motion.div
            className={`relative w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm border-2 transition-all duration-300 ${
              index < currentStep
                ? 'bg-green-500 border-green-500 text-white'
                : index === currentStep
                ? 'bg-primary border-primary text-primary-foreground animate-pulse'
                : 'bg-muted border-muted text-muted-foreground'
            }`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
          >
            {index < currentStep ? (
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <CheckCircle className="w-5 h-5" />
              </motion.div>
            ) : (
              <span>{index + 1}</span>
            )}
            
            {/* Glow effect for current step */}
            {index === currentStep && (
              <motion.div
                className="absolute inset-0 rounded-full bg-primary"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.div>
          
          {/* Step label */}
          {stepLabels[index] && (
            <motion.div
              className="absolute mt-12 text-xs text-center min-w-20"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {stepLabels[index]}
            </motion.div>
          )}
          
          {/* Connector line */}
          {index < totalSteps - 1 && (
            <motion.div
              className={`w-12 h-0.5 mx-2 transition-colors duration-500 ${
                index < currentStep ? 'bg-green-500' : 'bg-muted'
              }`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}