import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const LoadingAnalysis = () => {
  const [step, setStep] = useState(0);
  
  const steps = [
    "Validating gemstone characteristics...",
    "Processing market attributes...",
    "Running valuation model...",
    "Generating market insight..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 600); // 600ms per step

    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="flex flex-col items-center justify-center py-20">
      
      <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
        {/* Animated Rings */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 4, ease: "linear", repeat: Infinity }}
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-gem-blue border-r-gem-blue opacity-70"
        ></motion.div>
        
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 3, ease: "linear", repeat: Infinity }}
          className="absolute inset-2 rounded-full border-2 border-transparent border-b-gem-emerald border-l-gem-emerald opacity-60"
        ></motion.div>

        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
          className="absolute inset-8 rounded-full bg-gem-gold/20 blur-md"
        ></motion.div>
        
        <Loader2 className="w-8 h-8 text-gem-gold animate-spin" />
      </div>

      <div className="h-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-lg font-medium text-white/80"
          >
            {steps[step]}
          </motion.p>
        </AnimatePresence>
      </div>

    </div>
  );
};

export default LoadingAnalysis;
