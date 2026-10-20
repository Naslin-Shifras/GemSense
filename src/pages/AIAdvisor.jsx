import React, { useState, useRef, useEffect } from 'react';
import PageTransition from '../components/common/PageTransition';
import { Send, Bot, User, Info, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendAdvisorMessage } from '../services/advisorService';

const AIAdvisor = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', text: "Hello, I'm your GemSense AI Advisor. Ask me anything about gemstones, valuation factors, care, or general market considerations." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: userMsg }]);
    setIsLoading(true);
    try {
      const res = await sendAdvisorMessage(userMsg);
      if (res.success) {
        setMessages(prev => [...prev, { id: Date.now(), type: 'ai', text: res.text }]);
      }
    } catch {
      setMessages(prev => [...prev, { id: Date.now(), type: 'ai', text: "I'm having trouble connecting. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([{ id: 1, type: 'ai', text: "Hello, I'm your GemSense AI Advisor. Ask me anything about gemstones, valuation factors, care, or general market considerations." }]);
  };

  const suggestedPrompts = [
    "What affects sapphire prices?",
    "How does heat treatment affect value?",
    "Explain gemstone clarity grades.",
    "What should I check before buying?"
  ];

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col h-[calc(100vh-80px)]">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold mb-2">GemSense AI Advisor</h1>
          <p className="text-brand-muted text-sm">Ask questions about gemstones, valuation factors, care and market considerations.</p>
        </div>

        <div className="flex-1 card rounded-2xl flex flex-col overflow-hidden min-h-0">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-brand-border">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center">
                <Bot className="w-4 h-4 text-brand-purple" />
              </div>
              <div>
                <p className="text-sm font-semibold">Gem Sense AI Advisor</p>
                <div className="flex items-center gap-1 text-[10px] text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Online
                </div>
              </div>
            </div>
            <button onClick={handleClear} className="text-brand-muted hover:text-white p-2 rounded-lg hover:bg-brand-bg-input transition-colors" title="Clear conversation">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Disclaimer */}
          <div className="flex items-center gap-2 px-5 py-2 border-b border-brand-border bg-brand-purple/5 text-[10px] text-brand-muted">
            <Info className="w-3.5 h-3.5 text-brand-purple flex-shrink-0" />
            AI responses are educational and advisory only and should not replace professional gemological advice.
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {messages.map(msg => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.type === 'ai' && (
                  <div className="w-7 h-7 rounded-full bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5 text-brand-purple" />
                  </div>
                )}
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.type === 'user'
                    ? 'bg-brand-purple text-white rounded-tr-sm'
                    : 'bg-brand-bg-input border border-brand-border text-brand-text rounded-tl-sm'
                }`}>
                  {msg.text}
                </div>
                {msg.type === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-brand-bg-input border border-brand-border flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-3.5 h-3.5 text-brand-muted" />
                  </div>
                )}
              </motion.div>
            ))}

            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3 justify-start">
                <div className="w-7 h-7 rounded-full bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-3.5 h-3.5 text-brand-purple" />
                </div>
                <div className="bg-brand-bg-input border border-brand-border rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
                  {[0, 150, 300].map(d => (
                    <div key={d} className="w-1.5 h-1.5 rounded-full bg-brand-muted animate-bounce" style={{ animationDelay: `${d}ms` }} />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          {messages.length === 1 && !isLoading && (
            <div className="px-5 pb-3 flex flex-wrap gap-2">
              {suggestedPrompts.map((p, i) => (
                <button key={i} onClick={() => setInput(p)}
                  className="text-[11px] border border-brand-border bg-brand-bg-input hover:border-brand-purple/50 hover:bg-brand-purple/10 text-brand-muted hover:text-white px-3 py-1.5 rounded-full transition-all">
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-brand-border">
            <form onSubmit={handleSend} className="relative flex items-center gap-3">
              <input
                type="text" value={input} onChange={e => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 bg-brand-bg-input border border-brand-border rounded-xl py-3 px-5 text-sm text-brand-text placeholder:text-brand-muted focus:outline-none focus:border-brand-purple transition-colors"
                disabled={isLoading}
              />
              <button type="submit" disabled={isLoading || !input.trim()}
                className="w-10 h-10 rounded-xl bg-brand-purple hover:bg-brand-purple-dark disabled:opacity-40 flex items-center justify-center transition-colors flex-shrink-0">
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AIAdvisor;
