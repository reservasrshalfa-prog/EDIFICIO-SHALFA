
import React from 'react';
import { Wifi, Snowflake, Car, Utensils, Clock, LogOut, Info, Coffee, Ban } from 'lucide-react';
import { HOTEL_RULES } from '../constants';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Features: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      id: 'wifi',
      name: t('features.wifi.name'),
      description: t('features.wifi.desc'),
      icon: Wifi,
    },
    {
      id: 'ac',
      name: t('features.ac.name'),
      description: t('features.ac.desc'),
      icon: Snowflake,
    },
    {
      id: 'parking',
      name: t('features.parking.name'),
      description: t('features.parking.desc'),
      icon: Car,
    },
    {
      id: 'kitchen',
      name: t('features.kitchen.name'),
      description: t('features.kitchen.desc'),
      icon: Utensils,
    },
    {
      id: 'breakfast',
      name: t('features.breakfast.name'),
      description: t('features.breakfast.desc'),
      icon: Coffee,
    },
  ];

  return (
    <section className="relative transition-colors duration-500">
      {/* Comodidades Grid - Flex Wrap para centralizar itens impares */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-wrap justify-center gap-3 md:gap-6">
          {features.map((feature, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              key={feature.id}
              className="group relative bg-white dark:bg-dark-950 p-4 md:p-8 flex flex-col items-center text-center transition-all duration-500 shadow-sm hover:shadow-xl dark:shadow-none border border-gray-100 dark:border-white/5 rounded-sm overflow-hidden w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex-grow max-w-sm"
            >
              {/* Spotlight Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 to-transparent dark:from-brand-500/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className="mb-3 md:mb-6 p-3 md:p-4 rounded-full border transition-colors bg-brand-50 dark:bg-transparent relative z-10 border-brand-100 dark:border-white/10 group-hover:border-brand-300 dark:group-hover:border-brand-500/50">
                {feature.id === 'breakfast' ? (
                    <div className="relative flex items-center justify-center">
                        <feature.icon className="h-5 w-5 md:h-6 md:w-6 text-brand-700 dark:text-brand-400 opacity-90" />
                        <Ban className="absolute h-8 w-8 md:h-10 md:w-10 text-brand-700/80 dark:text-brand-300/80" strokeWidth={1.5} />
                    </div>
                ) : (
                    <feature.icon className="h-5 w-5 md:h-6 md:w-6 text-brand-700 dark:text-brand-400" />
                )}
              </div>

              <h3 className="text-sm md:text-lg font-serif text-dark-950 dark:text-white mb-1 md:mb-3 relative z-10">
                {feature.name}
              </h3>

              <p className="text-[10px] md:text-sm text-gray-500 dark:text-gray-400 leading-relaxed group-hover:text-dark-950 dark:group-hover:text-gray-300 transition-colors relative z-10">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Informações Essenciais Strip */}
      <div className="bg-brand-900 dark:bg-dark-950 border-t border-b border-brand-500/20 py-8 md:py-12 mt-6 md:mt-12 relative overflow-hidden transition-colors duration-500">
        {/* Subtle noise on strip */}
         <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
         
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-20 text-center md:text-left">
                
                {/* Container Flex Row for Mobile to save space */}
                <div className="flex flex-row justify-between w-full md:w-auto gap-4 md:gap-20">
                    {/* Check-in */}
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 flex-1">
                        <div className="p-2 md:p-3 bg-brand-500/10 rounded-full text-brand-400">
                            <Clock size={18} className="md:w-6 md:h-6" />
                        </div>
                        <div>
                            <span className="block text-brand-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-0.5">Check-in</span>
                            <p className="text-white font-serif text-sm md:text-lg whitespace-nowrap">{HOTEL_RULES.checkIn}</p>
                        </div>
                    </div>

                    <div className="md:hidden w-[1px] h-10 bg-white/10 self-center"></div>

                    {/* Check-out */}
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 flex-1">
                        <div className="p-2 md:p-3 bg-brand-500/10 rounded-full text-brand-400">
                            <LogOut size={18} className="md:w-6 md:h-6" />
                        </div>
                        <div>
                            <span className="block text-brand-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-0.5">Check-out</span>
                            <p className="text-white font-serif text-sm md:text-lg whitespace-nowrap">{HOTEL_RULES.checkOut}</p>
                        </div>
                    </div>
                </div>

                <div className="hidden md:block w-[1px] h-12 bg-white/10"></div>

                 {/* Recepção */}
                 <div className="flex items-center gap-4">
                     <div className="p-2 md:p-3 bg-brand-500/10 rounded-full text-brand-400">
                        <Info size={18} className="md:w-6 md:h-6" />
                    </div>
                    <div className="text-center md:text-left">
                        <span className="block text-brand-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-0.5">Recepção</span>
                        <p className="text-white font-serif text-sm md:text-lg">Atendimento Presencial</p>
                    </div>
                </div>

            </div>
            <p className="text-center text-gray-500 text-[10px] mt-6">
                *O Check-in é realizado diretamente na recepção.
            </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
