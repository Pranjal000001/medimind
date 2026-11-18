import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { WEEKLY_ADHERENCE_DATA, ACTIVITY_TREND_DATA } from '../../data/sampleData';
import AnimatedCounter from '../ui/AnimatedCounter';

const LuxuryTooltip = ({ active, payload, label, suffix = '' }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-midnight-900/95 backdrop-blur-md text-white px-3.5 py-2.5 rounded-xl shadow-elevated border border-white/10 text-[12px]">
      <p className="font-medium text-slate-300 mb-0.5">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="font-semibold text-white tabular-nums">
          {entry.name}:{' '}
          <span className="text-mint-300">
            {entry.value}
            {suffix}
          </span>
        </p>
      ))}
    </div>
  );
};

export const HealthAnalyticsSection: React.FC = () => {
  const [trendMetric, setTrendMetric] = useState<'activityScore' | 'sleepHours'>(
    'activityScore'
  );

  return (
    <section
      id="analytics"
      className="py-24 lg:py-32 bg-warmwhite border-b border-hairline"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal-50 border border-royal-100 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-royal-600 mb-4">
              Health Analytics
            </div>
            <h2 className="font-display text-[32px] sm:text-[42px] font-bold text-midnight-900 leading-[1.1]">
              Visual progress built for clarity.
            </h2>
            <p className="mt-3 text-[16px] text-slatecopy leading-[1.68]">
              Follow weekly medication adherence, daily progress, and personal wellness
              trends through smooth, understated charts.
            </p>
          </div>

          <span className="inline-flex items-center px-3.5 py-2 rounded-xl bg-white border border-hairline text-[12px] font-medium text-slatecopy shadow-soft self-start md:self-end">
            Demo Data · Illustrative Sample
          </span>
        </div>

        {/* Animated 4-KPI Strip */}
        <div className="rounded-2xl bg-white border border-hairline shadow-soft grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-hairline mb-6">
          <div className="p-6">
            <p className="text-[12px] font-medium text-mutedcopy">Weekly Adherence</p>
            <p className="font-display text-[30px] font-bold text-midnight-900 mt-1">
              <AnimatedCounter value={94} suffix="%" />
            </p>
            <p className="text-[12px] text-mint-600 font-semibold mt-0.5">
              5 of 7 days at 100%
            </p>
          </div>
          <div className="p-6">
            <p className="text-[12px] font-medium text-mutedcopy">Daily Completion</p>
            <p className="font-display text-[30px] font-bold text-midnight-900 mt-1">
              <AnimatedCounter value={33} />
              <span className="text-[18px] font-medium text-mutedcopy">/35</span>
            </p>
            <p className="text-[12px] text-mutedcopy mt-0.5">Scheduled doses logged</p>
          </div>
          <div className="p-6">
            <p className="text-[12px] font-medium text-mutedcopy">Activity Index</p>
            <p className="font-display text-[30px] font-bold text-midnight-900 mt-1">
              <AnimatedCounter value={87} />
            </p>
            <p className="text-[12px] text-royal-600 font-semibold mt-0.5">
              Steady 7-day trend
            </p>
          </div>
          <div className="p-6">
            <p className="text-[12px] font-medium text-mutedcopy">Sleep Logged</p>
            <p className="font-display text-[30px] font-bold text-midnight-900 mt-1">
              <AnimatedCounter value={7.7} decimals={1} suffix=" hrs" />
            </p>
            <p className="text-[12px] text-mutedcopy mt-0.5">Average nightly duration</p>
          </div>
        </div>

        {/* Two Recharts Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-6 rounded-2xl bg-white border border-hairline p-6 shadow-elevated"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="font-display text-[17px] font-bold text-midnight-900">
                  Weekly Medicine Adherence
                </h3>
                <p className="text-[12.5px] text-mutedcopy mt-0.5">
                  Daily schedule completion rate (Demo data)
                </p>
              </div>
              <span className="text-[12px] font-bold px-2.5 py-1 rounded-lg bg-mint-50 text-mint-600 tabular-nums">
                94% avg
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={WEEKLY_ADHERENCE_DATA}
                  margin={{ top: 8, right: 8, left: -24, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="royalMintBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#356DF3" />
                      <stop offset="100%" stopColor="#9DE8C8" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E3EAF4"
                  />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#748297' }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#748297' }}
                  />
                  <Tooltip
                    cursor={{ fill: '#EAF3FF' }}
                    content={<LuxuryTooltip suffix="%" />}
                  />
                  <Bar
                    dataKey="adherence"
                    name="Completion"
                    fill="url(#royalMintBar)"
                    radius={[7, 7, 0, 0]}
                    maxBarSize={34}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="lg:col-span-6 rounded-2xl bg-white border border-hairline p-6 shadow-elevated"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="font-display text-[17px] font-bold text-midnight-900">
                  Personal Health Trends
                </h3>
                <p className="text-[12.5px] text-mutedcopy mt-0.5">
                  Daily user-logged wellness activity (Demo data)
                </p>
              </div>

              <div className="inline-flex rounded-xl bg-warmwhite border border-hairline p-1">
                <button
                  onClick={() => setTrendMetric('activityScore')}
                  className={`px-3 py-1 rounded-lg text-[12px] font-semibold transition-all cursor-pointer ${
                    trendMetric === 'activityScore'
                      ? 'bg-midnight-900 text-white shadow-sm'
                      : 'text-slatecopy hover:text-midnight-900'
                  }`}
                >
                  Activity
                </button>
                <button
                  onClick={() => setTrendMetric('sleepHours')}
                  className={`px-3 py-1 rounded-lg text-[12px] font-semibold transition-all cursor-pointer ${
                    trendMetric === 'sleepHours'
                      ? 'bg-midnight-900 text-white shadow-sm'
                      : 'text-slatecopy hover:text-midnight-900'
                  }`}
                >
                  Sleep
                </button>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={ACTIVITY_TREND_DATA}
                  margin={{ top: 8, right: 8, left: -24, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="royalMintArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#356DF3" stopOpacity={0.28} />
                      <stop offset="65%" stopColor="#9DE8C8" stopOpacity={0.14} />
                      <stop offset="95%" stopColor="#9DE8C8" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E3EAF4"
                  />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#748297' }}
                  />
                  <YAxis
                    domain={trendMetric === 'activityScore' ? [60, 100] : [5, 10]}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#748297' }}
                  />
                  <Tooltip
                    content={
                      <LuxuryTooltip
                        suffix={trendMetric === 'activityScore' ? ' / 100' : ' hrs'}
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey={trendMetric}
                    name={trendMetric === 'activityScore' ? 'Activity' : 'Sleep'}
                    stroke="#356DF3"
                    strokeWidth={2.5}
                    fill="url(#royalMintArea)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HealthAnalyticsSection;
