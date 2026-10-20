import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, BarChart3, MessageSquare, BookOpen, History, FileText } from 'lucide-react';

const features = [
  { icon: BrainCircuit, title: "AI Price Prediction", desc: "Estimate gemstone value using ML models trained on Sri Lankan market records.", color: "text-brand-purple" },
  { icon: BarChart3, title: "Market Value Analysis", desc: "See whether a quoted price is overvalued, fairly valued or undervalued.", color: "text-blue-400" },
  { icon: MessageSquare, title: "AI Gem Advisor", desc: "Ask gemstone questions in natural language to our AI assistant.", color: "text-purple-400" },
  { icon: BookOpen, title: "Gem Guide", desc: "Learn about gemstone types and key valuation factors.", color: "text-green-400" },
  { icon: History, title: "Prediction History", desc: "Review your previous gemstone assessments and track market insights.", color: "text-yellow-400" },
  { icon: FileText, title: "Valuation Report", desc: "Download PDF valuation reports with prediction information.", color: "text-red-400" }
];

const Features = () => (
  <section className="py-20 border-t border-brand-border">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold mb-3">Powerful Features</h2>
        <p className="text-brand-muted text-sm">Everything you need to make informed gemstone decisions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="card p-6 rounded-xl hover:-translate-y-1 hover:border-brand-border-light transition-all duration-200 group"
          >
            <div className="w-11 h-11 rounded-lg bg-brand-bg-input border border-brand-border flex items-center justify-center mb-5 group-hover:border-brand-purple/50 transition-colors">
              <f.icon className={`w-5 h-5 ${f.color}`} />
            </div>
            <h3 className="font-semibold text-white mb-2 text-sm">{f.title}</h3>
            <p className="text-xs text-brand-muted leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
