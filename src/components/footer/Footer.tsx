import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { MediMindLogo } from '../navbar/Navbar';

interface FooterProps {
  onContactClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
  return (
    <footer className="bg-white border-t border-hairline pt-16 pb-10 text-charcoal">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-hairline">
          {/* Brand & Socials */}
          <div className="md:col-span-4 space-y-4">
            <a href="#home" aria-label="MediMind Home" className="inline-block">
              <MediMindLogo />
            </a>
            <p className="text-[13.5px] text-slatecopy leading-[1.68] max-w-xs">
              AI MediMind — Your Intelligent Personal Healthcare Companion. Bringing
              medication schedules, organized records, and calm health clarity together.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="#home"
                aria-label="X / Twitter"
                className="w-9 h-9 rounded-xl bg-warmwhite border border-hairline hover:border-royal-300 hover:text-royal-600 text-mutedcopy flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#home"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-warmwhite border border-hairline hover:border-royal-300 hover:text-royal-600 text-mutedcopy flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              <a
                href="#home"
                aria-label="GitHub"
                className="w-9 h-9 rounded-xl bg-warmwhite border border-hairline hover:border-royal-300 hover:text-royal-600 text-mutedcopy flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-[12px] font-bold uppercase tracking-[0.08em] text-midnight-900">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-[13.5px] text-slatecopy">
              <li>
                <a href="#home" className="hover:text-royal-600 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-royal-600 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-royal-600 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-royal-600 transition-colors">
                  Privacy &amp; Trust
                </a>
              </li>
            </ul>
          </div>

          {/* Product Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[12px] font-bold uppercase tracking-[0.08em] text-midnight-900">
              Product
            </h4>
            <ul className="space-y-2.5 text-[13.5px] text-slatecopy">
              <li>
                <a href="#platform" className="hover:text-royal-600 transition-colors">
                  Personal Health Dashboard
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-royal-600 transition-colors">
                  Smart Medicine Reminders
                </a>
              </li>
              <li>
                <a href="#assistant" className="hover:text-royal-600 transition-colors">
                  AI Health Assistant
                </a>
              </li>
              <li>
                <a href="#medications" className="hover:text-royal-600 transition-colors">
                  Medicine Management
                </a>
              </li>
              <li>
                <a href="#analytics" className="hover:text-royal-600 transition-colors">
                  Health Analytics
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[12px] font-bold uppercase tracking-[0.08em] text-midnight-900">
              Contact
            </h4>
            <ul className="space-y-2.5 text-[13.5px] text-slatecopy">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-royal-500 flex-shrink-0" />
                <span>hello@aimedimind.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-royal-500 flex-shrink-0" />
                <span>San Francisco, CA</span>
              </li>
              <li className="pt-1">
                <button
                  onClick={onContactClick}
                  className="text-[13px] font-semibold text-royal-600 hover:text-midnight-900 transition-colors cursor-pointer"
                >
                  Send us a message →
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Educational Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[12px] text-mutedcopy">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span>© 2026 AI MediMind. All rights reserved.</span>
            <a href="#privacy" className="hover:text-midnight-900 transition-colors">
              Privacy Policy
            </a>
            <a href="#privacy" className="hover:text-midnight-900 transition-colors">
              Terms of Service
            </a>
          </div>
          <p className="max-w-lg md:text-right leading-relaxed">
            AI MediMind provides personal health organization and educational assistance.
            It does not provide medical diagnoses, clinical treatment, or emergency care.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
