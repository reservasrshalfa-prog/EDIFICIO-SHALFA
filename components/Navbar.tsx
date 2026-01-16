
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X, Sun, Moon, Languages } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { Language } from "../types";
// Import AnimatePresence from framer-motion to fix the missing name error
import { AnimatePresence } from "framer-motion";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isLangOpen, setIsLangOpen] = useState(false);
  
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const isHome = location.pathname === '/';
  const useDarkText = scrolled || !isHome;
  const useSolidBackground = scrolled || !isHome;

  const navItems = [
    { id: 'quartos', labelKey: 'rooms' },
    { id: 'turismo', labelKey: 'tourism' },
    { id: 'compras', labelKey: 'shopping' },
    { id: 'localizacao', labelKey: 'location' }
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'pt', label: 'PT' },
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' }
  ];

  useEffect(() => {
    const isDarkMode = !('theme' in localStorage) || localStorage.theme === 'dark';
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        setScrolled(currentScrollY > 20);
        if (!isOpen) {
          if (currentScrollY < 10) setIsVisible(true);
          else if (currentScrollY > lastScrollY.current && currentScrollY > 100) setIsVisible(false);
          else if (currentScrollY < lastScrollY.current) setIsVisible(true);
        }
        lastScrollY.current = currentScrollY;
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  const handleNavClick = (target: string) => {
    setIsOpen(false);
    if (target === 'quartos' || target === 'reservas') {
        navigate('/reservas');
    } else {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => scrollToId(target), 100);
        } else {
            scrollToId(target);
        }
    }
  };

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 border-b transform ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        useSolidBackground
          ? "bg-[#F9F8F6] dark:bg-dark-950 md:backdrop-blur-md border-brand-200/50 dark:border-white/10 py-2 md:py-3 shadow-md"
          : "bg-transparent border-transparent py-4 md:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex flex-col items-center group"
          >
            <span className={`font-serif tracking-[0.2em] font-bold text-lg md:text-2xl ${
              useDarkText ? "text-dark-950 dark:text-brand-300" : "text-white"
            }`}>
              SHALFA
            </span>
            <span className={`text-[9px] md:text-[10px] tracking-[0.4em] uppercase font-medium ${
               useDarkText ? "text-brand-700 dark:text-gray-400" : "text-gray-300"
            }`}>
              Residencial
            </span>
          </a>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium tracking-wide transition-colors relative group ${
                  useDarkText ? "text-dark-950 dark:text-gray-300 hover:text-brand-700" : "text-white hover:text-brand-200"
                }`}
              >
                {t(`nav.${item.labelKey}`)}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-700 transition-all group-hover:w-full"></span>
              </button>
            ))}

            {/* Language Selector */}
            <div className="relative">
                <button 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className={`flex items-center gap-1.5 p-2 rounded-md transition-colors ${useDarkText ? "text-brand-800 dark:text-gray-300" : "text-white"} hover:bg-white/10`}
                >
                    <Languages size={16} />
                    <span className="text-xs font-bold">{language.toUpperCase()}</span>
                </button>
                <AnimatePresence>
                {isLangOpen && (
                    <div className="absolute top-full mt-2 right-0 bg-white dark:bg-dark-900 border border-brand-200 dark:border-white/10 rounded shadow-xl overflow-hidden min-w-[80px]">
                        {languages.map(lang => (
                            <button
                                key={lang.code}
                                onClick={() => { setLanguage(lang.code); setIsLangOpen(false); }}
                                className={`w-full px-4 py-2 text-xs font-bold text-left hover:bg-brand-50 dark:hover:bg-white/5 transition-colors ${language === lang.code ? 'text-brand-600 bg-brand-50/50' : 'text-gray-600 dark:text-gray-300'}`}
                            >
                                {lang.label}
                            </button>
                        ))}
                    </div>
                )}
                </AnimatePresence>
            </div>

             {/* Theme Toggle */}
             <button onClick={toggleTheme} className={`p-2 rounded-full ${useDarkText ? "text-brand-800 dark:text-white" : "text-white"}`}>
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button 
              onClick={() => handleNavClick('reservas')}
              className={`px-6 py-2 border text-xs lg:text-sm font-bold tracking-[0.15em] transition-all ${
                useDarkText 
                  ? "border-brand-700 text-brand-800 hover:bg-brand-800 hover:text-white" 
                  : "border-white/40 text-white hover:bg-white hover:text-dark-950"
              }`}
            >
              {t('nav.book')}
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="md:hidden flex items-center gap-2">
             <button 
                onClick={() => handleNavClick('reservas')}
                className={`px-3 py-1.5 rounded-sm text-[10px] font-bold tracking-widest uppercase border ${
                    useDarkText ? "bg-brand-700 text-white border-brand-700" : "bg-white/10 text-white border-white/30"
                }`}
             >
                {t('nav.book_mobile')}
             </button>
            
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-1 ${useDarkText ? "text-dark-950 dark:text-brand-300" : "text-white"}`}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isOpen && (
        <div className="md:hidden bg-[#F9F8F6] dark:bg-dark-950 fixed inset-0 z-50 pt-20 animate-fade-in flex flex-col">
          <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-dark-950 dark:text-white p-2">
              <X size={28} />
          </button>
          <div className="flex flex-col items-center space-y-8 mt-10 flex-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-2xl font-serif text-dark-950 dark:text-white"
              >
                {t(`nav.${item.labelKey}`)}
              </button>
            ))}
            
            {/* Mobile Lang Selection */}
            <div className="flex gap-4 border-t border-brand-200 dark:border-white/10 pt-8 w-full justify-center">
                {languages.map(lang => (
                    <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setIsOpen(false); }}
                        className={`px-4 py-2 rounded text-sm font-bold border ${language === lang.code ? 'bg-brand-700 border-brand-700 text-white' : 'border-brand-200 dark:border-white/10 text-gray-500'}`}
                    >
                        {lang.label}
                    </button>
                ))}
            </div>

            <button onClick={toggleTheme} className="flex items-center gap-2 text-dark-950 dark:text-white font-bold">
                {isDark ? <><Sun size={20}/> Modo Claro</> : <><Moon size={20}/> Modo Escuro</>}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
