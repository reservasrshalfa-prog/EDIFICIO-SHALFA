
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  useEffect(() => {
    // 1. Check LocalStorage
    const storedLang = localStorage.getItem('shalfa_lang') as Language;
    if (storedLang && ['pt', 'en', 'es'].includes(storedLang)) {
      setLanguage(storedLang);
      return;
    }

    // 2. Check Device Language
    const deviceLang = navigator.language || (navigator as any).userLanguage;
    if (deviceLang) {
      if (deviceLang.startsWith('en')) {
        setLanguage('en');
      } else if (deviceLang.startsWith('es')) {
        setLanguage('es');
      } else {
        setLanguage('pt');
      }
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('shalfa_lang', lang);
  };

  const t = (path: string): string => {
    const keys = path.split('.');
    let current: any = TRANSLATIONS[language];
    
    for (const key of keys) {
      if (current[key] === undefined) {
        // Fallback to PT if translation missing
        let fallback: any = TRANSLATIONS['pt'];
        for (const k of keys) {
            if(fallback[k]) fallback = fallback[k];
        }
        return typeof fallback === 'string' ? fallback : path;
      }
      current = current[key];
    }
    
    return typeof current === 'string' ? current : path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
