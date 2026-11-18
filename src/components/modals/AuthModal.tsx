import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { MediMindLogo } from '../navbar/Navbar';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (name: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const displayName = name.trim() || (email ? email.split('@')[0] : 'Clara');
    onSuccess(displayName);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-950/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-heading"
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
              aria-label="Close sign in dialog"
              className="absolute top-5 right-5 p-2 rounded-xl text-mutedcopy hover:text-midnight-900 hover:bg-warmwhite transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <MediMindLogo />
            <h3
              id="auth-heading"
              className="font-display text-[22px] font-bold text-midnight-900 mt-5"
            >
              {mode === 'signin' ? 'Sign in to MediMind' : 'Create your health space'}
            </h3>
            <p className="text-[13px] text-mutedcopy mt-1 mb-6">
              Frontend demo session · Explore locally without transmitting credentials.
            </p>

            <div className="grid grid-cols-2 p-1 rounded-xl bg-warmwhite border border-hairline mb-6">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className={`py-1.5 rounded-lg text-[13px] font-semibold transition-all cursor-pointer ${
                  mode === 'signin'
                    ? 'bg-white text-midnight-900 shadow-sm'
                    : 'text-mutedcopy hover:text-midnight-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`py-1.5 rounded-lg text-[13px] font-semibold transition-all cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-white text-midnight-900 shadow-sm'
                    : 'text-mutedcopy hover:text-midnight-900'
                }`}
              >
                Create Account
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-[12px] font-semibold text-charcoal mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Clara Lin"
                    className="w-full rounded-xl border border-hairline bg-warmwhite px-3.5 py-2.5 text-[14px] text-charcoal focus:outline-none focus:border-royal-500 focus:bg-white"
                  />
                </div>
              )}

              <div>
                <label className="block text-[12px] font-semibold text-charcoal mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="clara@example.com"
                  className="w-full rounded-xl border border-hairline bg-warmwhite px-3.5 py-2.5 text-[14px] text-charcoal focus:outline-none focus:border-royal-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-charcoal mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-hairline bg-warmwhite px-3.5 py-2.5 text-[14px] text-charcoal focus:outline-none focus:border-royal-500 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="btn-premium w-full mt-2 py-3 text-[14px] cursor-pointer"
              >
                <span>{mode === 'signin' ? 'Continue to Demo' : 'Create Demo Profile'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-hairline flex items-center justify-between text-[12.5px] text-mutedcopy">
              <span>Explore immediately?</span>
              <button
                type="button"
                onClick={() => {
                  onSuccess('Clara');
                  onClose();
                }}
                className="font-semibold text-royal-600 hover:text-midnight-900 cursor-pointer"
              >
                Use Sample Profile
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
