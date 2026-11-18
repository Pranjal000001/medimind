import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    }, 1800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-950/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-heading"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md rounded-2xl bg-white border border-hairline p-6 sm:p-8 shadow-product"
          >
            <button
              onClick={onClose}
              aria-label="Close contact dialog"
              className="absolute top-5 right-5 p-2 rounded-xl text-mutedcopy hover:text-midnight-900 hover:bg-warmwhite transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {submitted ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-11 h-11 rounded-full bg-mint-50 text-mint-600 mx-auto flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="font-display text-[20px] font-bold text-midnight-900">
                  Message recorded
                </h3>
                <p className="text-[13.5px] text-slatecopy">
                  Thank you for writing to MediMind. (Frontend demo confirmation)
                </p>
              </div>
            ) : (
              <>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-royal-600">
                  Inquiries
                </p>
                <h3
                  id="contact-heading"
                  className="font-display text-[22px] font-bold text-midnight-900 mt-1 mb-5"
                >
                  Contact MediMind
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[12px] font-semibold text-charcoal mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full rounded-xl border border-hairline bg-warmwhite px-3.5 py-2.5 text-[14px] text-charcoal focus:outline-none focus:border-royal-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-charcoal mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-hairline bg-warmwhite px-3.5 py-2.5 text-[14px] text-charcoal focus:outline-none focus:border-royal-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-charcoal mb-1.5">
                      Message
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help?"
                      className="w-full rounded-xl border border-hairline bg-warmwhite px-3.5 py-2.5 text-[14px] text-charcoal focus:outline-none focus:border-royal-500 focus:bg-white resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-premium w-full py-3 text-[14px] cursor-pointer"
                  >
                    Send Message
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
