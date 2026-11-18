import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, SlidersHorizontal, KeyRound, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const TrustPrivacy: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current || !portraitRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        portraitRef.current,
        { yPercent: -5, scale: 1.07 },
        {
          yPercent: 5,
          scale: 1.07,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pillars = [
    {
      icon: Shield,
      title: 'Privacy-conscious design',
      description:
        'Built around data minimization—collecting only what supports your personal schedule without advertising trackers or data brokering.',
    },
    {
      icon: SlidersHorizontal,
      title: 'User-controlled records',
      description:
        'You stay in command of every entry. Add, update, or remove your medications and personal health records whenever your routine changes.',
    },
    {
      icon: KeyRound,
      title: 'Secure authentication architecture',
      description:
        'Structured around clean account boundaries and modern authentication architecture ready for production identity integration.',
    },
    {
      icon: Eye,
      title: 'Transparent AI limitations',
      description:
        'MediMind AI is clearly scoped for health organization and general education—never medical diagnosis, clinical advice, or emergency care.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="privacy"
      className="py-24 lg:py-32 bg-warmwhite border-b border-hairline"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left 7 cols */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint-50 border border-mint-100 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-mint-600">
                Privacy &amp; Trust
              </div>
              <h2 className="font-display text-[32px] sm:text-[42px] font-bold text-midnight-900 leading-[1.1]">
                Your health information deserves thoughtful care.
              </h2>
              <p className="text-[16px] text-slatecopy leading-[1.68] max-w-xl">
                Trust in digital healthcare begins with transparency, clear product
                boundaries, and respect for your personal data.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 rounded-2xl border border-hairline bg-white overflow-hidden shadow-soft">
              {pillars.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.title}
                    className={`p-6 hover:bg-royal-50/25 transition-colors ${
                      idx % 2 === 0 ? 'sm:border-r border-hairline' : ''
                    } ${idx < 2 ? 'border-b border-hairline' : ''}`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-royal-50 text-royal-600 flex items-center justify-center mb-4">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-display text-[16px] font-bold text-midnight-900 mb-1.5">
                      {p.title}
                    </h3>
                    <p className="text-[13.5px] text-slatecopy leading-[1.62]">
                      {p.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right 5 cols: Parallax Editorial Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="lg:col-span-5"
          >
            <div className="rounded-2xl overflow-hidden border border-hairline shadow-elevated aspect-[4/5] bg-white">
              <img
                ref={portraitRef}
                src="/images/editorial-calm.jpg"
                alt="Quiet editorial portrait beside a sunlit window"
                className="w-full h-full object-cover will-change-transform"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TrustPrivacy;
