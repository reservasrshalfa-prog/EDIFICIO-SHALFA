
import React, { useState, useEffect, useMemo } from 'react';
import { ChevronRight, ChevronLeft, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_SLIDES, FALLBACK_IMAGE, resolveGoogleDriveImage } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t, language } = useLanguage();
  const isMobile = useMemo(() => typeof window !== 'undefined' && window.innerWidth < 768, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
    }, 6000); 
    return () => clearInterval(timer);
  }, []);

  const activeSlide = useMemo(() => {
      const slide = HERO_SLIDES[currentSlide];
      if (language !== 'pt' && slide.translations) {
          return { ...slide, ...slide.translations[language as 'en'|'es'] };
      }
      return slide;
  }, [currentSlide, language]);

  return (
    <div className="relative h-[70vh] md:h-screen min-h-[450px] overflow-hidden bg-black text-white">
      
      <AnimatePresence mode='wait'>
        <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-0"
        >
            <img
                src={resolveGoogleDriveImage(activeSlide.image)}
                // Fixed: onError should return void to avoid TypeScript mismatch
                onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                alt={activeSlide.alt}
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.7)' }}
                // Fixed: fetchpriority is fetchPriority in React types
                fetchPriority="high"
                decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
        >
             <span className="text-brand-300 uppercase tracking-[0.3em] text-[10px] md:text-sm font-bold">
                 {activeSlide.subtitle}
             </span>
        </motion.div>

        <div className="overflow-hidden">
             <motion.h1 
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-8xl lg:text-9xl font-serif font-medium text-white italic"
             >
                {activeSlide.title}
            </motion.h1>
        </div>

        <div 
            className="absolute bottom-8 cursor-pointer text-white/60 animate-bounce"
            onClick={() => document.getElementById('turismo')?.scrollIntoView({ behavior: 'smooth' })}
        >
            <ArrowDown size={24} />
        </div>
      </div>

      <div className="absolute bottom-10 right-10 z-30 hidden md:flex gap-4">
        <button onClick={() => setCurrentSlide(prev => prev === 0 ? HERO_SLIDES.length - 1 : prev - 1)} className="p-2 border border-white/20 rounded-full hover:bg-white/10 transition-colors">
          <ChevronLeft size={20} />
        </button>
        <button onClick={() => setCurrentSlide(prev => prev === HERO_SLIDES.length - 1 ? 0 : prev + 1)} className="p-2 border border-white/20 rounded-full hover:bg-white/10 transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Hero;
