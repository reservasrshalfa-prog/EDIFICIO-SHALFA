

import React, { useState } from 'react';
import { SHOPPING_SPOTS, SHOPPING_TIPS, FALLBACK_IMAGE } from '../constants';
import { motion } from 'framer-motion';
import { CreditCard, FileText, Clock, MapPin, Zap, ArrowUpRight, Search, ExternalLink, Globe, BarChart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const iconMap: Record<string, React.ReactNode> = {
  CreditCard: <CreditCard size={18} />,
  FileText: <FileText size={18} />,
  Clock: <Clock size={18} />,
  MapPin: <MapPin size={18} />
};

const ShoppingParaguay: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { t, language } = useLanguage();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    window.open(`https://www.comprasparaguai.com.br/busca/?q=${encodeURIComponent(searchQuery)}`, '_blank');
  };

  return (
    <section id="compras" className="py-12 md:py-24 bg-white dark:bg-black text-dark-950 dark:text-white relative overflow-hidden transition-colors duration-500">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-brand-500/5 rounded-full blur-[60px] md:blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 mb-4">
                <Zap size={10} className="text-brand-600 dark:text-brand-400" />
                <span className="text-brand-600 dark:text-brand-400 uppercase tracking-widest text-[9px] md:text-[10px] font-bold">{t('shopping.badge')}</span>
            </div>
            <h2 className="text-3xl md:text-6xl font-serif text-dark-950 dark:text-white mb-4 md:mb-6">{t('shopping.title')}</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light text-sm md:text-lg leading-relaxed">
                {t('shopping.subtitle')}
            </p>
        </div>

        {/* --- ABOUT CIUDAD DEL ESTE SECTION --- */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-16 md:mb-24">
            <div className="relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 border-t border-l border-brand-500"></div>
                <div className="space-y-4">
                    <span className="text-brand-600 dark:text-brand-400 font-bold uppercase tracking-widest text-[10px]">{t('shopping.about_title')}</span>
                    <h3 className="text-2xl md:text-4xl font-serif text-dark-950 dark:text-white leading-tight">
                        {t('shopping.history_title')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 font-light leading-relaxed text-sm md:text-base text-justify">
                        {t('shopping.history_text')}
                    </p>
                </div>
            </div>
            
            <div className="grid gap-6">
                <div className="flex gap-4 p-4 border border-gray-100 dark:border-white/10 rounded-lg bg-gray-50 dark:bg-white/5 hover:border-brand-300 dark:hover:border-brand-500/50 transition-colors">
                    <div className="w-10 h-10 flex-shrink-0 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center text-brand-600 dark:text-brand-400">
                        <BarChart size={20} />
                    </div>
                    <div>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 font-light">
                            {t('shopping.curiosity_1')}
                        </p>
                    </div>
                </div>
                <div className="flex gap-4 p-4 border border-gray-100 dark:border-white/10 rounded-lg bg-gray-50 dark:bg-white/5 hover:border-brand-300 dark:hover:border-brand-500/50 transition-colors">
                    <div className="w-10 h-10 flex-shrink-0 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center text-brand-600 dark:text-brand-400">
                        <Globe size={20} />
                    </div>
                    <div>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 font-light">
                            {t('shopping.curiosity_2')}
                        </p>
                    </div>
                </div>
            </div>
        </div>


        {/* Lojas Container - MOBILE: Horizontal Scroll Snap | DESKTOP: Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 mb-12 md:mb-24 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-10 md:overflow-visible no-scrollbar">
            {SHOPPING_SPOTS.map((spot, index) => {
                const content = (language !== 'pt' && spot.translations) 
                    ? { ...spot, ...spot.translations[language as 'en'|'es'] }
                    : spot;
                
                return (
                <motion.a 
                    href={spot.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={spot.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group flex flex-col h-full cursor-pointer snap-center min-w-[260px] w-[260px] md:w-auto md:min-w-0 relative"
                >
                    {/* Image Container - Desktop Hover Effect added */}
                    <div className="relative h-48 md:h-72 w-full overflow-hidden rounded-sm border border-gray-200 dark:border-white/10 transition-all duration-500 shadow-sm md:group-hover:shadow-2xl md:group-hover:-translate-y-2 bg-gray-100 dark:bg-white/5">
                        <img 
                            src={spot.image} 
                            onError={handleImageError}
                            alt={content.name} 
                            className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105"
                            loading="lazy"
                            decoding="async"
                        />
                        {/* Overlay logic */}
                        <div className="absolute inset-0 bg-black/10 md:group-hover:bg-black/0 transition-colors duration-500"></div>
                        
                        <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20 backdrop-blur-[1px]">
                             <div className="px-4 py-2 border border-white text-white rounded-full bg-black/50 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                 <span>{t('shopping.visit')}</span>
                                 <ArrowUpRight size={12} />
                             </div>
                         </div>
                         
                         {/* Mobile Only Tag */}
                         <div className="md:hidden absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-white text-[9px] font-bold uppercase tracking-widest border border-white/20">
                            {t('shopping.map')}
                         </div>
                    </div>
                    
                    <div className="flex flex-col flex-grow pt-5 bg-white dark:bg-black transition-colors duration-500 px-1">
                        <div className="flex flex-wrap gap-2 mb-2">
                            {spot.tags.slice(0, 2).map(tag => (
                                <span key={tag} className="text-[8px] uppercase tracking-widest font-bold text-brand-600 dark:text-brand-400 border-b border-brand-200 dark:border-brand-800 pb-0.5">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h3 className="text-xl md:text-2xl font-serif text-dark-950 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                            {content.name}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm font-light leading-relaxed border-l-2 border-brand-200 dark:border-brand-900 pl-3 mb-3 line-clamp-3">
                            {content.description}
                        </p>
                    </div>
                </motion.a>
            )})}
        </div>

        {/* Pesquisa e Dicas - Layout Compacto Mobile */}
        <div className="space-y-12">
            
            {/* Pesquisa */}
            <div className="relative rounded-lg overflow-hidden border border-brand-200 dark:border-brand-800/30 bg-brand-50 dark:bg-dark-900 shadow-xl">
                <div className="relative z-10 flex flex-col md:flex-row items-center p-6 md:p-12 gap-6 md:gap-10">
                    <div className="md:w-1/2 space-y-2 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 font-bold uppercase tracking-widest text-[9px]">
                            <Search size={12} />
                            <span>{t('shopping.search_badge')}</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-serif text-dark-950 dark:text-white">{t('shopping.search_title')}</h3>
                        <p className="text-gray-600 dark:text-gray-400 font-light text-sm">
                             {t('shopping.search_desc')}
                        </p>
                    </div>

                    <div className="md:w-1/2 w-full">
                        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                            <input 
                                type="text" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t('shopping.search_placeholder')}
                                className="w-full bg-white dark:bg-black/50 border border-gray-300 dark:border-white/20 rounded-sm px-4 py-3 text-dark-950 dark:text-white text-sm focus:outline-none focus:border-brand-500"
                            />
                            <button 
                                type="submit"
                                className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-sm font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 whitespace-nowrap"
                            >
                                {t('shopping.search_btn')}
                                <ExternalLink size={12} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Dicas - Grid 2 Colunas Mobile */}
            <div className="relative p-6 md:p-12 border border-gray-200 dark:border-white/10 rounded-xl bg-brand-50 dark:bg-dark-950">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {SHOPPING_TIPS.map((tip, index) => {
                        const content = (language !== 'pt' && tip.translations) 
                            ? { ...tip, ...tip.translations[language as 'en'|'es'] }
                            : tip;

                        return (
                        <div key={index} className="flex flex-col gap-3 group">
                            <div className="w-8 h-8 md:w-12 md:h-12 rounded bg-white dark:bg-dark-900 border border-gray-200 dark:border-white/10 flex items-center justify-center text-brand-600 dark:text-brand-400 transition-colors group-hover:bg-brand-50 dark:group-hover:bg-brand-900/20">
                                {iconMap[tip.icon]}
                            </div>
                            <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-dark-950 dark:text-white mb-1">{content.title}</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm font-light leading-relaxed">
                                    {content.text}
                                </p>
                            </div>
                        </div>
                    )})}
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default ShoppingParaguay;
