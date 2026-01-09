

import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_SLIDES, FALLBACK_IMAGE, resolveGoogleDriveImage } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t, language } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
    }, 8000); 
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide(prev => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.warn(`Failed to load image: ${e.currentTarget.src}`);
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  const getSlideContent = (index: number) => {
      const slide = HERO_SLIDES[index];
      if (language !== 'pt' && slide.translations) {
          const trans = slide.translations[language as 'en'|'es'];
          return { ...slide, ...trans };
      }
      return slide;
  };

  const activeSlide = getSlideContent(currentSlide);

  return (
    <div className="relative h-[85vh] md:h-screen min-h-[500px] overflow-hidden bg-black text-white">
      
      {/* Background Slides */}
      <AnimatePresence mode='wait'>
        <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.0, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
        >
            <motion.img
                src={resolveGoogleDriveImage(activeSlide.image)}
                onError={handleImageError}
                alt={activeSlide.alt}
                className="w-full h-full object-cover"
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 15, ease: "linear" }}
                loading="eager"
                fetchPriority="high"
            />
            
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 opacity-70"></div>
        </motion.div>
      </AnimatePresence>

      {/* Hero Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
        
        {/* Animated Subtitle */}
        <motion.div
            key={`sub-${currentSlide}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center gap-4 mb-3 md:mb-6"
        >
             <div className="h-[1px] w-4 md:w-8 bg-brand-400/60"></div>
             <span className="text-brand-300 uppercase tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-sm font-light">
                 {activeSlide.subtitle}
             </span>
             <div className="h-[1px] w-4 md:w-8 bg-brand-400/60"></div>
        </motion.div>

        {/* Main Title (Cinematic) */}
        <div className="overflow-hidden px-2">
             <motion.h1 
                key={`title-${currentSlide}`}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-serif font-medium text-white tracking-tight mix-blend-overlay italic"
             >
                {activeSlide.title}
            </motion.h1>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
            className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer text-white/50 hover:text-brand-400 transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            onClick={() => {
                const el = document.getElementById('turismo');
                el?.scrollIntoView({ behavior: 'smooth' });
            }}
        >
            <span className="text-[9px] md:text-[10px] uppercase tracking-widest">{t('hero.discover')}</span>
            <ArrowDown className="animate-bounce w-4 h-4 md:w-5 md:h-5" />
        </motion.div>

      </div>

      {/* Discrete Navigation */}
      <div className="absolute bottom-12 right-12 z-30 hidden md:flex gap-4">
        <button onClick={prevSlide} className="p-3 border border-white/10 rounded-full hover:bg-white/10 hover:border-brand-400 transition-all text-white">
          <ChevronLeft size={20} />
        </button>
        <button onClick={nextSlide} className="p-3 border border-white/10 rounded-full hover:bg-white/10 hover:border-brand-400 transition-all text-white">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Hero;
