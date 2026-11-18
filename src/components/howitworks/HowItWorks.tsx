import React from 'react';
import { motion } from 'framer-motion';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Create Your Profile',
      description:
        'Set up your personal health space and preferred morning, afternoon, and evening hours in under two minutes.',
    },
    {
      num: '02',
      title: 'Add Your Medicines',
      description:
        'Enter medicine names, dosages, frequencies, and mealtime instructions so every scheduled dose is mapped cleanly.',
    },
    {
      num: '03',
      title: 'Organize Health Records',
      description:
        'Keep prescriptions, lab summaries, and medication history organized chronologically for quick clinical reference.',
    },
    {
      num: '04',
      title: 'Track & Understand',
      description:
        'Log daily completion, view steady personal trends, and lean on MediMind AI for calm organizational clarity.',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-white border-b border-hairline">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal-50 border border-royal-100 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-royal-600 mb-4">
            How It Works
          </div>
          <h2 className="font-display text-[32px] sm:text-[42px] font-bold text-midnight-900 leading-[1.1]">
            Four seamless steps to a calmer routine.
          </h2>
        </motion.div>

        {/* Horizontal Timeline on Desktop */}
        <div className="hidden lg:block relative">
          <div
            aria-hidden="true"
            className="absolute top-6 left-6 right-6 h-[2px] bg-gradient-to-r from-royal-500/30 via-royal-400/40 to-mint-400/50"
          />
          <div className="grid grid-cols-4 gap-8 relative">
            {steps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-royal-500/35 group-hover:border-royal-500 group-hover:bg-royal-500 text-royal-600 group-hover:text-white font-display text-[14px] font-bold flex items-center justify-center mb-6 relative z-10 shadow-soft transition-all duration-200 tabular-nums">
                  {step.num}
                </div>
                <h3 className="font-display text-[19px] font-bold text-midnight-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-[14.5px] text-slatecopy leading-[1.68]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vertical Timeline on Tablet & Mobile */}
        <div className="lg:hidden relative pl-11 space-y-9 before:content-[''] before:absolute before:top-2 before:bottom-2 before:left-[17px] before:w-[2px] before:bg-gradient-to-b before:from-royal-500/40 before:to-mint-400/40">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="relative"
            >
              <div className="absolute -left-11 top-0 w-9 h-9 rounded-xl bg-white border-2 border-royal-500 text-royal-600 font-display text-[12px] font-bold flex items-center justify-center shadow-soft tabular-nums">
                {step.num}
              </div>
              <h3 className="font-display text-[18px] font-bold text-midnight-900">
                {step.title}
              </h3>
              <p className="text-[14.5px] text-slatecopy leading-[1.65] mt-1">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
