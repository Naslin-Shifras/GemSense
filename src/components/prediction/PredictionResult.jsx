import React from 'react';
import { motion } from 'framer-motion';
import { Download, MessageSquare, BookmarkPlus, RotateCcw } from 'lucide-react';
import { useMockApi } from '../../services/api';

const PredictionResult = ({ result, onReset }) => {
  const { estimatedValue, minRange, maxRange, confidence, marketStatus, difference, summary } = result;

  const fmt = (v) => new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(v);

  const statusColors = {
    'Potentially Undervalued': 'text-green-400',
    'Fairly Valued': 'text-blue-400',
    'Potentially Overvalued': 'text-red-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card p-7 rounded-2xl relative overflow-hidden"
    >
      {useMockApi && (
        <div className="absolute top-4 right-4 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-[10px] px-2 py-1 rounded-full font-semibold uppercase tracking-wider">
          Demo Mode
        </div>
      )}

      {/* Main Value */}
      <div className="text-center border-b border-brand-border pb-7 mb-7">
        <p className="text-xs text-brand-muted uppercase tracking-widest mb-2">Estimated Market Value</p>
        <p className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light to-brand-purple">
          {fmt(estimatedValue)}
        </p>
        <p className="text-brand-muted text-sm mt-2">
          Range: {fmt(minRange)} – {fmt(maxRange)}
        </p>
      </div>

      {/* Confidence + Status */}
      <div className="grid grid-cols-2 gap-4 mb-7">
        <div className="bg-brand-bg-input rounded-xl p-4 text-center border border-brand-border">
          <p className="text-xs text-brand-muted mb-1">Confidence</p>
          <p className="text-2xl font-bold text-white">{confidence}%</p>
        </div>
        <div className="bg-brand-bg-input rounded-xl p-4 text-center border border-brand-border">
          <p className="text-xs text-brand-muted mb-1">Market Status</p>
          {summary.sellerPrice
            ? <p className={`text-base font-bold ${statusColors[marketStatus] || 'text-brand-purple'}`}>{marketStatus}</p>
            : <p className="text-xs text-brand-muted italic mt-2">Enter seller price to compare</p>
          }
        </div>
      </div>

      {/* Market Comparison */}
      {summary.sellerPrice && (
        <div className="bg-brand-bg rounded-xl p-5 border border-brand-border mb-7">
          <h4 className="text-xs text-brand-muted mb-4 uppercase tracking-wider">Market Comparison</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-brand-muted">ML Estimated Value</span>
              <span className="font-medium text-white">{fmt(estimatedValue)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-muted">Seller Price</span>
              <span className="font-medium text-white">{fmt(summary.sellerPrice)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-brand-border">
              <span className="text-brand-muted">Difference</span>
              <span className={`font-bold ${difference > 0 ? 'text-red-400' : 'text-green-400'}`}>
                {difference > 0 ? '+' : ''}{difference}%
              </span>
            </div>
          </div>
          {/* Gauge */}
          <div className="mt-4">
            <div className="w-full h-1.5 bg-brand-border rounded-full overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-blue-500 to-red-500 opacity-80" />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-brand-bg shadow-lg"
                style={{ left: `${Math.min(Math.max(((difference + 50) / 100) * 100, 0), 100)}%`, transform: 'translate(-50%, -50%)' }}
              />
            </div>
            <div className="flex justify-between text-[9px] text-brand-muted mt-1 uppercase tracking-wider">
              <span>Undervalued</span><span>Fair Value</span><span>Overvalued</span>
            </div>
          </div>
        </div>
      )}

      {/* Gem Summary */}
      <div className="mb-7">
        <h4 className="text-xs text-brand-muted mb-3 uppercase tracking-wider border-b border-brand-border pb-2">Gemstone Attributes</h4>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {[['Type', summary.type], ['Carat', `${summary.carat} ct`], ['Colour', summary.color],
            ['Clarity', summary.clarity], ['Cut', summary.cut], ['Treatment', summary.treatment]].map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <span className="text-brand-muted">{k}</span>
              <span className="text-white font-medium truncate ml-2">{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="btn-outline py-2.5 text-sm rounded-xl gap-2">
          <Download className="w-4 h-4" /> Report
        </button>
        <button className="btn-outline py-2.5 text-sm rounded-xl gap-2">
          <MessageSquare className="w-4 h-4" /> Ask AI
        </button>
        <button className="btn-outline py-2.5 text-sm rounded-xl gap-2">
          <BookmarkPlus className="w-4 h-4" /> Save
        </button>
        <button onClick={onReset} className="btn-primary py-2.5 text-sm rounded-xl gap-2">
          <RotateCcw className="w-4 h-4" /> New Prediction
        </button>
      </div>
    </motion.div>
  );
};

export default PredictionResult;
