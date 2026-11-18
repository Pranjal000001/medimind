import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Clock, Activity, FileText } from 'lucide-react';
import Hero3DHeart from './Hero3DHeart';
import AnimatedCounter from '../ui/AnimatedCounter';

interface HeroProps {
  onExploreClick: () => void;
  onDiscoverClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onDiscoverClick }) => {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] bg-midnight-950 text-white pt-28 pb-16 lg:pt-32 lg:pb-20 flex items-center overflow-hidden"
    >
      {/* Refined atmospheric studio lighting behind 3D heart */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 73% 46%, rgba(53, 109, 243, 0.22) 0%, rgba(157, 232, 200, 0.08) 28%, rgba(7, 15, 31, 0) 62%), radial-gradient(circle at 18% 82%, rgba(53, 109, 243, 0.12) 0%, rgba(7, 15, 31, 0) 48%)',
        }}
      />

      {/* Subtle top-to-bottom architectural vertical hairlines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-royal-500/35 to-transparent"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Expressive Typography & Tactile Buttons */}
          <div className="lg:col-span-6 space-y-7">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-md text-[12px] font-medium text-mint-300"
            >
              <Sparkles className="w-3.5 h-3.5 text-mint-300" />
              <span>AI MediMind · Intelligent Personal Healthcare</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[42px] sm:text-[54px] lg:text-[62px] font-extrabold text-white leading-[1.05] tracking-[-0.03em]"
            >
              Your Health.
              <span className="block mt-1.5 bg-gradient-to-r from-white via-royal-200 to-mint-300 bg-clip-text text-transparent">
                One Intelligent Companion.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16 }}
              className="text-[16px] sm:text-[17.5px] text-slate-300 leading-[1.68] max-w-xl"
            >
              Experience a smarter way to manage your medicines, organize health records
              and understand your everyday health journey.
            </motion.p>

            {/* Signature Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.24 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1"
            >
              <button
                onClick={onExploreClick}
                className="btn-premium group px-7 py-3.5 text-[15px] cursor-pointer"
              >
                <span>Explore MediMind</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              <button
                onClick={onDiscoverClick}
                className="btn-glass-dark px-6 py-3.5 text-[15px] cursor-pointer"
              >
                <span>Discover Features</span>
              </button>
            </motion.div>

            {/* Animated Quantitative Trust Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.34 }}
              className="pt-7 border-t border-white/10 grid grid-cols-3 gap-5 max-w-md"
            >
              <div>
                <p className="font-display text-[24px] sm:text-[26px] font-bold text-white">
                  <AnimatedCounter value={94} suffix="%" />
                </p>
                <p className="text-[12px] text-slate-400 mt-0.5">Demo adherence</p>
              </div>
              <div>
                <p className="font-display text-[24px] sm:text-[26px] font-bold text-mint-300">
                  <AnimatedCounter value={360} suffix="°" />
                </p>
                <p className="text-[12px] text-slate-400 mt-0.5">Unified overview</p>
              </div>
              <div>
                <p className="font-display text-[24px] sm:text-[26px] font-bold text-white">
                  24/7
                </p>
                <p className="text-[12px] text-slate-400 mt-0.5">Educational AI</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Signature 3D Heart + Neural Network Installation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.12 }}
            className="lg:col-span-6 flex flex-col items-center"
          >
            <div className="w-full max-w-[560px]">
              <Hero3DHeart />

              {/* Anchored Glass Telemetry Strip */}
              <div className="mt-2 grid grid-cols-3 gap-2.5 sm:gap-3">
                <div className="rounded-xl bg-white/[0.05] backdrop-blur-md border border-white/10 px-3.5 py-3 hover:border-royal-400/40 transition-colors">
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 mb-1">
                    <Clock className="w-3.5 h-3.5 text-royal-400" />
                    <span>Next Dose</span>
                  </div>
                  <p className="text-[13.5px] font-semibold text-white tabular-nums">
                    08:00 AM
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">Atorvastatin 20 mg</p>
                </div>

                <div className="rounded-xl bg-white/[0.05] backdrop-blur-md border border-white/10 px-3.5 py-3 hover:border-mint-300/40 transition-colors">
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 mb-1">
                    <Activity className="w-3.5 h-3.5 text-mint-300" />
                    <span>Daily Routine</span>
                  </div>
                  <p className="text-[13.5px] font-semibold text-white tabular-nums">
                    3 of 5 taken
                  </p>
                  <p className="text-[11px] text-mint-300">On track today</p>
                </div>

                <div className="rounded-xl bg-white/[0.05] backdrop-blur-md border border-white/10 px-3.5 py-3 hover:border-royal-400/40 transition-colors">
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 mb-1">
                    <FileText className="w-3.5 h-3.5 text-royal-400" />
                    <span>Records</span>
                  </div>
                  <p className="text-[13.5px] font-semibold text-white tabular-nums">
                    4 organized
                  </p>
                  <p className="text-[11px] text-slate-400">Ready anytime</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
