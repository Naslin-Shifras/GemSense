import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, User, History, LogOut, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Diamond-shaped logo icon
// Diamond-shaped logo icon with hover spin animation
const DiamondIcon = () => (
  <svg className="hover-float transition-all duration-500 ease-in-out group-hover:rotate-180 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(124,58,237,0.5)]" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2L34 18L18 34L2 18L18 2Z" fill="url(#diamondGrad)" stroke="#7C3AED" strokeWidth="1"/>
    <path className="transition-all duration-500 group-hover:opacity-100" d="M18 6L30 18L18 30L6 18L18 6Z" fill="url(#diamondInner)" opacity="0.7"/>
    <defs>
      <linearGradient id="diamondGrad" x1="2" y1="2" x2="34" y2="34">
        <stop offset="0%" stopColor="#A855F7"/>
        <stop offset="100%" stopColor="#3B82F6"/>
      </linearGradient>
      <linearGradient id="diamondInner" x1="6" y1="6" x2="30" y2="30">
        <stop offset="0%" stopColor="#C084FC"/>
        <stop offset="100%" stopColor="#60A5FA"/>
      </linearGradient>
    </defs>
  </svg>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  // Mock auth — will be replaced by AuthContext
  const [isLoggedIn] = useState(false);
  const location = useLocation();
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Gem Guide', path: '/gem-guide' },
    { name: 'AI Advisor', path: '/ai-advisor' },
    { name: 'About Us', path: '/about' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-brand-bg/90 backdrop-blur-xl border-b border-brand-border' : 'bg-brand-bg'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          <DiamondIcon />
          <div className="leading-tight">
            <div className="text-base font-bold tracking-wide">
              GEM <span className="text-brand-purple">SENSE</span> AI
            </div>
            <div className="text-[10px] text-brand-muted tracking-wider">
              Smart Pricing. Smarter Choices.
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'text-brand-purple' : ''}`}
            >
              {link.name}
              {isActive(link.path) && (
                <span className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-brand-purple rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-brand-bg-card border border-transparent hover:border-brand-border transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <ChevronDown className={`w-4 h-4 text-brand-muted transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 top-full mt-2 w-48 card py-2 shadow-purple"
                  >
                    <Link to="/history" className="flex items-center gap-3 px-4 py-2.5 text-sm text-brand-muted hover:text-white hover:bg-brand-bg-input transition-colors">
                      <History className="w-4 h-4" /> Prediction History
                    </Link>
                    <hr className="border-brand-border my-1" />
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-brand-bg-input transition-colors">
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/signup" className="btn-primary rounded-lg px-5 py-2.5">
              Sign Up <ArrowUpRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-brand-muted hover:text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-brand-bg border-b border-brand-border"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`text-base font-medium py-1 ${isActive(link.path) ? 'text-brand-purple' : 'text-brand-muted'}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-brand-border">
                <Link to="/signup" className="btn-primary w-full justify-center">
                  Sign Up <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
