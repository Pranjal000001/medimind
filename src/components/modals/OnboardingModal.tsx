import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
}) => {
  const [step, setStep] = useState(1);
  const [focusAreas, setFocusAreas] = useState<string[]>([
    'Organize daily medicine schedules',
    'Keep prescriptions and health records together',
  ]);
  const [morningTime, setMorningTime] = useState('08:00 AM');
  const [eveningTime, setEveningTime] = useState('07:30 PM');

  const options = [
    'Organize daily medicine schedules',
    'Keep prescriptions and health records together',
    'Understand health details in plain language',
    'Track everyday wellness habits',
  ];

  const toggleFocus = (item: string) => {
    setFocusAreas((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  const handleFinish = () => {
    onComplete();
    setStep(1);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-950/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="onboarding-heading"
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
              aria-label="Close setup dialog"
              className="absolute top-5 right-5 p-2 rounded-xl text-mutedcopy hover:text-midnight-900 hover:bg-warmwhite transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-6">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    step >= s ? 'bg-royal-500' : 'bg-hairline'
                  }`}
                />
              ))}
            </div>

            {step === 1 && (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-royal-600">
                  Step 1 of 3
                </p>
                <h3
                  id="onboarding-heading"
                  className="font-display text-[22px] font-bold text-midnight-900 mt-1"
                >
                  What would you like to organize first?
                </h3>
                <p className="text-[13.5px] text-slatecopy mt-1 mb-5">
                  Select the focus areas for your personal workspace.
                </p>

                <div className="space-y-2.5 mb-7">
                  {options.map((opt) => {
                    const selected = focusAreas.includes(opt);
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => toggleFocus(opt)}
                        className={`w-full text-left px-4 py-3 rounded-xl border flex items-center justify-between gap-3 transition-all cursor-pointer ${
                          selected
                            ? 'bg-royal-50/70 border-royal-400/50 text-midnight-900'
                            : 'bg-warmwhite border-hairline text-slatecopy hover:border-royal-200'
                        }`}
                      >
                        <span className="text-[13.5px] font-medium">{opt}</span>
                        <span
                          className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 ${
                            selected
                              ? 'bg-royal-500 border-royal-500 text-white'
                              : 'border-slate-300 bg-white'
                          }`}
                        >
                          {selected && <Check className="w-3 h-3 stroke-[3]" />}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="btn-premium px-5 py-2.5 text-[13.5px] cursor-pointer"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-royal-600">
                  Step 2 of 3
                </p>
                <h3 className="font-display text-[22px] font-bold text-midnight-900 mt-1">
                  Set your routine windows
                </h3>
                <p className="text-[13.5px] text-slatecopy mt-1 mb-6">
                  Group reminders naturally around morning and evening hours.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div>
                    <label className="block text-[12px] font-semibold text-charcoal mb-1.5">
                      Morning Window
                    </label>
                    <input
                      type="text"
                      value={morningTime}
                      onChange={(e) => setMorningTime(e.target.value)}
                      className="w-full rounded-xl border border-hairline bg-warmwhite px-3.5 py-2.5 text-[14px] font-medium text-charcoal focus:outline-none focus:border-royal-500 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-charcoal mb-1.5">
                      Evening Window
                    </label>
                    <input
                      type="text"
                      value={eveningTime}
                      onChange={(e) => setEveningTime(e.target.value)}
                      className="w-full rounded-xl border border-hairline bg-warmwhite px-3.5 py-2.5 text-[14px] font-medium text-charcoal focus:outline-none focus:border-royal-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-3 py-2 text-[13.5px] font-medium text-slatecopy hover:text-midnight-900 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="btn-premium px-5 py-2.5 text-[13.5px] cursor-pointer"
                  >
                    <span>Review Setup</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-royal-600">
                  Step 3 of 3
                </p>
                <h3 className="font-display text-[22px] font-bold text-midnight-900 mt-1">
                  Your MediMind workspace is ready
                </h3>
                <p className="text-[13.5px] text-slatecopy mt-1 mb-6">
                  Continue directly to the interactive medication dashboard below.
                </p>

                <div className="rounded-xl bg-warmwhite border border-hairline p-4 space-y-2.5 text-[13px] mb-7">
                  <div className="flex justify-between">
                    <span className="text-mutedcopy">Selected focus areas</span>
                    <span className="font-bold text-midnight-900 tabular-nums">
                      {focusAreas.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mutedcopy">Routine windows</span>
                    <span className="font-bold text-midnight-900 tabular-nums">
                      {morningTime} · {eveningTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-mutedcopy">Environment</span>
                    <span className="font-bold text-royal-600">Interactive Demo</span>
                  </div>
                </div>

                <button
                  onClick={handleFinish}
                  className="btn-premium w-full py-3 text-[14px] cursor-pointer"
                >
                  <span>Open Interactive Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OnboardingModal;
