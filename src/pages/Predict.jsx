
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Gem,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Info,
  Activity,
  ChartNoAxesCombined,
} from 'lucide-react';

import PageTransition from '../components/common/PageTransition';
import PredictionForm from '../components/prediction/PredictionForm';
import LoadingAnalysis from '../components/prediction/LoadingAnalysis';
import PredictionResult from '../components/prediction/PredictionResult';
import { predictGemPrice } from '../services/predictionService';

// --------------------------------------------------
// Constants
// --------------------------------------------------

const INITIAL_FORM_DATA = {
  type: 'Blue Sapphire',
  color: '',
  clarity: '',
  carat: '',
  cut: '',
  treatment: '',
  sellerPrice: '',
};

const GEM_FACTORS = [
  { key: 'color', label: 'Colour' },
  { key: 'clarity', label: 'Clarity' },
  { key: 'carat', label: 'Carat Weight', suffix: ' ct' },
  { key: 'cut', label: 'Cut Quality' },
  { key: 'treatment', label: 'Treatment' },
];

// --------------------------------------------------
// Small reusable components
// --------------------------------------------------

const SectionLabel = ({ children }) => (
  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-purple-light">
    {children}
  </p>
);

const StepIndicator = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Gem details' },
    { number: 2, label: 'AI analysis' },
    { number: 3, label: 'Your estimate' },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between gap-2">
        {steps.map((step, index) => {
          const completed = currentStep > step.number;
          const active = currentStep === step.number;

          return (
            <React.Fragment key={step.number}>
              <div className="flex min-w-0 flex-col items-center gap-2">
                <div
                  className={[
                    'flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300',
                    completed
                      ? 'border-brand-purple bg-brand-purple text-white'
                      : active
                        ? 'border-brand-purple bg-brand-purple/15 text-brand-purple-light shadow-purple'
                        : 'border-brand-border bg-white/5 text-brand-muted',
                  ].join(' ')}
                  aria-current={active ? 'step' : undefined}
                >
                  {completed ? (
                    <CheckCircle2 size={17} />
                  ) : (
                    <span className="text-xs font-bold">{step.number}</span>
                  )}
                </div>

                <span
                  className={[
                    'text-center text-[10px] font-medium sm:text-xs',
                    active || completed
                      ? 'text-white'
                      : 'text-brand-muted',
                  ].join(' ')}
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={[
                    'mb-5 h-px flex-1 transition-colors duration-300',
                    currentStep > step.number
                      ? 'bg-brand-purple'
                      : 'bg-brand-border',
                  ].join(' ')}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

// --------------------------------------------------
// Gemstone preview card
// --------------------------------------------------

const GemInfoCard = ({ formData, predictionState }) => {
  const isLoading = predictionState === 'loading';
  const isResult = predictionState === 'result';

  return (
    <aside className="card sticky top-24 overflow-hidden rounded-2xl">
      {/* Decorative header */}
      <div className="relative overflow-hidden border-b border-brand-border bg-gradient-to-br from-brand-purple/15 via-transparent to-transparent p-6">
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-purple/10 blur-3xl" />

        <div className="relative flex items-center justify-between gap-3">
          <div>
            <SectionLabel>Live preview</SectionLabel>
            <h2 className="mt-2 text-lg font-bold text-white">
              Your gemstone
            </h2>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-purple/30 bg-brand-purple/10">
            <Gem className="h-5 w-5 text-brand-purple-light" />
          </div>
        </div>

        <p className="relative mt-2 text-xs leading-relaxed text-brand-muted">
          Your selected characteristics appear here as you complete the form.
        </p>
      </div>

      <div className="p-6">
        {/* Gem icon and selected type */}
        <div className="mb-6 flex flex-col items-center rounded-xl border border-brand-border bg-white/[0.02] px-4 py-7 text-center">
          <div className="relative mb-4 flex h-24 w-24 items-center justify-center rounded-full border border-brand-purple/30 bg-brand-purple/10 shadow-purple">
            <div className="absolute inset-2 rounded-full border border-brand-purple/10" />
            <Gem className="relative h-10 w-10 text-brand-purple-light" />
          </div>

          <h3 className="text-xl font-bold text-white">
            {formData.type || 'Select a gemstone'}
          </h3>

          <p className="mt-1 text-xs text-brand-muted">
            {formData.carat
              ? `${formData.carat} carat gemstone`
              : 'Gemstone details not yet complete'}
          </p>

          {isLoading && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-brand-purple/20 bg-brand-purple/10 px-3 py-1.5 text-xs text-brand-purple-light">
              <Activity size={13} className="animate-pulse" />
              Analysing your details
            </div>
          )}

          {isResult && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-400">
              <CheckCircle2 size={13} />
              Analysis completed
            </div>
          )}
        </div>

        {/* Characteristics */}
        <div>
          <div className="mb-4 flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-white">
              Gem characteristics
            </h3>

            <span className="text-[10px] text-brand-muted">
              Live details
            </span>
          </div>

          <div className="space-y-0">
            {GEM_FACTORS.map((factor, index) => {
              const rawValue = formData[factor.key];
              const value =
                rawValue !== undefined &&
                rawValue !== null &&
                String(rawValue).trim() !== ''
                  ? `${rawValue}${factor.suffix || ''}`
                  : 'Not selected';

              return (
                <div
                  key={factor.key}
                  className={[
                    'flex items-start justify-between gap-4 py-3',
                    index !== GEM_FACTORS.length - 1
                      ? 'border-b border-brand-border/70'
                      : '',
                  ].join(' ')}
                >
                  <span className="text-xs text-brand-muted">
                    {factor.label}
                  </span>

                  <span
                    className={[
                      'max-w-[58%] break-words text-right text-xs font-medium',
                      value === 'Not selected'
                        ? 'text-brand-muted/70'
                        : 'text-white',
                    ].join(' ')}
                  >
                    {value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Seller asking price, if provided */}
        {formData.sellerPrice !== undefined &&
          formData.sellerPrice !== null &&
          String(formData.sellerPrice).trim() !== '' && (
            <div className="mt-4 rounded-xl border border-brand-border bg-white/[0.02] p-4">
              <p className="text-xs text-brand-muted">
                Seller's asking price
              </p>
              <p className="mt-1 text-lg font-bold text-white">
                LKR {Number(formData.sellerPrice).toLocaleString('en-LK')}
              </p>
            </div>
          )}

        {/* Trust notice */}
        <div className="mt-6 rounded-xl border border-brand-purple/20 bg-brand-purple/5 p-4">
          <div className="flex items-start gap-3">
            <ShieldCheck
              size={17}
              className="mt-0.5 shrink-0 text-brand-purple-light"
            />

            <div>
              <p className="text-xs font-semibold text-white">
                AI-assisted estimation
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-brand-muted">
                Estimates depend on the model and available data. Actual
                gemstone value may vary with authenticity, origin, market
                conditions and professional examination.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

// --------------------------------------------------
// Error message
// --------------------------------------------------

const PredictionError = ({ message, onDismiss }) => (
  <div
    className="mb-6 rounded-xl border border-red-500/25 bg-red-500/5 p-4"
    role="alert"
    aria-live="assertive"
  >
    <div className="flex items-start gap-3">
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />

      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-red-300">
          Unable to complete your prediction
        </h3>

        <p className="mt-1 text-xs leading-relaxed text-brand-muted">
          {message}
        </p>
      </div>

      <button
        type="button"
        onClick={onDismiss}
        className="rounded-lg px-2 py-1 text-xs text-brand-muted transition hover:bg-white/5 hover:text-white"
        aria-label="Dismiss error message"
      >
        Dismiss
      </button>
    </div>
  </div>
);

// --------------------------------------------------
// Main Predict page
// --------------------------------------------------

const Predict = () => {
  const [predictionState, setPredictionState] = useState('idle');
  const [resultData, setResultData] = useState(null);
  const [lastFormData, setLastFormData] = useState(INITIAL_FORM_DATA);
  const [errorMessage, setErrorMessage] = useState('');

  const currentStep =
    predictionState === 'loading'
      ? 2
      : predictionState === 'result'
        ? 3
        : 1;

  const handlePredictSubmit = async (formData) => {
    setLastFormData({ ...formData });
    setErrorMessage('');
    setResultData(null);
    setPredictionState('loading');

    try {
      const response = await predictGemPrice(formData);

      if (!response?.success || response.data == null) {
        setPredictionState('idle');
        setErrorMessage(
          response?.message ||
            'We could not generate a prediction from these details. Please review your inputs and try again.'
        );
        return;
      }

      setResultData(response.data);
      setPredictionState('result');
    } catch (error) {
      // Log the technical error for developers without showing
      // internal API details to the user.
      console.error('Gemstone prediction failed:', error);

      setPredictionState('idle');
      setErrorMessage(
        'The valuation service is temporarily unavailable. Please check your connection and try again.'
      );
    }
  };

  const handleReset = () => {
    setPredictionState('idle');
    setResultData(null);
    setErrorMessage('');
  };

  const handleDismissError = () => {
    setErrorMessage('');
  };

  return (
    <PageTransition>
      <main className="relative min-h-screen overflow-hidden">
        {/* Ambient background accents */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-80 w-[80%] -translate-x-1/2 rounded-full bg-brand-purple/5 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          {/* Page header */}
          <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-purple/25 bg-brand-purple/10 px-4 py-2">
              <Sparkles
                size={15}
                className="text-brand-purple-light"
              />
              <span className="text-xs font-semibold tracking-wide text-brand-purple-light">
                AI-POWERED VALUATION STUDIO
              </span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Discover Your Gemstone's
              <span className="mt-1 block bg-gradient-to-r from-brand-purple-light via-purple-300 to-white bg-clip-text text-transparent">
                Estimated Market Value
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-brand-muted sm:text-base">
              Enter your gemstone's characteristics and let GemSense AI
              generate an estimated valuation using the data and model
              available to the platform.
            </p>

            {/* Trust highlights */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
              <div className="flex items-center gap-2 text-xs text-brand-muted">
                <ShieldCheck size={15} className="text-brand-purple-light" />
                Transparent estimates
              </div>

              <div className="flex items-center gap-2 text-xs text-brand-muted">
                <ChartNoAxesCombined
                  size={15}
                  className="text-brand-purple-light"
                />
                Data-assisted analysis
              </div>

              <div className="flex items-center gap-2 text-xs text-brand-muted">
                <Gem size={15} className="text-brand-purple-light" />
                Gemstone-focused insights
              </div>
            </div>
          </header>

          {/* Main workspace */}
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
            {/* Left: form, loading, or result */}
            <section
              className="min-w-0 lg:col-span-7"
              aria-label="Gemstone price prediction"
            >
              <div className="card rounded-2xl p-4 sm:p-6 lg:p-8">
                {/* Workspace heading */}
                <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <SectionLabel>Valuation workspace</SectionLabel>

                    <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                      {predictionState === 'loading'
                        ? 'Analysing gemstone'
                        : predictionState === 'result'
                          ? 'Your prediction'
                          : 'Describe your gemstone'}
                    </h2>

                    <p className="mt-2 max-w-lg text-xs leading-relaxed text-brand-muted sm:text-sm">
                      {predictionState === 'loading'
                        ? 'Please wait while the prediction service processes your information.'
                        : predictionState === 'result'
                          ? 'Review the result generated from the details you submitted.'
                          : 'Complete the available fields as accurately as possible for a more useful estimate.'}
                    </p>
                  </div>

                  {predictionState === 'result' && (
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 rounded-xl border border-brand-border px-3 py-2 text-xs font-medium text-brand-muted transition hover:border-brand-purple/40 hover:text-white"
                    >
                      <RotateCcw size={14} />
                      New prediction
                    </button>
                  )}
                </div>

                <StepIndicator currentStep={currentStep} />

                {errorMessage && (
                  <PredictionError
                    message={errorMessage}
                    onDismiss={handleDismissError}
                  />
                )}

                {/* Step 1: Input */}
                {predictionState === 'idle' && (
                  <div>
                    <PredictionForm onSubmit={handlePredictSubmit} />

                    <div className="mt-6 flex items-start gap-3 rounded-xl border border-brand-border bg-white/[0.02] p-4">
                      <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-purple-light" />

                      <p className="text-xs leading-relaxed text-brand-muted">
                        For the best available estimate, enter accurate
                        gemstone details. Do not guess characteristics you
                        cannot identify; seek professional assessment when
                        necessary.
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 2: Loading */}
                {predictionState === 'loading' && (
                  <div
                    className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-brand-border bg-white/[0.02] px-4 py-8 sm:min-h-[400px]"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-purple/30 bg-brand-purple/10 shadow-purple">
                      <Activity className="h-7 w-7 animate-pulse text-brand-purple-light" />
                    </div>

                    <LoadingAnalysis />

                    <p className="mt-5 max-w-sm text-center text-xs leading-relaxed text-brand-muted">
                      Keep this page open while the prediction is being
                      processed. Processing time depends on the service.
                    </p>
                  </div>
                )}

                {/* Step 3: Results */}
                {predictionState === 'result' && resultData && (
                  <div>
                    <div className="mb-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />

                        <div>
                          <p className="text-sm font-semibold text-white">
                            Prediction generated
                          </p>
                          <p className="mt-1 text-xs leading-relaxed text-brand-muted">
                            Your estimate is based on the submitted details
                            and the output returned by the prediction service.
                          </p>
                        </div>
                      </div>
                    </div>

                    <PredictionResult
                      result={resultData}
                      onReset={handleReset}
                    />

                    {/* Follow-up actions */}
                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <Link
                        to="/ai-advisor"
                        className="group inline-flex items-center justify-center gap-2 rounded-xl border border-brand-purple/30 bg-brand-purple/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-brand-purple/60 hover:bg-brand-purple/20"
                      >
                        <Sparkles
                          size={16}
                          className="text-brand-purple-light"
                        />
                        Ask AI Gem Advisor
                        <ArrowRight
                          size={15}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </Link>

                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-border bg-white/[0.02] px-4 py-3 text-sm font-semibold text-brand-muted transition hover:border-brand-purple/40 hover:text-white"
                      >
                        <RotateCcw size={15} />
                        Analyse another gemstone
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Disclaimer */}
              <div className="mt-5 flex items-start gap-3 px-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-muted" />

                <p className="text-[11px] leading-relaxed text-brand-muted">
                  <strong className="font-semibold text-white">
                    Important:
                  </strong>{' '}
                  GemSense AI provides an indicative price estimate, not a
                  certified valuation, gem identification, authenticity
                  guarantee, or investment recommendation. Actual market value
                  may differ.
                </p>
              </div>
            </section>

            {/* Right: live summary */}
            <div className="min-w-0 lg:col-span-5">
              <GemInfoCard
                formData={lastFormData}
                predictionState={predictionState}
              />

              {/* Helpful tips */}
              <div className="mt-5 rounded-2xl border border-brand-border bg-white/[0.02] p-5 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-purple/10">
                    <Sparkles className="h-5 w-5 text-brand-purple-light" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white">
                      Get a more useful estimate
                    </h3>
                    <p className="mt-1 text-xs text-brand-muted">
                      A few details make a difference.
                    </p>
                  </div>
                </div>

                <ul className="mt-5 space-y-3">
                  {[
                    'Enter the correct gemstone variety.',
                    'Use the actual carat weight when known.',
                    'Provide accurate treatment and quality details.',
                    'Compare the estimate with a qualified gemologist when making a purchase.',
                  ].map((tip, index) => (
                    <li key={tip} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-purple/10 text-[10px] font-bold text-brand-purple-light">
                        {index + 1}
                      </span>

                      <span className="text-xs leading-relaxed text-brand-muted">
                        {tip}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Supporting link */}
              <div className="mt-5 rounded-2xl border border-brand-border bg-gradient-to-br from-brand-purple/10 to-transparent p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <Gem className="mt-0.5 h-5 w-5 shrink-0 text-brand-purple-light" />

                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-white">
                      Learn about gemstones
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-brand-muted">
                      Explore gemstone varieties, quality factors, treatments,
                      and care before making valuation decisions.
                    </p>

                    <Link
                      to="/gem-guide"
                      className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-brand-purple-light transition hover:text-white"
                    >
                      Explore Gem Guide
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export default Predict;