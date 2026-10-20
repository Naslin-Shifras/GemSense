import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, MessageSquare, ShieldCheck, Lock } from 'lucide-react';
import heroGems from '../../assets/hero-gems.png';

const Hero = () => {
  return (
    <section
      className="relative min-h-[calc(100vh-64px)] flex items-center overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${heroGems})`,
      }}
    >
      {/* Dark left-to-right gradient for text readability */}
<div
  className="absolute inset-0 pointer-events-none"
  style={{
    background:
      'linear-gradient(to right, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.82) 32%, rgba(2,6,23,0.42) 58%, rgba(2,6,23,0.10) 100%)',
  }}
/>

      {/* Purple radial glow top-right */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at top right, rgba(124,58,237,0.25) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full py-20 relative z-10">

        {/* Left — Text Content */}
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="pill-badge mb-6 w-fit"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
            500+ Real Gem Data. Expert Knowledge. AI Power.
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6"
          >
            AI-Powered<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light to-brand-purple">
              Gem Price
            </span><br />
            Prediction
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-brand-muted text-base md:text-lg leading-relaxed max-w-md mb-8"
          >
            We analyze 500+ real gem data points with expert knowledge and AI
            to predict fair prices and provide smart advice for buyers and
            sellers.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-10"
          >
            <Link to="/predict" className="btn-primary px-7 py-3 text-base">
              <Sparkles className="w-4 h-4" />
              Predict Gem Price
            </Link>

            <Link to="/ai-advisor" className="btn-outline px-7 py-3 text-base">
              <MessageSquare className="w-4 h-4" />
              Ask AI Advisor
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-6 text-sm text-brand-muted"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              Trusted by gem enthusiasts worldwide
            </span>

            <span className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-green-500" />
              Secure &amp; Private
            </span>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
