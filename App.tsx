
import React, { useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Tourism from './components/Tourism';
import ShoppingParaguay from './components/ShoppingParaguay';
import LocationMap from './components/LocationMap';
import Footer from './components/Footer';
import Concierge from './components/Concierge';
import BookingPage from './components/BookingPage'; 
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from 'react-hot-toast';
import { motion, useScroll, useSpring } from 'framer-motion';
import { HOTEL_INFO } from './constants';
import { ArrowRight } from 'lucide-react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const RevealOnScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Detecta se é mobile para simplificar a animação
    const isMobile = useMemo(() => typeof window !== 'undefined' && window.innerWidth < 768, []);
    
    return (
        <motion.div
            initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: isMobile ? "-20px" : "-50px" }}
            transition={{ duration: isMobile ? 0.4 : 0.6, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
        >
            {children}
        </motion.div>
    );
};

const HomeContent: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-brand-50 dark:bg-dark-950 font-sans text-gray-900 dark:text-gray-200 transition-colors duration-500 relative overflow-x-hidden">
      
      {/* Progress Bar - Somente visível se não for mobile muito pequeno para economizar draw calls */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-brand-700 dark:bg-brand-500 origin-left z-[100] hidden md:block"
        style={{ scaleX }}
      />

      <Hero />
      
      <RevealOnScroll>
        <Tourism />
      </RevealOnScroll>

      <RevealOnScroll>
        <ShoppingParaguay />
      </RevealOnScroll>

      {/* Hotel Introduction */}
      <RevealOnScroll>
          <div className="bg-brand-50 dark:bg-dark-900 py-12 md:py-24 px-4 relative transition-colors duration-500">
              <div className="max-w-4xl mx-auto text-center mb-8 md:mb-16">
                  <span className="text-brand-700 dark:text-brand-400 uppercase tracking-widest text-[10px] md:text-xs font-bold">{t('home_intro.label')}</span>
                  <h2 className="text-3xl md:text-5xl font-serif text-dark-950 dark:text-white mt-4 mb-4 md:mb-6">{t('home_intro.title')}</h2>
                  <div className="w-12 md:w-16 h-[1px] bg-brand-400 mx-auto mb-6 md:mb-8"></div>
                  <p className="text-base md:text-xl text-gray-700 dark:text-gray-300 font-light leading-relaxed">
                      {t('home_intro.desc')}
                  </p>
              </div>
              <Features />
          </div>
      </RevealOnScroll>
      
      <RevealOnScroll>
        <div id="cta-quartos" className="py-16 md:py-32 bg-brand-100 dark:bg-black relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#C59D5F 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
             
             <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                <h2 className="text-3xl md:text-6xl font-serif text-dark-950 dark:text-white mb-6 md:mb-8">{t('rooms.title')}</h2>
                <p className="text-base md:text-xl text-gray-600 dark:text-gray-300 font-light mb-10 md:mb-12 max-w-2xl mx-auto">
                    {t('rooms.subtitle')}
                </p>
                
                <button 
                    onClick={() => navigate('/reservas')}
                    className="group relative inline-flex items-center gap-4 px-8 py-4 md:px-10 md:py-5 bg-brand-700 dark:bg-brand-600 text-white font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-brand-800 dark:hover:bg-brand-500 transition-all shadow-xl"
                >
                    {t('rooms.cta')}
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
        </div>
      </RevealOnScroll>

      <RevealOnScroll>
        <div id="localizacao" className="py-12 md:py-24 px-4 bg-brand-50 dark:bg-dark-900 scroll-mt-20 transition-colors duration-500">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                <div className="order-2 md:order-1 space-y-6 md:space-y-8">
                    <div>
                        <span className="text-brand-700 dark:text-brand-600 uppercase tracking-widest text-[10px] md:text-xs font-bold">{t('location_section.label')}</span>
                        <h2 className="text-3xl md:text-4xl font-serif text-dark-950 dark:text-white mt-3">{t('location_section.title')}</h2>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg font-light leading-relaxed border-l-2 border-brand-400 pl-4 md:pl-6">
                        {t('location_section.desc')}
                    </p>
                    <div className="bg-white/50 dark:bg-white/5 p-4 md:p-6 rounded-sm border border-brand-200 dark:border-white/10">
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest mb-2">{t('location_section.address_label')}</p>
                        <p className="text-dark-950 dark:text-white font-serif text-base md:text-lg">{HOTEL_INFO.address}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:gap-8 pt-4">
                        <div>
                           <span className="block text-2xl md:text-3xl font-serif text-brand-700 dark:text-brand-600 mb-1">5 min</span>
                           <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500">{t('location_section.distance_bridge')}</span>
                        </div>
                        <div>
                           <span className="block text-2xl md:text-3xl font-serif text-brand-700 dark:text-brand-600 mb-1">15 min</span>
                           <span className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500">{t('location_section.distance_dam')}</span>
                        </div>
                    </div>
                </div>
                <div className="order-1 md:order-2 h-[300px] md:h-[500px] w-full shadow-lg border border-white dark:border-white/10">
                    <LocationMap />
                </div>
            </div>
        </div>
      </RevealOnScroll>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
        <HashRouter>
        <ScrollToTop />
        <div className="relative antialiased selection:bg-brand-400 selection:text-black">
            <Navbar />
            <Routes>
            <Route path="/" element={<HomeContent />} />
            <Route path="/reservas" element={<BookingPage />} />
            </Routes>
            <Footer />
            <Concierge />
            <Toaster position="bottom-center" />
        </div>
        </HashRouter>
    </LanguageProvider>
  );
};

export default App;
