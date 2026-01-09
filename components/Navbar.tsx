
import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { Language } from "../types";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  // Verifica se estamos na Home
  const isHome = location.pathname === '/';
  
  // Lógica de Contraste: Usa texto escuro se estiver rolado OU se não estiver na home (página branca)
  const useDarkText = scrolled || !isHome;
  
  // Lógica de Fundo: Usa fundo sólido se estiver rolado OU se não estiver na home
  const useSolidBackground = scrolled || !isHome;

  useEffect(() => {
    if (!('theme' in localStorage) || localStorage.theme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (isOpen) {
          setIsVisible(true);
      } else {
          if (currentScrollY < 10) {
              setIsVisible(true);
          } 
          else if (currentScrollY > lastScrollY && currentScrollY > 100) {
              setIsVisible(false);
          } 
          else if (currentScrollY < lastScrollY) {
              setIsVisible(true);
          }
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isOpen]);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  const handleNavClick = (target: string) => {
    setIsOpen(false);
    if (target === 'quartos' || target === 'reservas') {
        navigate('/reservas');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                scrollToId(target);
            }, 100);
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

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const LangButton = ({ lang }: { lang: Language }) => (
    <button
        onClick={() => setLanguage(lang)}
        className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-wider transition-all border border-transparent
            ${language === lang 
            ? 'bg-brand-600 text-white shadow-md' 
            : useDarkText 
                ? 'text-dark-950 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 border-gray-200 dark:border-white/10' 
                : 'text-white/80 hover:bg-white/20 border-white/20'
            }
        `}
    >
        {lang.toUpperCase()}
    </button>
  );

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 border-b transform ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${
        useSolidBackground
          ? "bg-[#F9F8F6]/95 dark:bg-dark-950/95 backdrop-blur-md border-brand-200/50 dark:border-white/10 py-2 md:py-3 shadow-lg dark:shadow-none"
          : "bg-transparent border-transparent py-4 md:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex flex-col items-center group"
          >
            <span className={`font-serif tracking-[0.2em] font-bold text-lg md:text-2xl transition-colors duration-500 ${
              useDarkText ? "text-dark-950 dark:text-brand-300" : "text-white"
            }`}>
              SHALFA
            </span>
            <span className={`text-[9px] md:text-[10px] tracking-[0.4em] uppercase font-medium transition-colors duration-500 ${
               useDarkText ? "text-brand-700 dark:text-gray-400" : "text-gray-300"
            }`}>
              Residencial
            </span>
          </a>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {[
              { label: t('nav.rooms'), id: "quartos" },
              { label: t('nav.tourism'), id: "turismo" },
              { label: t('nav.shopping'), id: "compras" },
              { label: t('nav.location'), id: "localizacao" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium tracking-wide transition-all duration-500 relative group
                  ${useDarkText 
                    ? "text-dark-950 dark:text-gray-300 hover:text-brand-700 dark:hover:text-brand-300" 
                    : "text-white hover:text-brand-200"}
                `}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${
                    useDarkText ? "bg-brand-700 dark:bg-brand-400" : "bg-white"
                }`}></span>
              </button>
            ))}

             {/* Language Selector */}
             <div className="flex items-center gap-1 px-3 border-l border-r border-gray-200/20 mx-2">
                 <LangButton lang="pt" />
                 <LangButton lang="en" />
                 <LangButton lang="es" />
             </div>

             {/* Theme Toggle */}
             <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors duration-300 ${
                    useDarkText 
                    ? "text-brand-800 dark:text-white hover:bg-brand-100 dark:hover:bg-white/10" 
                    : "text-white hover:bg-white/10"
                }`}
                aria-label="Alternar Tema"
            >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* BOTÃO RESERVA DESKTOP */}
            <button 
              onClick={() => handleNavClick('reservas')}
              className={`relative overflow-hidden px-6 py-2.5 border text-xs lg:text-sm font-bold tracking-[0.15em] transition-all duration-500 group
                ${useDarkText 
                  ? "border-brand-700 text-brand-800 hover:bg-brand-800 hover:text-white dark:border-brand-500/50 dark:text-brand-300 dark:hover:bg-brand-500 dark:hover:text-white" 
                  : "border-white/40 text-white hover:bg-white hover:text-dark-950 backdrop-blur-sm"}
              `}
            >
              {t('nav.book')}
            </button>
          </div>

          {/* MOBILE CONTROLS */}
          <div className="md:hidden flex items-center gap-3">
             <button 
                onClick={() => handleNavClick('reservas')}
                className={`px-3 py-1.5 rounded-sm text-[10px] font-bold tracking-widest uppercase border transition-all ${
                    useDarkText
                    ? "bg-brand-700 text-white border-brand-700"
                    : "bg-white/10 backdrop-blur-md text-white border-white/30"
                }`}
             >
                {t('nav.book_mobile')}
             </button>

             <button 
                onClick={toggleTheme}
                className={`p-1.5 transition-colors ${
                    useDarkText ? "text-brand-800 dark:text-white" : "text-white"
                }`}
            >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-1 transition-colors ${
                useDarkText ? "text-dark-950 dark:text-brand-300" : "text-white"
                }`}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-[#F9F8F6] dark:bg-dark-950 border-b border-brand-200 dark:border-white/10 absolute w-full animate-fade-in h-screen z-50 top-0 left-0 pt-20">
          <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-dark-950 dark:text-white">
              <X size={24} />
          </button>
          <div className="flex flex-col items-center justify-center h-[70vh] space-y-8">
            
            {/* Mobile Lang Selector */}
             <div className="flex items-center gap-4 mb-4 p-2 bg-gray-100 dark:bg-white/5 rounded-full">
                 <button onClick={() => setLanguage('pt')} className={`px-4 py-2 rounded-full text-xs font-bold ${language === 'pt' ? 'bg-brand-600 text-white' : 'text-gray-500 dark:text-gray-400'}`}>PT</button>
                 <button onClick={() => setLanguage('en')} className={`px-4 py-2 rounded-full text-xs font-bold ${language === 'en' ? 'bg-brand-600 text-white' : 'text-gray-500 dark:text-gray-400'}`}>EN</button>
                 <button onClick={() => setLanguage('es')} className={`px-4 py-2 rounded-full text-xs font-bold ${language === 'es' ? 'bg-brand-600 text-white' : 'text-gray-500 dark:text-gray-400'}`}>ES</button>
             </div>

            {[
              { label: t('nav.rooms'), id: "quartos" },
              { label: t('nav.tourism'), id: "turismo" },
              { label: t('nav.shopping'), id: "compras" },
              { label: t('nav.location'), id: "localizacao" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-2xl font-serif text-dark-950 dark:text-white hover:text-brand-700 dark:hover:text-brand-400 transition-colors"
              >
                {item.label}
              </button>
            ))}

            <button 
              onClick={() => handleNavClick('reservas')}
              className="mt-8 px-12 py-4 bg-brand-800 dark:bg-brand-600 text-white tracking-widest text-sm font-bold uppercase hover:bg-dark-950 transition shadow-xl"
            >
              {t('nav.book')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
