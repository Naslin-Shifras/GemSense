import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const reviews = [
  {
    text: 'Gem Sense AI helped me price my sapphire perfectly. The AI advice was spot on!',
    author: 'Sanduni Perera',
    avatar: 'SP',
    stars: 5,
  },
  {
    text: 'Great experience! The price prediction was accurate and the advisor provided valuable insights.',
    author: 'Dilshan Fernando',
    avatar: 'DF',
    stars: 5,
  },
  {
    text: 'Very useful for buyers like me. I can now buy gems with confidence knowing the right price.',
    author: 'Nethmi Silva',
    avatar: 'NS',
    stars: 5,
  },
];

const TrustpilotStars = ({ count = 5 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
    ))}
  </div>
);

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => setCurrentIndex((i) => (i === 0 ? reviews.length - 1 : i - 1));
  const next = () => setCurrentIndex((i) => (i === reviews.length - 1 ? 0 : i + 1));

  return (
    <section className="py-20 border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="card p-8">
          <div className="flex items-center gap-6">

            {/* Prev Arrow */}
            <button onClick={prev} className="flex-shrink-0 w-9 h-9 border border-brand-border rounded-full flex items-center justify-center text-brand-muted hover:text-white hover:border-brand-border-light transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Trustpilot Badge */}
            <div className="hidden md:flex flex-col items-start min-w-[180px] border-r border-brand-border pr-8">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-green-400 font-bold text-lg tracking-tight">★ Trustpilot</div>
              </div>
              <div className="flex gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-6 h-6 rounded-sm flex items-center justify-center ${i < 4 ? 'bg-green-500' : 'bg-green-400'}`}>
                    <Star className="w-3.5 h-3.5 text-white fill-white" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-bold text-white">4.8 out of 5</p>
              <p className="text-xs text-brand-muted">Trusted by gem enthusiasts worldwide</p>
            </div>

            {/* Review Cards */}
            <div className="flex-1 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[0, 1, 2].map((offset) => {
                  const review = reviews[(currentIndex + offset) % reviews.length];
                  return (
                    <motion.div
                      key={currentIndex + offset}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: offset * 0.08 }}
                      className="hidden md:block"
                    >
                      <ReviewCard review={review} />
                    </motion.div>
                  );
                })}
                {/* Mobile: show single */}
                <div className="md:hidden">
                  <ReviewCard review={reviews[currentIndex]} />
                </div>
              </div>
            </div>

            {/* Next Arrow */}
            <button onClick={next} className="flex-shrink-0 w-9 h-9 border border-brand-border rounded-full flex items-center justify-center text-brand-muted hover:text-white hover:border-brand-border-light transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const ReviewCard = ({ review }) => (
  <div className="bg-brand-bg rounded-xl border border-brand-border p-5 h-full">
    <p className="text-brand-purple text-2xl font-serif leading-none mb-3">"</p>
    <p className="text-sm text-brand-text leading-relaxed mb-4">{review.text}</p>
    <div className="flex items-center gap-3 mt-auto">
      <div className="w-8 h-8 rounded-full bg-brand-purple/30 border border-brand-purple/50 flex items-center justify-center text-[10px] font-bold text-brand-purple-light">
        {review.avatar}
      </div>
      <div>
        <p className="text-xs font-semibold text-white">{review.author}</p>
        <div className="flex gap-0.5 mt-0.5">
          {[...Array(review.stars)].map((_, i) => (
            <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Testimonials;
