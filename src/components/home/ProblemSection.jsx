import React from 'react';
import { motion } from 'framer-motion';

const factors = [
  { name: "Type", desc: "Sapphire, Ruby, Spinel, Alexandrite, etc." },
  { name: "Colour", desc: "Hue, tone, and saturation intensity." },
  { name: "Clarity", desc: "Presence of inclusions or blemishes." },
  { name: "Carat", desc: "Weight of the gemstone." },
  { name: "Cut", desc: "Proportions, symmetry and polish." },
  { name: "Treatment", desc: "Heat or other enhancements." }
];

const ProblemSection = () => (
  <section className="py-20 border-t border-brand-border">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-4xl font-extrabold mb-4">
          Gemstone Value Shouldn't<br /> Be a Guess.
        </h2>
        <p className="text-brand-muted text-sm leading-relaxed">
          Traditional valuation often depends heavily on expert judgement. GemSense AI provides a data-driven reference based on six core valuation factors.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10">
        {factors.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="card p-5 rounded-xl hover:-translate-y-1 transition-transform duration-200"
          >
            <h3 className="text-base font-semibold text-brand-purple-light mb-1">{f.name}</h3>
            <p className="text-xs text-brand-muted">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto border border-yellow-500/20 bg-yellow-500/5 rounded-xl p-4 text-center">
        <p className="text-xs text-yellow-400/80">
          <span className="font-semibold text-yellow-400">Disclaimer: </span>
          GemSense AI provides estimated market insights and does not replace professional gemstone certification or laboratory authentication.
        </p>
      </div>
    </div>
  </section>
);

export default ProblemSection;
