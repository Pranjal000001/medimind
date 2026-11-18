import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutGrid,
  Pill,
  FileText,
  History,
  Check,
  Sparkles,
  Search,
  ChevronRight,
  Moon,
  Droplets,
  Footprints,
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';
import {
  INITIAL_MEDICINES,
  SAMPLE_HEALTH_RECORDS,
  MEDICATION_HISTORY,
  WEEKLY_ADHERENCE_DATA,
} from '../../data/sampleData';
import { Medicine } from '../../types';

type AppTab = 'overview' | 'records' | 'history';

export const ProductShowcase: React.FC = () => {
  const [meds, setMeds] = useState<Medicine[]>(INITIAL_MEDICINES);
  const [tab, setTab] = useState<AppTab>('overview');

  const toggleDose = (id: string) => {
    setMeds((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: m.status === 'taken' ? 'pending' : 'taken' }
          : m
      )
    );
  };

  const takenCount = meds.filter((m) => m.status === 'taken').length;
  const pct = Math.round((takenCount / meds.length) * 100);

  const navItems: { id: AppTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'records', label: 'Health Records', icon: FileText, badge: '4' },
    { id: 'history', label: 'Medicine History', icon: History },
  ];

  return (
    <section
      id="platform"
      className="py-24 lg:py-32 bg-gradient-to-b from-white via-royal-50/35 to-warmwhite border-b border-hairline"
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
              The MediMind Platform
            </div>
            <h2 className="font-display text-[32px] sm:text-[42px] font-bold text-midnight-900 leading-[1.1]">
              Everything vital, thoughtfully connected.
            </h2>
            <p className="mt-3 text-[16px] text-slatecopy leading-[1.68]">
              A calm, intelligent healthcare workspace unifying daily schedules, digital
              records, weekly adherence analytics, and conversational assistance.
            </p>
          </div>

          <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-hairline text-[12px] font-medium text-slatecopy shadow-soft self-start md:self-end">
            <span className="w-2 h-2 rounded-full bg-mint-500 animate-pulse" />
            Interactive Workspace · Demo Data
          </span>
        </motion.div>

        {/* Flagship Software Window */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.65 }}
          className="rounded-2xl bg-white border border-hairline shadow-product overflow-hidden flex flex-col md:flex-row"
        >
          {/* Left Midnight Navy Navigation Sidebar */}
          <aside className="md:w-56 lg:w-60 bg-midnight-900 text-slate-300 flex-shrink-0 flex flex-col justify-between p-4 border-b md:border-b-0 md:border-r border-midnight-800">
            <div>
              <div className="flex items-center justify-between px-2 py-1.5 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-royal-500 to-mint-400 flex items-center justify-center shadow-sm">
                    <Pill className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="font-display text-[14.5px] font-bold text-white">
                    MediMind
                  </span>
                </div>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white/10 text-mint-300">
                  Live
                </span>
              </div>

              <div className="flex md:flex-col gap-1.5 overflow-x-auto no-scrollbar">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = tab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setTab(item.id)}
                      className={`flex items-center justify-between gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all whitespace-nowrap cursor-pointer ${
                        active
                          ? 'bg-royal-500 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span>{item.label}</span>
                      </span>
                      {item.badge && (
                        <span
                          className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-md tabular-nums ${
                            active
                              ? 'bg-white/20 text-white'
                              : 'bg-white/10 text-slate-200'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2.5 pt-4 mt-6 border-t border-white/10 px-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-royal-500 to-mint-400 text-white text-[12px] font-bold flex items-center justify-center">
                CL
              </div>
              <div className="min-w-0">
                <p className="text-[12.5px] font-semibold text-white truncate">Clara Lin</p>
                <p className="text-[11px] text-slate-400 truncate">Personal Health Space</p>
              </div>
            </div>
          </aside>

          {/* Main Application Viewport */}
          <div className="flex-1 min-w-0 flex flex-col bg-warmwhite/80">
            {/* Top Utility Bar */}
            <div className="px-5 sm:px-6 py-4 bg-white border-b border-hairline flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-[17px] sm:text-[19px] font-bold text-midnight-900">
                  Good morning, Clara
                </h3>
                <p className="text-[12px] text-mutedcopy">
                  Wednesday, Nov 18 · Personal medication &amp; wellness dashboard
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-warmwhite border border-hairline text-[12px] text-mutedcopy">
                  <Search className="w-3.5 h-3.5" />
                  <span>Search records…</span>
                  <span className="ml-2 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white border border-hairline">
                    ⌘K
                  </span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-mint-50 border border-mint-100 text-mint-600 text-[12px] font-bold tabular-nums">
                  {pct}% Complete
                </div>
              </div>
            </div>

            {/* Unified KPI Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 bg-white border-b border-hairline divide-y lg:divide-y-0 lg:divide-x divide-hairline">
              <div className="px-5 py-3.5">
                <p className="text-[11px] font-medium text-mutedcopy">Today’s Doses</p>
                <p className="font-display text-[20px] font-bold text-midnight-900 tabular-nums mt-0.5">
                  {takenCount} of {meds.length}
                </p>
              </div>
              <div className="px-5 py-3.5">
                <p className="text-[11px] font-medium text-mutedcopy">Weekly Adherence</p>
                <p className="font-display text-[20px] font-bold text-midnight-900 tabular-nums mt-0.5">
                  94%
                </p>
              </div>
              <div className="px-5 py-3.5">
                <p className="text-[11px] font-medium text-mutedcopy">Next Reminder</p>
                <p className="font-display text-[20px] font-bold text-royal-500 tabular-nums mt-0.5">
                  07:30 PM
                </p>
              </div>
              <div className="px-5 py-3.5">
                <p className="text-[11px] font-medium text-mutedcopy">Organized Records</p>
                <p className="font-display text-[20px] font-bold text-midnight-900 tabular-nums mt-0.5">
                  4 files
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6">
              {tab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  {/* Left 7 cols */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="rounded-xl bg-white border border-hairline overflow-hidden shadow-soft">
                      <div className="px-4 py-3 border-b border-hairline flex items-center justify-between">
                        <span className="text-[13px] font-bold text-midnight-900">
                          Today’s Medication Schedule
                        </span>
                        <span className="text-[11.5px] text-mutedcopy">
                          Click any dose to toggle
                        </span>
                      </div>

                      <div className="divide-y divide-hairline">
                        {meds.map((med) => {
                          const done = med.status === 'taken';
                          return (
                            <div
                              key={med.id}
                              onClick={() => toggleDose(med.id)}
                              className="px-4 py-3 flex items-center justify-between gap-3 hover:bg-royal-50/40 transition-colors cursor-pointer"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <button
                                  type="button"
                                  aria-label={`Toggle ${med.name}`}
                                  className={`w-5 h-5 rounded-md flex items-center justify-center border flex-shrink-0 transition-all ${
                                    done
                                      ? 'bg-royal-500 border-royal-500 text-white'
                                      : 'bg-white border-slate-300 hover:border-royal-500'
                                  }`}
                                >
                                  {done && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </button>
                                <div className="min-w-0">
                                  <div className="flex items-baseline gap-2">
                                    <span
                                      className={`text-[13.5px] font-semibold truncate ${
                                        done
                                          ? 'text-mutedcopy line-through'
                                          : 'text-midnight-900'
                                      }`}
                                    >
                                      {med.name}
                                    </span>
                                    <span className="text-[12px] text-mutedcopy tabular-nums">
                                      {med.dosage}
                                    </span>
                                  </div>
                                  <p className="text-[11.5px] text-mutedcopy truncate">
                                    {med.frequency} · {med.notes}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2.5 flex-shrink-0">
                                <span className="text-[12px] font-medium text-slatecopy tabular-nums hidden sm:inline">
                                  {med.time}
                                </span>
                                <span
                                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-lg ${
                                    done
                                      ? 'bg-mint-50 text-mint-600 border border-mint-100'
                                      : 'bg-royal-50 text-royal-600 border border-royal-100'
                                  }`}
                                >
                                  {done ? 'Taken' : 'Pending'}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="rounded-xl bg-white border border-hairline overflow-hidden shadow-soft">
                      <div className="px-4 py-3 border-b border-hairline flex items-center justify-between">
                        <span className="text-[13px] font-bold text-midnight-900">
                          Recent Health Records
                        </span>
                        <button
                          onClick={() => setTab('records')}
                          className="text-[12px] font-semibold text-royal-500 hover:text-royal-700 cursor-pointer"
                        >
                          View all
                        </button>
                      </div>
                      <div className="divide-y divide-hairline">
                        {SAMPLE_HEALTH_RECORDS.slice(0, 2).map((rec) => (
                          <div
                            key={rec.id}
                            className="px-4 py-3 flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <FileText className="w-4 h-4 text-royal-500 flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="text-[13px] font-semibold text-midnight-900 truncate">
                                  {rec.title}
                                </p>
                                <p className="text-[11.5px] text-mutedcopy truncate">
                                  {rec.category} · {rec.provider}
                                </p>
                              </div>
                            </div>
                            <span className="text-[11.5px] text-mutedcopy flex-shrink-0 tabular-nums">
                              {rec.date}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right 5 cols */}
                  <div className="lg:col-span-5 space-y-5">
                    <div className="rounded-xl bg-white border border-hairline p-4 shadow-soft">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-[13px] font-bold text-midnight-900">
                            Weekly Adherence
                          </p>
                          <p className="text-[11px] text-mutedcopy">7-day demo trend</p>
                        </div>
                        <span className="text-[11.5px] font-bold text-mint-600 bg-mint-50 px-2.5 py-0.5 rounded-lg tabular-nums">
                          94% avg
                        </span>
                      </div>
                      <div className="h-28 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={WEEKLY_ADHERENCE_DATA}
                            margin={{ top: 4, right: 0, left: 0, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient id="showcaseBarGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#356DF3" />
                                <stop offset="100%" stopColor="#9DE8C8" />
                              </linearGradient>
                            </defs>
                            <XAxis
                              dataKey="day"
                              axisLine={false}
                              tickLine={false}
                              tick={{ fontSize: 10, fill: '#748297' }}
                            />
                            <Tooltip
                              cursor={{ fill: '#EAF3FF' }}
                              contentStyle={{
                                backgroundColor: '#101D35',
                                border: 'none',
                                borderRadius: '10px',
                                color: '#fff',
                                fontSize: '11px',
                                padding: '6px 10px',
                              }}
                            />
                            <Bar
                              dataKey="adherence"
                              name="Adherence %"
                              fill="url(#showcaseBarGrad)"
                              radius={[5, 5, 0, 0]}
                              maxBarSize={22}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="rounded-xl bg-white border border-hairline p-4 shadow-soft">
                      <p className="text-[13px] font-bold text-midnight-900 mb-3">
                        Daily Health Overview
                      </p>
                      <div className="grid grid-cols-3 gap-2.5">
                        <div className="p-2.5 rounded-xl bg-warmwhite border border-hairline">
                          <Moon className="w-3.5 h-3.5 text-royal-500 mb-1" />
                          <p className="text-[14px] font-bold text-midnight-900 tabular-nums">
                            7h 45m
                          </p>
                          <p className="text-[10.5px] text-mutedcopy">Sleep</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-warmwhite border border-hairline">
                          <Droplets className="w-3.5 h-3.5 text-royal-500 mb-1" />
                          <p className="text-[14px] font-bold text-midnight-900 tabular-nums">
                            1.8 L
                          </p>
                          <p className="text-[10.5px] text-mutedcopy">Hydration</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-warmwhite border border-hairline">
                          <Footprints className="w-3.5 h-3.5 text-mint-600 mb-1" />
                          <p className="text-[14px] font-bold text-midnight-900 tabular-nums">
                            38 min
                          </p>
                          <p className="text-[10.5px] text-mutedcopy">Activity</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl bg-gradient-to-br from-royal-50 via-white to-mint-50/70 border border-royal-100 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center gap-1.5 text-[12.5px] font-bold text-midnight-900">
                          <Sparkles className="w-3.5 h-3.5 text-royal-500" />
                          MediMind AI
                        </span>
                        <span className="text-[10.5px] font-medium text-mutedcopy">
                          Educational
                        </span>
                      </div>
                      <p className="text-[12.5px] text-slatecopy leading-relaxed">
                        Morning doses are logged. Your next scheduled reminder is Lisinopril
                        10 mg at 07:30 PM.
                      </p>
                      <a
                        href="#assistant"
                        className="mt-2.5 inline-flex items-center gap-1 text-[12px] font-semibold text-royal-600 hover:text-midnight-900 transition-colors"
                      >
                        <span>Open AI Assistant</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {tab === 'records' && (
                <div className="rounded-xl bg-white border border-hairline overflow-hidden shadow-soft">
                  <div className="px-5 py-3.5 border-b border-hairline flex items-center justify-between">
                    <span className="text-[13.5px] font-bold text-midnight-900">
                      Organized Health Records
                    </span>
                    <span className="text-[12px] text-mutedcopy">4 clinical entries</span>
                  </div>
                  <div className="divide-y divide-hairline">
                    {SAMPLE_HEALTH_RECORDS.map((rec) => (
                      <div
                        key={rec.id}
                        className="px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-royal-50/30 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[14px] font-semibold text-midnight-900 truncate">
                              {rec.title}
                            </p>
                            <p className="text-[12px] text-mutedcopy truncate">
                              {rec.category} · {rec.provider}
                            </p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-[12.5px] font-medium text-charcoal tabular-nums">
                            {rec.date}
                          </p>
                          <p className="text-[11px] font-semibold text-mint-600">
                            {rec.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === 'history' && (
                <div className="rounded-xl bg-white border border-hairline overflow-hidden shadow-soft">
                  <div className="px-5 py-3.5 border-b border-hairline flex items-center justify-between">
                    <span className="text-[13.5px] font-bold text-midnight-900">
                      Medication Adherence History
                    </span>
                    <span className="text-[12px] text-mutedcopy">Last 5 days (Demo)</span>
                  </div>
                  <div className="divide-y divide-hairline">
                    {MEDICATION_HISTORY.map((row) => (
                      <div
                        key={row.date}
                        className="px-5 py-3.5 flex items-center justify-between gap-4"
                      >
                        <div>
                          <p className="text-[13.5px] font-semibold text-midnight-900">
                            {row.date}
                          </p>
                          <p className="text-[12px] text-mutedcopy">{row.note}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[13px] font-medium text-slatecopy tabular-nums">
                            {row.completed}/{row.total}
                          </span>
                          <span className="text-[11.5px] font-bold px-2.5 py-0.5 rounded-lg bg-mint-50 text-mint-600 tabular-nums">
                            {row.rate}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;
