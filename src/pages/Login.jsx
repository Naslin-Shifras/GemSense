import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  BarChart2,
  MessageSquare,
  BookOpen,
  ShieldCheck
} from 'lucide-react';

import LoginGemsImg from '../assets/Login-gems.png';

const featureList = [
  {
    icon: BarChart2,
    title: 'Accurate Price Prediction',
    desc: 'Trained on 500+ real market data points.',
  },
  {
    icon: MessageSquare,
    title: 'AI Advisor',
    desc: 'Get personalized advice from gem experts.',
  },
  {
    icon: BookOpen,
    title: 'Gem Guide',
    desc: 'Explore gem knowledge and pricing factors.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Private',
    desc: 'Your data is protected with enterprise-grade security.',
  },
];

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    // Mock auth — will be replaced by authService.loginUser()
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">

      {/* ===================================================== */}
      {/* MAIN LOGIN SECTION */}
      {/* ===================================================== */}
      <div
        className="flex-1 relative bg-cover bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: `url(${LoginGemsImg})`,
          backgroundPosition: 'left bottom',
        }}
      >

        {/* Dark overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(2,6,23,0.94) 0%, rgba(2,6,23,0.78) 38%, rgba(2,6,23,0.86) 65%, rgba(2,6,23,0.96) 100%)',
          }}
        />

        {/* Purple ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at bottom left, rgba(124,58,237,0.20) 0%, transparent 65%)',
          }}
        />

        {/* Main content */}
        <div className="relative z-10 min-h-full flex">

          {/* ================================================= */}
          {/* LEFT — HERO CONTENT */}
          {/* ================================================= */}
          <div className="hidden lg:flex w-[46%] flex-col justify-center px-12 xl:px-16 py-12">

            {/* Badge */}
            <div className="pill-badge mb-6 w-fit">
              ✦ AI-POWERED GEM PRICE PREDICTION
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl xl:text-5xl font-extrabold leading-[1.15] mb-5 text-white">

              Login to Predict
              <br />

              Gem Prices with
              <br />

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light to-brand-purple">
                AI-Powered Accuracy
              </span>

            </h1>

            {/* Description */}
            <p className="text-brand-muted text-sm leading-relaxed mb-8 max-w-md">

              Access your dashboard to get accurate price predictions,
              expert advice, and market insights for smarter buying
              and selling.

            </p>

            {/* Features */}
            <div className="space-y-5 max-w-md">

              {featureList.map((feature, index) => {

                const Icon = feature.icon;

                return (
                  <div
                    key={index}
                    className="flex items-start gap-4"
                  >

                    {/* Icon Container */}
                    <div
                      className="
                        w-11
                        h-11
                        rounded-xl
                        border
                        border-brand-border
                        bg-brand-bg-card/70
                        backdrop-blur-md
                        flex
                        items-center
                        justify-center
                        flex-shrink-0
                      "
                    >

                      <Icon
                        className="w-5 h-5 text-brand-purple"
                        strokeWidth={1.7}
                      />

                    </div>

                    {/* Feature Text */}
                    <div className="pt-0.5">

                      <p className="text-sm font-semibold text-white">
                        {feature.title}
                      </p>

                      <p className="text-xs text-brand-muted mt-1 leading-relaxed">
                        {feature.desc}
                      </p>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

          {/* ================================================= */}
          {/* RIGHT — LOGIN FORM */}
          {/* ================================================= */}
          <div className="flex-1 flex items-center justify-center p-6 lg:p-12">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md"
            >

              {/* Login Card */}
              <div
                className="
                  card
                  p-8
                  rounded-2xl
                  bg-brand-bg-card/90
                  backdrop-blur-md
                  border
                  border-brand-border
                "
              >

                {/* Lock Icon */}
                <div className="flex justify-center mb-4">

                  <div
                    className="
                      w-14
                      h-14
                      rounded-full
                      border
                      border-brand-purple/30
                      flex
                      items-center
                      justify-center
                      bg-brand-purple/5
                    "
                  >

                    <Lock className="w-7 h-7 text-brand-purple" />

                  </div>

                </div>

                {/* Form Heading */}
                <div className="text-center mb-7">

                  <h2 className="text-2xl font-bold">

                    Welcome{' '}

                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light to-brand-purple">
                      Back!
                    </span>

                  </h2>

                  <p className="text-xs text-brand-muted mt-1">
                    Login to your account
                  </p>

                </div>

                {/* Error Message */}
                {error && (

                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-xs text-red-400 text-center mb-4">
                    {error}
                  </div>

                )}

                {/* Form */}
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >

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
                        required
                        placeholder="Enter your password"
                        className="input-field pl-10 pr-10"
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

                  </div>

                  {/* Remember / Forgot */}
                  <div className="flex justify-between items-center text-xs">

                    <label className="flex items-center gap-2 text-brand-muted cursor-pointer">

                      <input
                        type="checkbox"
                        className="accent-brand-purple"
                      />

                      Remember me

                    </label>

                    <Link
                      to="#"
                      className="text-brand-purple hover:underline"
                    >
                      Forgot Password?
                    </Link>

                  </div>

                  {/* Login Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-3 mt-2"
                  >

                    {loading ? (

                      'Logging in...'

                    ) : (

                      <>
                        <span>Log In</span>
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

                  {/* Google Login */}
                  <button
                    type="button"
                    className="
                      w-full
                      flex
                      items-center
                      justify-center
                      gap-3
                      py-3
                      rounded-lg
                      border
                      border-brand-border
                      bg-transparent
                      hover:bg-brand-bg-input
                      text-sm
                      font-medium
                      text-brand-text
                      transition-colors
                    "
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

                    Log in with Google

                  </button>

                  {/* Signup Link */}
                  <p className="text-sm text-center text-brand-muted pt-2">

                    Don't have an account?{' '}

                    <Link
                      to="/signup"
                      className="text-brand-purple hover:underline"
                    >
                      Sign Up
                    </Link>

                  </p>

                </form>

              </div>

            </motion.div>

          </div>

        </div>

      </div>

      

      </div>

    
  );
};

export default Login;