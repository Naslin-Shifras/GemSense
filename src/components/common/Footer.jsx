import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, ArrowRight } from 'lucide-react';

const DiamondIcon = () => (
  <svg className="hover-float transition-all duration-500 ease-in-out group-hover:rotate-180 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(124,58,237,0.5)]" width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2L34 18L18 34L2 18L18 2Z" fill="url(#dFoot)" stroke="#7C3AED" strokeWidth="1"/>
    <path className="transition-all duration-500 group-hover:opacity-100" d="M18 6L30 18L18 30L6 18L18 6Z" fill="url(#dFoot2)" opacity="0.7"/>
    <defs>
      <linearGradient id="dFoot" x1="2" y1="2" x2="34" y2="34"><stop offset="0%" stopColor="#A855F7"/><stop offset="100%" stopColor="#3B82F6"/></linearGradient>
      <linearGradient id="dFoot2" x1="6" y1="6" x2="30" y2="30"><stop offset="0%" stopColor="#C084FC"/><stop offset="100%" stopColor="#60A5FA"/></linearGradient>
    </defs>
  </svg>
);

const Footer = () => {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-brand-bg-card border-t border-brand-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3 group">
              <DiamondIcon />
              <div className="leading-tight">
                <div className="text-sm font-bold">GEM <span className="text-brand-purple">SENSE</span> AI</div>
                <div className="text-[10px] text-brand-muted">Smart Pricing. Smarter Choices.</div>
              </div>
            </Link>
            <p className="text-xs text-brand-muted leading-relaxed mb-5">
              AI-powered gem price prediction and expert advice platform trusted by buyers, sellers, and gem enthusiasts worldwide.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg border border-brand-border flex items-center justify-center text-brand-muted hover:text-white hover:border-brand-purple hover:bg-brand-purple/10 hover-glow transition-all">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[['Home', '/'], ['Gem Guide', '/gem-guide'], ['AI Advisor', '/ai-advisor'], ['About Us', '/about']].map(([name, path]) => (
                <li key={name}><Link to={path} className="text-xs text-brand-muted hover:text-brand-purple-light transition-all duration-300 inline-block hover:translate-x-1">{name}</Link></li>
              ))}
            </ul>
          </div>

          {/* Gem Guide */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Gem Guide</h4>
            <ul className="space-y-2.5">
              {['Gem Types', 'Color Guide', 'Clarity Guide', 'Cut Guide', 'Treatment Guide'].map(item => (
                <li key={item}><Link to="/gem-guide" className="text-xs text-brand-muted hover:text-brand-purple-light transition-all duration-300 inline-block hover:translate-x-1">{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {['Blog', 'Market Trends', 'Glossary', 'FAQ', 'Contact Us'].map(item => (
                <li key={item}><Link to="#" className="text-xs text-brand-muted hover:text-brand-purple-light transition-all duration-300 inline-block hover:translate-x-1">{item}</Link></li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Stay Updated</h4>
            <p className="text-xs text-brand-muted mb-4 leading-relaxed">Subscribe to get the latest gem market insights, tips, and AI updates.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 min-w-0 bg-brand-bg-input border border-brand-border rounded-lg px-3 py-2.5 text-xs text-brand-text placeholder:text-brand-muted focus:outline-none focus:border-brand-purple"
              />
              <button className="flex-shrink-0 w-10 h-10 bg-brand-purple rounded-lg flex items-center justify-center hover:bg-brand-purple-dark hover-glow transition-all">
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-brand-muted">© 2025 Gem Sense AI. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Disclaimer'].map(item => (
              <Link key={item} to="#" className="text-xs text-brand-muted hover:text-white transition-colors">{item}</Link>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-3 rounded-lg border border-yellow-500/20 bg-yellow-500/5">
          <p className="text-[10px] text-yellow-400/70 text-center">
            GemSense AI provides estimated market insights and does not replace professional gemstone certification, laboratory authentication or professional gemological valuation.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
