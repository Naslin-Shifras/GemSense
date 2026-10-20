import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  BarChart2,
  MessageSquare,
  ShieldCheck,
  Database
} from 'lucide-react';

import signupGemsImg from '../assets/Signup-gems.png';

const getPasswordStrength = (password) => {
  if (!password) return { strength: 0, label: '', color: '' };

  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) {
    return {
      strength: 25,
      label: 'Weak',
      color: 'bg-red-500',
    };
  }

  if (score === 2) {
    return {
      strength: 50,
      label: 'Fair',
      color: 'bg-yellow-500',
    };
  }

  if (score === 3) {
    return {
      strength: 75,
      label: 'Good',
      color: 'bg-blue-500',
    };
  }

  return {
    strength: 100,
    label: 'Strong',
    color: 'bg-green-500',
  };
};

const featureList = [
  {
    icon: BarChart2,
    title: 'Accurate Predictions',
    desc: 'AI trained on 500+ real gem data points.',
  },
  {
    icon: MessageSquare,
    title: 'Ask AI Advisor',
    desc: 'Get expert advice for buying or selling gems.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Private',
    desc: 'Your data is safe with enterprise-grade security.',
  },
];

const trustStats = [
  {
    icon: ShieldCheck,
    title: 'Trusted by Experts',
    desc: 'Gem enthusiasts worldwide',
  },
  {
    icon: Database,
    title: '500+ Real Data Points',
    desc: 'Collected & verified',
  },
  {
    icon: Lock,
    title: '100% Secure',
    desc: 'Your privacy is our priority',
  },
  {
    icon: MessageSquare,
    title: 'AI Advisor',
    desc: 'Always here to help',
  },
];

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({});

  const pwStrength = getPasswordStrength(password);

  const validate = () => {
    const e = {};

    if (password.length < 8) {
      e.password = 'Password must be at least 8 characters long';
    }

    if (password !== confirmPassword) {
      e.confirm = 'Passwords do not match';
    }

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    // Mock auth — will be replaced by authService.registerUser()
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">

      {/* Main Content */}
      <div
        className="flex-1 flex relative bg-cover bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: `url(${signupGemsImg})`,
          backgroundPosition: 'left center',
        }}
      >

        {/* Main dark overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(2,6,23,0.90) 0%, rgba(2,6,23,0.76) 42%, rgba(2,6,23,0.84) 72%, rgba(2,6,23,0.92) 100%)',
          }}
        />

        {/* Extra subtle dark layer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'rgba(0,0,0,0.12)',
          }}
        />

        {/* Left — Hero Content */}
        <div className="hidden lg:flex w-[46%] relative z-10 flex-col justify-center p-12 overflow-hidden">

          {/* Purple glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at bottom left, rgba(124,58,237,0.20) 0%, transparent 68%)',
            }}
          />

          <div className="relative z-10">

            {/* Badge */}
            <div className="pill-badge mb-6 w-fit">
              ✦ AI-POWERED GEM PRICE PREDICTION
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold leading-tight mb-4">
              Join Gem Sense AI
              <br />
              &amp; Predict{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light to-brand-purple">
                Smarter Gem Prices
              </span>
            </h1>

            {/* Description */}
            <p className="text-brand-muted text-sm leading-relaxed mb-8 max-w-sm">
              Create your account to get AI-powered price predictions,
              expert advice, and market insights all in one place.
            </p>

            {/* Feature List */}
            <div className="space-y-5 mb-10">
              {featureList.map((f, i) => (
                <div key={i} className="flex items-start gap-3">

                  <div className="w-9 h-9 rounded-full bg-brand-bg-card border border-brand-border flex items-center justify-center flex-shrink-0 mt-0.5">
                    <f.icon className="w-4 h-4 text-brand-purple" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      {f.title}
                    </p>

                    <p className="text-xs text-brand-muted">
                      {f.desc}
                    </p>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right — Signup Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >

            {/* Form Card */}
            <div className="card p-8 rounded-2xl bg-brand-bg-card/90 backdrop-blur-md">

              {/* Form Heading */}
              <div className="text-center mb-7">
                <h2 className="text-2xl font-bold">
                  Create Your{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light to-brand-purple">
                    Account
                  </span>
                </h2>

                <p className="text-xs text-brand-muted mt-1">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-brand-purple hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Full Name */}
                <div>
                  <label className="text-xs text-brand-muted mb-1.5 block">
                    Full Name
                  </label>

                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />

                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs text-brand-muted mb-1.5 block">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />

                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      className="input-field pl-10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="text-xs text-brand-muted mb-1.5 block">
                    Password
                  </label>

                  <div className="relative">

                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />

                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      className={`input-field pl-10 pr-10 ${
                        errors.password ? 'border-red-500' : ''
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>

                  </div>

                  {/* Strength Meter */}
                  {password && (
                    <div className="mt-2">

                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-brand-muted">
                          Must be at least 8 characters long
                        </span>

                        <span
                          className={
                            pwStrength.label === 'Weak'
                              ? 'text-red-400'
                              : pwStrength.label === 'Strong'
                              ? 'text-green-400'
                              : 'text-yellow-400'
                          }
                        >
                          Strength: {pwStrength.label}
                        </span>
                      </div>

                      <div className="flex gap-1">
                        {[25, 50, 75, 100].map((v) => (
                          <div
                            key={v}
                            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                              pwStrength.strength >= v
                                ? pwStrength.color
                                : 'bg-brand-border'
                            }`}
                          />
                        ))}
                      </div>

                    </div>
                  )}

                  {errors.password && (
                    <p className="text-xs text-red-400 mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-xs text-brand-muted mb-1.5 block">
                    Confirm Password
                  </label>

                  <div className="relative">

                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted" />

                    <input
                      type={showConfirm ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className={`input-field pl-10 pr-10 ${
                        errors.confirm ? 'border-red-500' : ''
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-white transition-colors"
                    >
                      {showConfirm ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>

                  </div>

                  {errors.confirm && (
                    <p className="text-xs text-red-400 mt-1">
                      {errors.confirm}
                    </p>
                  )}
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2.5 pt-1">

                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-0.5 accent-brand-purple"
                  />

                  <label
                    htmlFor="terms"
                    className="text-xs text-brand-muted"
                  >
                    I agree to the{' '}
                    <Link
                      to="#"
                      className="text-brand-purple hover:underline"
                    >
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link
                      to="#"
                      className="text-brand-purple hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </label>

                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3 mt-2"
                >
                  {loading ? (
                    'Creating Account...'
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-brand-border" />

                  <span className="text-xs text-brand-muted">
                    OR
                  </span>

                  <div className="flex-1 h-px bg-brand-border" />
                </div>

                {/* Google Sign Up */}
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-brand-border bg-transparent hover:bg-brand-bg-input text-sm font-medium text-brand-text transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                  >
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />

                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />

                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />

                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>

                  Sign up with Google
                </button>

              </form>
            </div>

          </motion.div>
        </div>

      </div>

      {/* Bottom Trust Cards */}
<div className="border-t border-brand-border bg-brand-bg/95">

  <div className="max-w-7xl mx-auto px-6 py-6">

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

      {trustStats.map((stat, i) => (

        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="
            group
            rounded-xl
            border
            border-brand-border
            bg-brand-bg-card/70
            backdrop-blur-md
            px-5
            py-4
            flex
            items-center
            gap-4
            transition-all
            duration-300
            hover:border-brand-purple/50
            hover:-translate-y-1
            hover:shadow-[0_0_25px_rgba(124,58,237,0.12)]
          "
        >

          {/* Icon Box */}
          <div
            className="
              w-11
              h-11
              rounded-xl
              border
              border-brand-purple/30
              bg-brand-purple/10
              flex
              items-center
              justify-center
              flex-shrink-0
              group-hover:bg-brand-purple/15
              transition-all
            "
          >
            <stat.icon className="w-5 h-5 text-green-500" />
          </div>

          {/* Text */}
          <div>
            <p className="text-sm font-semibold text-white">
              {stat.title}
            </p>

            <p className="text-xs text-brand-muted mt-1 leading-relaxed">
              {stat.desc}
            </p>
          </div>

        </motion.div>

      ))}

    </div>

  </div>

</div>

      

    </div>
  );
};

export default Signup;