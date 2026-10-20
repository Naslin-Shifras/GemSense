import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, Zap, ShieldCheck, Lock, ArrowRight, Bot, User } from 'lucide-react';

// Mock chat conversation to display in the preview window
const chatMessages = [
  { type: 'user', text: 'Is this 2.5 carat blue sapphire a good price at LKR 350,000?', time: '10:30 AM' },
  {
    type: 'ai',
    text: 'Based on market data, a 2.5 carat blue sapphire with this quality typically ranges between LKR 320,000 – 380,000. The price you mentioned is within a fair range.',
    time: '10:31 AM'
  }
];

const AdvisorPreviewSection = () => {
  const [inputVal] = useState('Type your question...');

  return (
    <section className="py-20 border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="card p-8 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left — Promo Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="pill-badge mb-5 w-fit text-brand-purple border-brand-purple/30">
              <MessageSquare className="w-3 h-3" />
              NOT SURE ABOUT A GEM?
            </div>

            <h2 className="text-4xl font-extrabold leading-tight mb-4">
              Ask <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light to-brand-purple">AI Advisors</span>
            </h2>

            <p className="text-brand-muted text-sm leading-relaxed mb-6 max-w-sm">
              Our AI experts are here to help you with any questions about gem value, quality, and more. Get instant answers and buy with confidence.
            </p>

            <Link to="/ai-advisor" className="btn-primary mb-8 w-fit">
              <MessageSquare className="w-4 h-4" />
              Ask AI Advisor Now
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-6 text-xs text-brand-muted">
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-green-500" />
                <div><div className="text-white font-medium">Instant</div><div>Responses</div></div>
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <div><div className="text-white font-medium">Expert</div><div>Knowledge</div></div>
              </span>
              <span className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-green-500" />
                <div><div className="text-white font-medium">100%</div><div>Private</div></div>
              </span>
            </div>
          </motion.div>

          {/* Right — Chat Preview */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-brand-bg rounded-xl border border-brand-border overflow-hidden"
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-brand-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-brand-purple" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Gem Sense AI Advisor</div>
                  <div className="text-[10px] text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" /> Online
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="px-4 py-4 space-y-4 min-h-[180px]">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.type === 'ai' && (
                    <div className="w-7 h-7 rounded-full bg-brand-purple/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-3.5 h-3.5 text-brand-purple" />
                    </div>
                  )}
                  <div className={`max-w-[75%] rounded-xl p-3 text-xs leading-relaxed ${
                    msg.type === 'user'
                      ? 'bg-brand-purple text-white rounded-tr-sm'
                      : 'bg-brand-bg-card border border-brand-border text-brand-text rounded-tl-sm'
                  }`}>
                    {msg.text}
                    <div className={`text-[10px] mt-1.5 ${msg.type === 'user' ? 'text-white/60 text-right' : 'text-brand-muted'}`}>
                      {msg.time} {msg.type === 'user' && '✓✓'}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 pb-4">
              <div className="bg-brand-bg-input border border-brand-border rounded-xl flex items-center px-4 py-3 gap-3">
                <span className="text-xs text-brand-muted flex-1">{inputVal}</span>
                <button className="w-7 h-7 bg-brand-purple rounded-lg flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AdvisorPreviewSection;
