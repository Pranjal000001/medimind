import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Check, Clock, Calendar, Trash2, Pill } from 'lucide-react';
import {
  INITIAL_MEDICINES,
  UPCOMING_SCHEDULE,
  MEDICATION_HISTORY,
} from '../../data/sampleData';
import { Medicine } from '../../types';
import AddMedicineModal from './AddMedicineModal';

export const MedicineManagementPreview: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>(INITIAL_MEDICINES);
  const [activeTab, setActiveTab] = useState<'today' | 'upcoming' | 'history'>('today');
  const [periodFilter, setPeriodFilter] = useState<string>('All');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const toggleStatus = (id: string) => {
    setMedicines((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: m.status === 'taken' ? 'pending' : 'taken' }
          : m
      )
    );
  };

  const handleAdd = (newMed: Medicine) => {
    setMedicines((prev) => [newMed, ...prev]);
    setActiveTab('today');
    setPeriodFilter('All');
  };

  const handleRemove = (id: string) => {
    setMedicines((prev) => prev.filter((m) => m.id !== id));
  };

  const filteredMeds =
    periodFilter === 'All'
      ? medicines
      : medicines.filter((m) => m.period === periodFilter);

  const takenCount = medicines.filter((m) => m.status === 'taken').length;
  const pct = medicines.length > 0 ? Math.round((takenCount / medicines.length) * 100) : 0;

  // SVG progress ring geometry
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <section id="medications" className="py-24 lg:py-32 bg-white border-b border-hairline">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header with Animated Progress Ring */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal-50 border border-royal-100 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-royal-600 mb-4">
              <Pill className="w-3.5 h-3.5" />
              <span>Medicine Management</span>
            </div>
            <h2 className="font-display text-[32px] sm:text-[42px] font-bold text-midnight-900 leading-[1.1]">
              Every dose tracked with effortless precision.
            </h2>
            <p className="mt-3 text-[16px] text-slatecopy leading-[1.68]">
              Log daily doses in one tap, filter by routine window, check upcoming
              reminders, or add new medications live.
            </p>
          </div>

          <div className="flex items-center gap-5 self-start lg:self-end">
            {/* Animated Completion Ring */}
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-warmwhite border border-hairline shadow-soft">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-12 h-12 -rotate-90" viewBox="0 0 56 56">
                  <circle
                    cx="28"
                    cy="28"
                    r={radius}
                    fill="none"
                    stroke="#E3EAF4"
                    strokeWidth="4.5"
                  />
                  <motion.circle
                    cx="28"
                    cy="28"
                    r={radius}
                    fill="none"
                    stroke="url(#ringGrad)"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                  />
                  <defs>
                    <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#356DF3" />
                      <stop offset="100%" stopColor="#2CC28E" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="absolute text-[11px] font-bold text-midnight-900 tabular-nums">
                  {pct}%
                </span>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-mutedcopy">
                  Completed
                </p>
                <p className="font-display text-[17px] font-bold text-midnight-900 tabular-nums">
                  {takenCount} / {medicines.length} doses
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsAddOpen(true)}
              className="btn-premium px-5 py-3 text-[13.5px] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Medicine</span>
            </button>
          </div>
        </div>

        {/* Main Management Container */}
        <div className="rounded-2xl bg-warmwhite border border-hairline shadow-elevated overflow-hidden">
          {/* Interactive Tabs & Period Filter Bar */}
          <div className="px-5 sm:px-6 py-4 bg-white border-b border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-6" role="tablist" aria-label="Medicine tabs">
              {(
                [
                  { id: 'today', label: 'Today', count: medicines.length },
                  { id: 'upcoming', label: 'Upcoming', count: UPCOMING_SCHEDULE.length },
                  { id: 'history', label: 'History', count: MEDICATION_HISTORY.length },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-2.5 -mb-[17px] text-[14px] font-semibold transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'text-midnight-900 border-b-2 border-royal-500'
                      : 'text-mutedcopy hover:text-midnight-900'
                  }`}
                >
                  {tab.label}
                  <span className="ml-1.5 text-[11.5px] font-medium text-mutedcopy tabular-nums">
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {activeTab === 'today' && (
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {['All', 'Morning', 'Afternoon', 'Evening', 'Night'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriodFilter(p)}
                    className={`px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all cursor-pointer ${
                      periodFilter === p
                        ? 'bg-midnight-900 text-white shadow-sm'
                        : 'text-slatecopy hover:bg-royal-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* TODAY TAB: Sleek Interactive Medicine Cards */}
          {activeTab === 'today' && (
            <div className="p-5 sm:p-6">
              {filteredMeds.length === 0 ? (
                <div className="py-14 text-center bg-white rounded-xl border border-hairline">
                  <p className="font-display text-[16px] font-semibold text-midnight-900">
                    No medications scheduled for {periodFilter.toLowerCase()}.
                  </p>
                  <p className="text-[13.5px] text-mutedcopy mt-1">
                    Select All or add a new medicine to this window.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMeds.map((med) => {
                    const done = med.status === 'taken';
                    return (
                      <motion.div
                        key={med.id}
                        layout
                        className={`rounded-xl border p-5 transition-all duration-200 flex flex-col justify-between gap-4 ${
                          done
                            ? 'bg-mint-50/40 border-mint-200/80'
                            : 'bg-white border-hairline hover:border-royal-200 hover:shadow-soft'
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                  done
                                    ? 'bg-mint-100 text-mint-600'
                                    : 'bg-royal-50 text-royal-600'
                                }`}
                              >
                                <Pill className="w-4 h-4" />
                              </div>
                              <div>
                                <h4
                                  className={`font-display text-[15.5px] font-bold ${
                                    done
                                      ? 'line-through text-mutedcopy'
                                      : 'text-midnight-900'
                                  }`}
                                >
                                  {med.name}
                                </h4>
                                <p className="text-[12px] font-medium text-slatecopy tabular-nums">
                                  {med.dosage} · {med.frequency}
                                </p>
                              </div>
                            </div>

                            <span
                              className={`text-[11px] font-bold px-2.5 py-0.5 rounded-lg ${
                                done
                                  ? 'bg-mint-100 text-mint-600'
                                  : 'bg-royal-50 text-royal-600'
                              }`}
                            >
                              {done ? 'Taken' : 'Pending'}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-[12px] text-slatecopy bg-warmwhite rounded-lg px-3 py-2 border border-hairline/80 mb-2.5">
                            <span className="inline-flex items-center gap-1.5 font-semibold text-midnight-900 tabular-nums">
                              <Clock className="w-3.5 h-3.5 text-royal-500" />
                              {med.time}
                            </span>
                            <span className="text-mutedcopy">{med.period}</span>
                          </div>

                          <p className="text-[12.5px] text-slatecopy leading-relaxed">
                            {med.notes}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-hairline flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => handleRemove(med.id)}
                            aria-label={`Remove ${med.name}`}
                            className="p-1.5 rounded-lg text-mutedcopy hover:text-midnight-900 hover:bg-white transition-colors cursor-pointer"
                            title="Remove from demo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => toggleStatus(med.id)}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-all cursor-pointer ${
                              done
                                ? 'bg-white border border-hairline text-slatecopy hover:text-midnight-900'
                                : 'bg-royal-500 hover:bg-royal-600 text-white shadow-sm'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>{done ? 'Mark Pending' : 'Mark Taken'}</span>
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* UPCOMING TAB */}
          {activeTab === 'upcoming' && (
            <div className="divide-y divide-hairline bg-white">
              {UPCOMING_SCHEDULE.map((item) => (
                <div
                  key={item.id}
                  className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-warmwhite/60 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-royal-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[14.5px] font-semibold text-midnight-900">
                        {item.medicine}
                      </p>
                      <p className="text-[12.5px] text-mutedcopy mt-0.5">{item.note}</p>
                    </div>
                  </div>
                  <div className="pl-7 sm:pl-0 text-[13px] font-semibold text-slatecopy tabular-nums">
                    {item.day} · <span className="text-royal-600">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* HISTORY TAB */}
          {activeTab === 'history' && (
            <div className="overflow-x-auto bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-hairline bg-warmwhite text-[11.5px] font-semibold uppercase tracking-[0.06em] text-mutedcopy">
                    <th className="py-3.5 px-6">Date</th>
                    <th className="py-3.5 px-6">Completed</th>
                    <th className="py-3.5 px-6">Adherence</th>
                    <th className="py-3.5 px-6">Summary</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline text-[13.5px]">
                  {MEDICATION_HISTORY.map((row) => (
                    <tr key={row.date} className="hover:bg-warmwhite/60 transition-colors">
                      <td className="py-3.5 px-6 font-semibold text-midnight-900">
                        {row.date}
                      </td>
                      <td className="py-3.5 px-6 text-charcoal tabular-nums">
                        {row.completed} of {row.total}
                      </td>
                      <td className="py-3.5 px-6">
                        <span className="inline-block px-2.5 py-0.5 rounded-lg bg-mint-50 text-mint-600 text-[12px] font-bold tabular-nums">
                          {row.rate}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 text-slatecopy">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="px-6 py-3 bg-white border-t border-hairline flex items-center justify-between text-[11.5px] text-mutedcopy">
            <span>Demo data · Interactive React state</span>
            <span>Ready for backend sync</span>
          </div>
        </div>
      </div>

      <AddMedicineModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAdd}
      />
    </section>
  );
};

export default MedicineManagementPreview;
