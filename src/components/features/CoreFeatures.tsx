import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Bell,
  FolderLock,
  Sparkles,
  Activity,
  TrendingUp,
  LayoutDashboard,
  Check,
  ArrowRight,
} from 'lucide-react';
import AnimatedCounter from '../ui/AnimatedCounter';

gsap.registerPlugin(ScrollTrigger);

export const CoreFeatures: React.FC = () => {
  const [selected, setSelected] = useState(0);
  const photoWrapRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !photoWrapRef.current || !photoRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        photoRef.current,
        { yPercent: -5, scale: 1.08 },
        {
          yPercent: 5,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: photoWrapRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, photoWrapRef);

    return () => ctx.revert();
  }, []);

  const primaryTabs = [
    {
      id: 'reminders',
      icon: Bell,
      num: '01',
      tag: 'Medication Management',
      title: 'Smart Medicine Reminders',
      summary:
        'Organize dosages, frequency, and mealtime windows so every scheduled dose is gently prompted and confirmed in one tap.',
      items: [
        { meta: '08:00 AM', label: 'Atorvastatin · 20 mg', status: 'Taken' },
        { meta: '08:30 AM', label: 'Metformin · 500 mg', status: 'Taken' },
        { meta: '07:30 PM', label: 'Lisinopril · 10 mg', status: 'Scheduled' },
      ],
    },
    {
      id: 'records',
      icon: FolderLock,
      num: '02',
      tag: 'Digital Archive',
      title: 'Digital Health Records',
      summary:
        'Store prescriptions, dosage history, and recent lab summaries chronologically in one searchable archive built for calm appointments.',
      items: [
        { meta: 'Nov 04', label: 'Comprehensive Lipid Panel', status: 'Reviewed' },
        { meta: 'Oct 18', label: 'Atorvastatin 20 mg Prescription', status: 'Active' },
        { meta: 'Sep 29', label: 'Annual Preventive Checkup', status: 'Archived' },
      ],
    },
    {
      id: 'assistant',
      icon: Sparkles,
      num: '03',
      tag: 'Conversational Clarity',
      title: 'AI Health Assistant',
      summary:
        'Understand everyday health terminology, structure routines, and organize appointment questions with clear, safe educational guidance.',
      items: [
        { meta: 'Routine', label: 'Mealtime pairing suggestions', status: 'Active' },
        { meta: 'Visits', label: 'Doctor consultation checklists', status: 'Ready' },
        { meta: 'Scope', label: 'Educational & organizational only', status: 'Clear' },
      ],
    },
  ];

  const current = primaryTabs[selected];

  return (
    <section id="features" className="py-24 lg:py-32 bg-white border-b border-hairline">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal-50 border border-royal-100 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-royal-600 mb-4">
            Core Capabilities
          </div>
          <h2 className="font-display text-[32px] sm:text-[42px] font-bold text-midnight-900 leading-[1.1]">
            Six distinct capabilities,{' '}
            <span className="bg-gradient-to-r from-royal-600 to-mint-600 bg-clip-text text-transparent">
              one harmonious system.
            </span>
          </h2>
          <p className="mt-3 text-[16px] text-slatecopy leading-[1.68]">
            Each part of MediMind is designed with its own purpose—working together to bring
            precision, calm, and clarity to everyday healthcare.
          </p>
        </motion.div>

        {/* PART 1 (01–03): Interactive Split + GSAP Parallax Studio Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-12">
          <div className="lg:col-span-5 space-y-3.5">
            {primaryTabs.map((item, idx) => {
              const Icon = item.icon;
              const isActive = selected === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelected(idx)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-br from-royal-50/80 via-white to-mint-50/40 border-royal-400/50 shadow-soft'
                      : 'bg-white border-hairline hover:border-royal-200 hover:bg-warmwhite'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-br from-royal-500 to-royal-600 text-white shadow-sm'
                          : 'bg-royal-50 text-royal-600'
                      }`}
                    >
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-mutedcopy">
                        {item.num} · {item.tag}
                      </p>
                      <h3 className="font-display text-[17.5px] font-bold text-midnight-900 mt-0.5">
                        {item.title}
                      </h3>
                      <p className="text-[13.5px] text-slatecopy leading-[1.62] mt-1.5">
                        {item.summary}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div
            ref={photoWrapRef}
            className="lg:col-span-7 rounded-2xl border border-hairline bg-warmwhite p-5 sm:p-6 shadow-elevated space-y-5"
          >
            <div className="rounded-xl overflow-hidden border border-hairline aspect-[16/9] bg-midnight-900">
              <img
                ref={photoRef}
                src="/images/editorial-precision.jpg"
                alt="Precision frosted architectural glass and anodized aluminum design"
                className="w-full h-full object-cover will-change-transform"
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="rounded-xl bg-white border border-hairline overflow-hidden shadow-soft"
              >
                <div className="px-4 py-3 border-b border-hairline flex items-center justify-between bg-royal-50/40">
                  <span className="text-[13px] font-bold text-midnight-900">
                    {current.title}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-royal-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-mint-500 animate-pulse" />
                    Live Preview
                  </span>
                </div>
                <div className="divide-y divide-hairline">
                  {current.items.map((row) => (
                    <div
                      key={row.label}
                      className="px-4 py-3 flex items-center justify-between gap-3 text-[13px]"
                    >
                      <span className="text-[12px] font-semibold text-mutedcopy w-20 flex-shrink-0 tabular-nums">
                        {row.meta}
                      </span>
                      <span className="font-semibold text-midnight-900 flex-1 truncate">
                        {row.label}
                      </span>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-mint-50 text-mint-600">
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* PART 2 (04–06): Distinct Asymmetric Feature Compositions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 04: Health Tracking with Custom Animated ECG Pulse SVG & Counters */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7 rounded-2xl border border-hairline bg-gradient-to-br from-warmwhite to-royal-50/40 p-6 sm:p-8 flex flex-col justify-between gap-6 hover:shadow-elevated transition-shadow duration-300"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-royal-600 mb-2">
                  <Activity className="w-4 h-4" />
                  <span>04 · Health Tracking</span>
                </div>
                <h3 className="font-display text-[23px] font-bold text-midnight-900">
                  Daily Wellness &amp; Activity Metrics
                </h3>
                <p className="text-[14.5px] text-slatecopy leading-[1.65] mt-2 max-w-xl">
                  Track sleep duration, hydration, and daily movement right beside your
                  medication schedule to observe how consistent habits reinforce each other.
                </p>
              </div>

              {/* Subtle Custom Animated Pulse Wave SVG */}
              <svg
                className="hidden sm:block w-24 h-12 flex-shrink-0 text-royal-500"
                viewBox="0 0 120 48"
                fill="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M4 26 H28 L38 10 L48 40 L58 20 L68 26 H116"
                  stroke="url(#pulseLineGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0.4 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: 'easeInOut' }}
                />
                <defs>
                  <linearGradient id="pulseLineGrad" x1="0" y1="0" x2="120" y2="0">
                    <stop offset="0%" stopColor="#356DF3" />
                    <stop offset="100%" stopColor="#67D8AC" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-white border border-hairline p-4 shadow-soft">
                <p className="text-[11px] font-medium text-mutedcopy">Sleep Avg</p>
                <p className="font-display text-[22px] font-bold text-midnight-900 mt-1">
                  <AnimatedCounter value={7.7} decimals={1} suffix="h" />
                </p>
                <div className="mt-3 flex items-end gap-1 h-7">
                  {[65, 82, 60, 76, 90, 96, 84].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm bg-gradient-to-t from-royal-500 to-mint-300"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="rounded-xl bg-white border border-hairline p-4 shadow-soft">
                <p className="text-[11px] font-medium text-mutedcopy">Hydration</p>
                <p className="font-display text-[22px] font-bold text-midnight-900 mt-1">
                  <AnimatedCounter value={1.8} decimals={1} suffix=" L" />
                </p>
                <p className="text-[11px] text-mutedcopy mt-3">82% of daily target</p>
              </div>
              <div className="rounded-xl bg-white border border-hairline p-4 shadow-soft">
                <p className="text-[11px] font-medium text-mutedcopy">Daily Walk</p>
                <p className="font-display text-[22px] font-bold text-midnight-900 mt-1">
                  <AnimatedCounter value={42} suffix="m" />
                </p>
                <p className="text-[11px] font-semibold text-mint-600 mt-3 inline-flex items-center gap-1">
                  <Check className="w-3 h-3" /> Logged
                </p>
              </div>
            </div>
          </motion.div>

          {/* 05: Smart Health Insights (Deep Midnight Navy Luxury Contrast Showcase) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="lg:col-span-5 rounded-2xl bg-midnight-900 text-white p-6 sm:p-8 flex flex-col justify-between gap-6 shadow-elevated relative overflow-hidden"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-royal-500/20 blur-3xl"
            />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-mint-300 mb-2">
                <TrendingUp className="w-4 h-4" />
                <span>05 · Smart Health Insights</span>
              </div>
              <h3 className="font-display text-[23px] font-bold text-white">
                Pattern Clarity Over Time
              </h3>
              <p className="text-[14.5px] text-slate-300 leading-[1.65] mt-2">
                Synthesize user-entered logs into understandable weekly reflections—spotting
                streaks and gentle timing improvements.
              </p>
            </div>

            <div className="relative z-10 space-y-3">
              <div className="rounded-xl bg-white/[0.07] border border-white/10 p-4 backdrop-blur-sm">
                <p className="text-[11px] font-bold uppercase tracking-wider text-mint-300 mb-1">
                  Consistency Observation
                </p>
                <p className="text-[13.5px] text-slate-200 leading-relaxed">
                  Morning medications achieved 100% completion across 14 consecutive days.
                </p>
              </div>
              <div className="rounded-xl bg-white/[0.07] border border-white/10 p-4 backdrop-blur-sm">
                <p className="text-[11px] font-bold uppercase tracking-wider text-royal-200 mb-1">
                  Timing Suggestion
                </p>
                <p className="text-[13.5px] text-slate-200 leading-relaxed">
                  Pairing evening doses with dinner at 7:30 PM reduced delayed logs.
                </p>
              </div>
            </div>
          </motion.div>

          {/* 06: Personal Health Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-12 rounded-2xl border border-hairline bg-white p-6 sm:p-8 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-royal-200 transition-colors"
          >
            <div className="flex items-start gap-4 max-w-2xl">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-royal-50 to-mint-50 border border-royal-100 text-royal-600 flex items-center justify-center flex-shrink-0">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11.5px] font-semibold uppercase tracking-[0.08em] text-royal-600">
                  06 · Unified Command Center
                </p>
                <h3 className="font-display text-[21px] font-bold text-midnight-900 mt-0.5">
                  Personal Health Dashboard
                </h3>
                <p className="text-[14.5px] text-slatecopy leading-[1.65] mt-1">
                  See medication adherence, digital records, and daily wellness summaries
                  together in one cohesive space—beautifully responsive across desktop,
                  tablet, and mobile.
                </p>
              </div>
            </div>

            <a
              href="#platform"
              className="btn-premium px-5 py-3 text-[13.5px] flex-shrink-0 self-start md:self-center"
            >
              <span>Inspect Live Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CoreFeatures;
