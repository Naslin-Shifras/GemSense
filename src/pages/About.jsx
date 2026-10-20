import React from 'react';
import PageTransition from '../components/common/PageTransition';
import { Database, BrainCircuit, LineChart, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <PageTransition>
      <div className="py-12">
        {/* Hero */}
        <div className="bg-gem-dark border-b border-white/5 py-16 mb-12">
          <div className="container mx-auto px-6 max-w-7xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">
              Bringing Data Intelligence to <br/> Sri Lankan Gemstone Valuation
            </h1>
            <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              GemSense AI was developed to explore how Naslin Shifrasand artificial intelligence can support more transparent gemstone price estimation in the Sri Lankan gem market.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-6 max-w-7xl space-y-24 pb-12">
          
          {/* Problem & Approach */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold font-serif mb-6 text-gem-gold">The Problem</h2>
              <p className="text-white/70 leading-relaxed">
                Gemstone values often rely heavily on specialist judgement and market experience. This can make the gemstone trade opaque for new buyers, investors, or casual sellers. Traditional valuation lacks a universally accessible, data-driven baseline for comparison.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold font-serif mb-6 text-gem-emerald">Our Approach</h2>
              <p className="text-white/70 leading-relaxed">
                Combine structured local gemstone records with machine-learning regression models. By analyzing hundreds of past transactions and market valuations based on key attributes (Type, Color, Clarity, Carat, Cut, Treatment), we can establish an estimated market baseline.
              </p>
            </div>
          </div>

          {/* Architecture/Technology */}
          <div>
            <h2 className="text-3xl font-bold font-serif mb-10 text-center">System Architecture</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Code2 />, title: "React & Vite", desc: "Fast, responsive frontend presentation layer." },
                { icon: <BrainCircuit />, title: "FastAPI & ML", desc: "Python-based backend serving our regression models." },
                { icon: <Database />, title: "MySQL", desc: "Relational database for secure user and history storage." },
                { icon: <LineChart />, title: "Gemini AI", desc: "Large Language Model powering our advisory assistant." }
              ].map((tech, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-panel p-6 rounded-2xl text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-gem-gold">
                    {tech.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{tech.title}</h3>
                  <p className="text-sm text-white/60">{tech.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ML Approach */}
          <div className="glass-panel-dark p-8 md:p-12 rounded-3xl border border-gem-blue/20">
            <h2 className="text-3xl font-bold font-serif mb-6">Naslin ShifrasApproach</h2>
            <p className="text-white/70 leading-relaxed mb-6">
              The core prediction engine uses supervised machine learning. Random Forest and XGBoost regression algorithms are evaluated on our dataset of Sri Lankan gemstone records, and the better-performing model is selected for deployment. The model learns non-linear relationships between gemstone characteristics (like how carat weight exponentially increases value for high-clarity sapphires) to predict the market price.
            </p>
            
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-red-400 mb-2">Important Limitation</h3>
              <p className="text-sm text-white/80 leading-relaxed">
                GemSense AI supports market-price estimation based on user-provided data. It does NOT physically authenticate gemstones or replace certified gem laboratories/gemologists. Our tool is an educational and advisory reference.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold font-serif mb-6">Project Vision</h2>
            <p className="text-xl text-white/70 leading-relaxed font-light italic">
              "Improve accessibility, transparency and data-driven decision support for gemstone buyers and sellers across Sri Lanka and beyond."
            </p>
          </div>

        </div>
      </div>
    </PageTransition>
  );
};

export default About;
