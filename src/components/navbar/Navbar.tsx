import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onSignInClick: () => void;
  onGetStartedClick: () => void;
  onContactClick: () => void;
}

export const MediMindLogo: React.FC<{ inverted?: boolean }> = ({ inverted = false }) => (
  <div className="flex items-center gap-2.5">
    <div
      className={`w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-shadow ${
        inverted
          ? 'bg-gradient-to-br from-royal-500/30 to-mint-300/20 border border-white/20 shadow-sm'
          : 'bg-midnight-900 shadow-sm'
      }`}
    >
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M12 5V19M5 12H19"
          stroke="#FFFFFF"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="2.7" fill="#9DE8C8" />
      </svg>
    </div>
    <span
      className={`font-display text-[17px] font-bold tracking-[-0.025em] ${
        inverted ? 'text-white' : 'text-midnight-900'
      }`}
    >
      Medi<span className={inverted ? 'text-mint-300' : 'text-royal-500'}>Mind</span>
    </span>
  </div>
);

export const Navbar: React.FC<NavbarProps> = ({
  onSignInClick,
  onGetStartedClick,
  onContactClick,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'About', href: '#about' },
  ];

  const isDark = !scrolled && !mobileMenuOpen;

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 pt-3.5 pointer-events-none">
      <div
        className={`pointer-events-auto max-w-7xl mx-auto rounded-2xl transition-all duration-300 px-4 sm:px-6 ${
          isDark
            ? 'bg-midnight-900/55 backdrop-blur-xl border border-white/15 py-3 shadow-lg'
            : 'bg-white/92 backdrop-blur-xl border border-hairline py-2.5 shadow-nav'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            aria-label="MediMind Home"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-500 rounded-lg"
          >
            <MediMindLogo inverted={isDark} />
          </a>

          {/* Center Floating Links */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`nav-underline text-[13.5px] font-medium transition-colors duration-200 ${
                  isDark
                    ? 'text-slate-200 hover:text-white'
                    : 'text-slatecopy hover:text-midnight-900'
                }`}
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={onContactClick}
              className={`nav-underline text-[13.5px] font-medium transition-colors duration-200 cursor-pointer ${
                isDark
                  ? 'text-slate-200 hover:text-white'
                  : 'text-slatecopy hover:text-midnight-900'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onSignInClick}
              className={`px-3.5 py-2 rounded-xl text-[13.5px] font-medium transition-colors duration-200 cursor-pointer ${
                isDark
                  ? 'text-slate-200 hover:text-white hover:bg-white/10'
                  : 'text-charcoal hover:text-royal-600 hover:bg-royal-50/70'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={onGetStartedClick}
              className="btn-premium px-4 py-2 text-[13px] cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile / Tablet Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onGetStartedClick}
              className="btn-premium px-3.5 py-1.5 text-[12.5px]"
            >
              Get Started
            </button>
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className={`p-2 rounded-xl transition-colors ${
                isDark ? 'text-white hover:bg-white/10' : 'text-midnight-900 hover:bg-royal-50'
              }`}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-4 pb-2 mt-3 border-t border-hairline flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 px-3 rounded-xl text-[14.5px] font-medium text-charcoal hover:bg-royal-50/70"
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onContactClick();
                  }}
                  className="text-left py-2.5 px-3 rounded-xl text-[14.5px] font-medium text-charcoal hover:bg-royal-50/70"
                >
                  Contact
                </button>
                <div className="pt-3 mt-2 border-t border-hairline grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onSignInClick();
                    }}
                    className="py-2.5 rounded-xl border border-hairline text-[13.5px] font-semibold text-midnight-900 bg-warmwhite"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onGetStartedClick();
                    }}
                    className="btn-premium py-2.5 text-[13.5px]"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;
