import React, { useState } from 'react';
import { MotionConfig, AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/navbar/Navbar';
import { Hero } from './components/hero/Hero';
import { BrandStory } from './components/story/BrandStory';
import { ProductShowcase } from './components/showcase/ProductShowcase';
import { CoreFeatures } from './components/features/CoreFeatures';
import { AiAssistantSection } from './components/assistant/AiAssistantSection';
import { MedicineManagementPreview } from './components/medication/MedicineManagementPreview';
import { HealthAnalyticsSection } from './components/analytics/HealthAnalyticsSection';
import { HowItWorks } from './components/howitworks/HowItWorks';
import { TrustPrivacy } from './components/trust/TrustPrivacy';
import { FinalCTA } from './components/cta/FinalCTA';
import { Footer } from './components/footer/Footer';
import { AuthModal } from './components/modals/AuthModal';
import { OnboardingModal } from './components/modals/OnboardingModal';
import { ContactModal } from './components/modals/ContactModal';

export function App() {
  const [authOpen, setAuthOpen] = useState(false);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-warmwhite text-charcoal overflow-x-hidden">
        {/* Luxury Notification Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="fixed top-24 right-6 z-50 px-4 py-3 rounded-xl bg-midnight-900 text-white text-[13px] font-medium shadow-elevated border border-white/15 flex items-center gap-2.5"
            >
              <span className="w-2 h-2 rounded-full bg-mint-400" />
              <span>{toast}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Luxury Navigation Bar */}
        <Navbar
          onSignInClick={() => setAuthOpen(true)}
          onGetStartedClick={() => setOnboardingOpen(true)}
          onContactClick={() => setContactOpen(true)}
        />

        {/* Complete Art-Directed Page Flow */}
        <main className="flex-1">
          <Hero
            onExploreClick={() => scrollTo('platform')}
            onDiscoverClick={() => scrollTo('features')}
          />
          <BrandStory />
          <ProductShowcase />
          <CoreFeatures />
          <AiAssistantSection />
          <MedicineManagementPreview />
          <HealthAnalyticsSection />
          <HowItWorks />
          <TrustPrivacy />
          <FinalCTA onStartClick={() => setOnboardingOpen(true)} />
        </main>

        <Footer onContactClick={() => setContactOpen(true)} />

        <AuthModal
          isOpen={authOpen}
          onClose={() => setAuthOpen(false)}
          onSuccess={(name) => showToast(`Signed in to demo preview as ${name}.`)}
        />

        <OnboardingModal
          isOpen={onboardingOpen}
          onClose={() => setOnboardingOpen(false)}
          onComplete={() => {
            showToast('MediMind demo workspace ready.');
            scrollTo('medications');
          }}
        />

        <ContactModal
          isOpen={contactOpen}
          onClose={() => setContactOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}

export default App;
