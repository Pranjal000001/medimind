import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, FolderOpen, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const BrandStory: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !sectionRef.current || !imgRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { yPercent: -6, scale: 1.08 },
        {
          yPercent: 6,
          scale: 1.08,
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

  const challenges = [
    {
      icon: Clock,
      num: '01',
      title: 'Medication schedules slip through daily life',
      description:
        'Generic alarms offer no dosage context, meal pairing, or completion tracking—leaving people uncertain whether a dose was already taken.',
    },
    {
      icon: FolderOpen,
      num: '02',
      title: 'Health records live in disconnected places',
      description:
        'Prescriptions, lab reports, and past dosage changes sit scattered across emails, portals, and drawers instead of one organized space.',
    },
    {
      icon: Compass,
      num: '03',
      title: 'Health trends remain hard to interpret',
      description:
        'Without clear summaries and plain-language guidance, it is difficult to recognize everyday patterns or prepare calmly for appointments.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 lg:py-32 bg-warmwhite border-b border-hairline"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column (5 cols): Parallax Editorial Photograph */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl overflow-hidden border border-hairline shadow-elevated bg-royal-50 aspect-[4/3] lg:aspect-[4/5]">
              <img
                ref={imgRef}
                src="/images/editorial-morning.jpg"
                alt="Sunlit morning glass carafe and ceramic dish on pale travertine"
                className="w-full h-full object-cover will-change-transform"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/60 px-4 py-3 shadow-soft flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-royal-600">
                    Why MediMind
                  </p>
                  <p className="text-[13px] font-semibold text-midnight-900">
                    Calm clarity over everyday chaos
                  </p>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-mint-400" />
              </div>
            </div>
          </motion.div>

          {/* Right Column (7 cols): Story & Structured Healthcare Challenges */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal-50 border border-royal-100 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-royal-600">
                Why MediMind Exists
              </div>
              <h2 className="font-display text-[32px] sm:text-[42px] font-bold text-midnight-900 leading-[1.1]">
                Healthcare is personal.{' '}
                <span className="text-royal-500">Managing it should feel effortless.</span>
              </h2>
              <p className="text-[16px] text-slatecopy leading-[1.7] max-w-2xl">
                MediMind unites prescriptions, daily medication reminders, and everyday
                health context into one thoughtful, intuitive companion.
              </p>
            </div>

            <div className="space-y-4">
              {challenges.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.num}
                    className="group p-5 rounded-2xl bg-white border border-hairline hover:border-royal-200 hover:shadow-soft transition-all duration-200 flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-royal-50 group-hover:bg-royal-500 text-royal-600 group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold text-royal-500">
                          {item.num}
                        </span>
                        <h3 className="font-display text-[17px] font-bold text-midnight-900">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-[14.5px] text-slatecopy leading-[1.65]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
