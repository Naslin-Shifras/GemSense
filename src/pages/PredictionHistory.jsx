import React, { useState } from 'react';
import PageTransition from '../components/common/PageTransition';
import { Search, Filter, Download, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

const PredictionHistory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  
  // Mock history data
  const mockHistory = [
    { id: "PRED-104", date: "2026-08-15", type: "Blue Sapphire", carat: 2.50, color: "Cornflower Blue", estimatedValue: 485000, status: "Fairly Valued", diff: 5 },
    { id: "PRED-103", date: "2026-08-10", type: "Ruby", carat: 1.20, color: "Pigeon Blood Red", estimatedValue: 850000, status: "Potentially Overvalued", diff: 18 },
    { id: "PRED-102", date: "2026-08-02", type: "Yellow Sapphire", carat: 3.10, color: "Vivid Yellow", estimatedValue: 320000, status: "Potentially Undervalued", diff: -20 },
    { id: "PRED-101", date: "2026-07-28", type: "Alexandrite", carat: 0.85, color: "Color Changing", estimatedValue: 1200000, status: "Fairly Valued", diff: -2 }
  ];

  const types = ["All", ...new Set(mockHistory.map(item => item.type))];

  const filteredHistory = mockHistory.filter(item => {
    const matchesSearch = item.type.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'All' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 }).format(val);
  };

  const getStatusIcon = (status) => {
    if (status === "Potentially Undervalued") return <ArrowDownRight className="w-4 h-4 text-emerald-400" />;
    if (status === "Fairly Valued") return <Minus className="w-4 h-4 text-blue-400" />;
    return <ArrowUpRight className="w-4 h-4 text-red-400" />;
  };

  const getStatusColor = (status) => {
    if (status === "Potentially Undervalued") return "text-emerald-400";
    if (status === "Fairly Valued") return "text-blue-400";
    return "text-red-400";
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-bold font-serif mb-2">Prediction History</h1>
            <p className="text-white/60">Review your past gemstone valuations.</p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search history..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-gem-blue"
              />
            </div>
            <div className="relative">
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="appearance-none bg-black/40 border border-white/10 rounded-lg py-2 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-gem-blue"
              >
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {filteredHistory.length > 0 ? (
          <div className="glass-panel-dark rounded-2xl overflow-hidden border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-white/70 text-sm uppercase tracking-wider border-b border-white/10">
                    <th className="p-5 font-medium">Gemstone</th>
                    <th className="p-5 font-medium">Date</th>
                    <th className="p-5 font-medium">Carat</th>
                    <th className="p-5 font-medium">Estimated Price</th>
                    <th className="p-5 font-medium">Market Status</th>
                    <th className="p-5 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                      <td className="p-5">
                        <div className="font-semibold text-white group-hover:text-gem-gold transition-colors">{item.type}</div>
                        <div className="text-xs text-white/50 mt-1">{item.id} • {item.color}</div>
                      </td>
                      <td className="p-5 text-white/70 text-sm">{item.date}</td>
                      <td className="p-5 text-white/70 text-sm">{item.carat} ct</td>
                      <td className="p-5 font-medium">{formatCurrency(item.estimatedValue)}</td>
                      <td className="p-5">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center ${getStatusColor(item.status)}`}>
                            {getStatusIcon(item.status)}
                          </div>
                          <span className={`text-sm font-medium ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                      </td>
                      <td className="p-5 text-right">
                        <button className="text-white/50 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 inline-flex items-center gap-2 text-sm">
                          <Download className="w-4 h-4" /> Report
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="glass-panel-dark rounded-2xl p-16 text-center border border-white/10 flex flex-col items-center justify-center">
            <Search className="w-12 h-12 text-white/20 mb-4" />
            <h3 className="text-xl font-bold mb-2">No predictions found</h3>
            <p className="text-white/60 mb-6">You haven't made any predictions matching this criteria yet.</p>
            <Link to="/predict" className="btn-primary">
              Predict Your First Gem
            </Link>
          </div>
        )}

      </div>
    </PageTransition>
  );
};

export default PredictionHistory;
