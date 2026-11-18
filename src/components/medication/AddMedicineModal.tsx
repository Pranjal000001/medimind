import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, Pill } from 'lucide-react';
import { Medicine } from '../../types';

interface AddMedicineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (med: Medicine) => void;
}

export const AddMedicineModal: React.FC<AddMedicineModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('09:00 AM');
  const [frequency, setFrequency] = useState('Once daily');
  const [period, setPeriod] = useState<'Morning' | 'Afternoon' | 'Evening' | 'Night'>('Morning');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !dosage.trim()) {
      setError('Please enter both a medication name and dosage.');
      return;
    }

    onAdd({
      id: `med-${Date.now()}`,
      name: name.trim(),
      dosage: dosage.trim(),
      frequency,
      time: time.trim() || '09:00 AM',
      period,
      status: 'pending',
      notes: notes.trim() || 'Scheduled in daily routine',
      prescribedBy: 'Added in demo',
    });

    setName('');
    setDosage('');
    setTime('09:00 AM');
    setFrequency('Once daily');
    setPeriod('Morning');
    setNotes('');
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-950/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-med-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg rounded-2xl bg-white border border-hairline p-6 sm:p-8 shadow-product"
          >
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-5 right-5 p-2 rounded-xl text-mutedcopy hover:text-midnight-900 hover:bg-warmwhite transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center">
                <Pill className="w-5 h-5" />
              </div>
              <div>
                <h3
                  id="add-med-title"
                  className="font-display text-[20px] font-bold text-midnight-900"
                >
                  Add a medication
                </h3>
                <p className="text-[12.5px] text-mutedcopy">
                  Updates your interactive schedule immediately
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-4 px-3.5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-[12.5px] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[12px] font-semibold text-charcoal mb-1.5">
                  Medicine Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. CoQ10, Levothyroxine"
                  className="w-full rounded-xl border border-hairline bg-warmwhite px-3.5 py-2.5 text-[14px] text-charcoal placeholder:text-mutedcopy focus:outline-none focus:border-royal-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[12px] font-semibold text-charcoal mb-1.5">
                    Dosage *
                  </label>
                  <input
                    type="text"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    placeholder="e.g. 100 mg"
                    className="w-full rounded-xl border border-hairline bg-warmwhite px-3.5 py-2.5 text-[14px] text-charcoal placeholder:text-mutedcopy focus:outline-none focus:border-royal-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-charcoal mb-1.5">
                    Scheduled Time
                  </label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="09:00 AM"
                    className="w-full rounded-xl border border-hairline bg-warmwhite px-3.5 py-2.5 text-[14px] text-charcoal focus:outline-none focus:border-royal-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[12px] font-semibold text-charcoal mb-1.5">
                    Frequency
                  </label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    className="w-full rounded-xl border border-hairline bg-warmwhite px-3.5 py-2.5 text-[14px] text-charcoal focus:outline-none focus:border-royal-500 focus:bg-white"
                  >
                    <option value="Once daily">Once daily</option>
                    <option value="Twice daily">Twice daily</option>
                    <option value="Every other day">Every other day</option>
                    <option value="Weekly">Weekly</option>
                    <option value="As needed">As needed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-charcoal mb-1.5">
                    Routine Period
                  </label>
                  <select
                    value={period}
                    onChange={(e) =>
                      setPeriod(e.target.value as 'Morning' | 'Afternoon' | 'Evening' | 'Night')
                    }
                    className="w-full rounded-xl border border-hairline bg-warmwhite px-3.5 py-2.5 text-[14px] text-charcoal focus:outline-none focus:border-royal-500 focus:bg-white"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                    <option value="Night">Night</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-semibold text-charcoal mb-1.5">
                  Notes (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Take with breakfast"
                  className="w-full rounded-xl border border-hairline bg-warmwhite px-3.5 py-2.5 text-[14px] text-charcoal placeholder:text-mutedcopy focus:outline-none focus:border-royal-500 focus:bg-white"
                />
              </div>

              <div className="pt-4 border-t border-hairline flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-[13.5px] font-medium text-slatecopy hover:text-midnight-900 hover:bg-warmwhite transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-premium px-5 py-2.5 text-[13.5px] cursor-pointer"
                >
                  Add Medicine
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddMedicineModal;
