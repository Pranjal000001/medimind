import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, RotateCcw, Info } from 'lucide-react';
import { INITIAL_CHAT_MESSAGES, AI_RESPONSES } from '../../data/sampleData';
import { ChatMessage } from '../../types';

export const AiAssistantSection: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const prompts = Object.keys(AI_RESPONSES);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = (textOverride?: string) => {
    const text = (textOverride ?? input).trim();
    if (!text || isTyping) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, sender: 'user', text, timestamp: now },
    ]);
    if (!textOverride) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = AI_RESPONSES[text];
      if (!reply) {
        const lower = text.toLowerCase();
        if (lower.includes('schedule') || lower.includes('time') || lower.includes('dose')) {
          reply =
            'Grouping daily doses around reliable anchors—such as breakfast and dinner—makes consistency easier to maintain. You can update times or add new medications in the Medicine Management dashboard below.';
        } else if (lower.includes('record') || lower.includes('lab')) {
          reply =
            'MediMind organizes your prescriptions, dosage notes, and recent clinical summaries chronologically so you can review them calmly before appointments.';
        } else {
          reply = `I can help organize your medication schedule, summarize user-entered health logs, or explain general healthcare terminology around "${text}". For personal medical advice or diagnosis, please consult a qualified healthcare professional.`;
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
      setIsTyping(false);
    }, 750);
  };

  return (
    <section
      id="assistant"
      className="py-24 lg:py-32 bg-gradient-to-b from-warmwhite via-royal-50/40 to-warmwhite border-b border-hairline"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.55 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal-50 border border-royal-100 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-royal-600 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Health Assistant</span>
            </div>
            <h2 className="font-display text-[32px] sm:text-[42px] font-bold text-midnight-900 leading-[1.1]">
              A smarter way to understand your health information.
            </h2>
            <p className="mt-3 text-[16px] text-slatecopy leading-[1.68]">
              Ask plain-language questions about structuring your schedule, preparing for a
              doctor visit, or clarifying everyday health terminology.
            </p>
          </div>
        </motion.div>

        {/* Two-Pane Premium AI Application Frame */}
        <div className="rounded-2xl bg-white border border-hairline shadow-product overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[550px]">
          {/* Left Context & Prompts Rail */}
          <aside className="lg:col-span-4 bg-warmwhite border-b lg:border-b-0 lg:border-r border-hairline p-6 flex flex-col justify-between gap-6">
            <div className="space-y-5">
              {/* Animated AI Identity Card */}
              <div className="p-4 rounded-xl bg-midnight-900 text-white flex items-center gap-3.5 shadow-soft">
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-royal-500 to-mint-400 p-[1.5px] flex-shrink-0">
                  <div className="w-full h-full rounded-[10px] bg-midnight-900 flex items-center justify-center">
                    <Sparkles className="w-4.5 h-4.5 text-mint-300" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-mint-400 border-2 border-midnight-900" />
                </div>
                <div>
                  <p className="font-display text-[14px] font-bold text-white">
                    MediMind Companion
                  </p>
                  <p className="text-[11.5px] text-slate-300">
                    Schedule &amp; Record Assistant
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-mutedcopy mb-2.5">
                  Suggested Prompts
                </p>
                <div className="space-y-2">
                  {prompts.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => sendMessage(q)}
                      disabled={isTyping}
                      className="w-full text-left px-3.5 py-2.5 rounded-xl bg-white border border-hairline hover:border-royal-400/60 hover:bg-royal-50/40 text-[13px] font-medium text-charcoal transition-all duration-150 cursor-pointer disabled:opacity-50 shadow-sm"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Educational Scope Notice */}
            <div className="p-4 rounded-xl bg-royal-50/60 border border-royal-100 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-royal-600 flex-shrink-0 mt-0.5" />
              <p className="text-[12px] text-slatecopy leading-relaxed">
                <strong className="font-semibold text-midnight-900">
                  Educational Assistance Only:
                </strong>{' '}
                MediMind AI helps organize routines and explain general health terms. It
                does not provide medical diagnoses or emergency care.
              </p>
            </div>
          </aside>

          {/* Right Conversation Stream */}
          <div className="lg:col-span-8 flex flex-col justify-between bg-white">
            <div className="px-6 py-4 border-b border-hairline flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-mint-400 animate-pulse" />
                <div>
                  <h3 className="font-display text-[14.5px] font-bold text-midnight-900">
                    MediMind AI Conversation
                  </h3>
                  <p className="text-[11.5px] text-mutedcopy">
                    Interactive frontend preview · Educational guidance
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMessages(INITIAL_CHAT_MESSAGES)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-medium text-mutedcopy hover:text-midnight-900 hover:bg-warmwhite transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Chat Bubbles */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-6 py-6 space-y-5 max-h-[430px] bg-warmwhite/50"
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className={`flex gap-3 ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.sender === 'assistant' && (
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-royal-500 to-mint-400 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                    )}

                    <div
                      className={`max-w-[82%] rounded-2xl px-4 py-3.5 text-[14px] leading-[1.65] ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-br from-midnight-900 to-midnight-800 text-white rounded-tr-sm shadow-soft'
                          : 'bg-white border border-hairline text-charcoal rounded-tl-sm shadow-soft'
                      }`}
                    >
                      <div className="whitespace-pre-line">{msg.text}</div>
                      <p
                        className={`text-[10.5px] mt-2 tabular-nums ${
                          msg.sender === 'user' ? 'text-slate-300' : 'text-mutedcopy'
                        }`}
                      >
                        {msg.timestamp}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-royal-500 to-mint-400 text-white flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white border border-hairline flex items-center gap-1.5 shadow-soft">
                    <span
                      className="w-2 h-2 rounded-full bg-royal-500 animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-royal-400 animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-mint-400 animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Composer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="p-4 border-t border-hairline bg-white flex items-center gap-2.5"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping}
                placeholder="Ask about organizing your schedule or general health terms…"
                aria-label="Ask MediMind AI"
                className="flex-1 rounded-xl bg-warmwhite border border-hairline px-4 py-3 text-[14px] text-charcoal placeholder:text-mutedcopy focus:outline-none focus:border-royal-500 focus:bg-white transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="btn-premium px-5 py-3 text-[13.5px] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiAssistantSection;
