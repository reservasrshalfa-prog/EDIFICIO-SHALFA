


import React, { useRef, useState } from "react";
import { ATTRACTIONS, FALLBACK_IMAGE } from "../constants";
import { motion } from "framer-motion";
import { MapPin, Play } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

interface AttractionItemProps {
  attraction: typeof ATTRACTIONS[number];
  index: number;
}

const AttractionItem: React.FC<AttractionItemProps> = ({ attraction, index }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { language } = useLanguage();

  const getTranslatedContent = () => {
      if (language !== 'pt' && attraction.translations) {
          const trans = attraction.translations[language as 'en'|'es'];
          return { ...attraction, ...trans };
      }
      return attraction;
  };
  
  const content = getTranslatedContent();

  const handleMouseEnter = () => {
    if (videoRef.current && attraction.videoUrl) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsVideoPlaying(true))
          .catch((error) => {
            console.warn("Video playback prevented:", error);
            setIsVideoPlaying(false);
          });
      }
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsVideoPlaying(false);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`flex flex-col md:flex-row gap-6 md:gap-20 items-center mb-16 md:mb-40 ${!isEven ? 'md:flex-row-reverse' : ''}`}
    >
      {/* MEDIA CONTAINER - Mobile: Short Landscape (16/9) | Desktop: Portrait (3/4) */}
      <div 
        className="w-full md:w-[40%] relative aspect-video md:aspect-[3/4] group cursor-pointer shadow-lg"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="hidden md:block absolute top-4 left-4 right-[-16px] bottom-[-16px] border border-brand-400/30 dark:border-brand-500/20 z-0 transition-all duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
        
        <div className="relative w-full h-full overflow-hidden bg-black z-10 rounded-sm md:rounded-none">
            <img 
            src={attraction.image} 
            onError={handleImageError}
            alt={content.name}
            className={`relative z-10 w-full h-full object-cover transition-opacity duration-700 ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`}
            loading="lazy"
            decoding="async"
            />

            {attraction.videoUrl && (
            <video
                ref={videoRef}
                src={attraction.videoUrl}
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
                muted
                loop
                playsInline
                preload="none"
            />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 z-20 pointer-events-none"></div>

            {!isVideoPlaying && attraction.videoUrl && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 group-hover:opacity-0 z-30">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/20">
                        <Play className="text-white fill-white ml-1 opacity-80" size={20} />
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* TEXT CONTAINER */}
      <div className="w-full md:w-[60%] space-y-4 md:space-y-8 relative px-2">
         {/* Line only on Desktop */}
         <div className={`absolute top-0 ${isEven ? '-left-10' : '-right-10'} w-[1px] h-32 bg-gradient-to-b from-brand-400 to-transparent hidden md:block`}></div>

         <div className="flex items-center gap-3 text-brand-600 dark:text-brand-400">
            <div className="p-1.5 md:p-2 bg-brand-100 dark:bg-brand-900/30 rounded-full border border-brand-200 dark:border-white/10">
                <MapPin size={12} className="md:w-4 md:h-4" />
            </div>
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">{attraction.distance}</span>
         </div>
         
         <h3 className="text-3xl md:text-6xl lg:text-7xl font-serif text-dark-950 dark:text-white leading-tight">
            {content.name}
         </h3>

         {content.story && (
             <div className="pl-4 border-l-2 border-brand-400 dark:border-brand-600 py-2 md:py-3 my-2 md:my-4 bg-brand-50/50 dark:bg-white/5 rounded-r-lg">
                 <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-brand-500 block mb-1">A História</span>
                 <p className="text-sm md:text-2xl italic font-serif text-brand-800 dark:text-brand-200">
                    "{content.story}"
                 </p>
             </div>
         )}

         <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed text-sm md:text-lg text-justify">
            {content.description}
         </p>

         <button className="group flex items-center gap-4 text-[10px] md:text-xs font-bold uppercase tracking-widest text-dark-950 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors mt-4 md:mt-8">
             <span className="relative">
                Explorar Detalhes
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-500 transition-all duration-300 group-hover:w-full"></span>
             </span>
             <div className="h-[1px] w-8 md:w-12 bg-current group-hover:w-20 transition-all duration-300"></div>
         </button>
      </div>
    </motion.div>
  );
};

const Tourism: React.FC = () => {
    return (
        <section id="turismo" className="py-16 md:py-32 px-4 bg-brand-50 dark:bg-dark-900 transition-colors duration-500 overflow-hidden relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/50 to-transparent dark:from-white/5 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-12 md:mb-40">
                     <span className="text-brand-700 dark:text-brand-400 uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold">Experiências Imersivas</span>
                     <h2 className="text-4xl md:text-8xl font-serif text-dark-950 dark:text-white mt-4 md:mt-6 opacity-90">Foz do Iguaçu</h2>
                     <div className="w-12 md:w-24 h-1 bg-brand-500 mx-auto mt-4 md:mt-8"></div>
                </div>

                <div className="space-y-12 md:space-y-24">
                    {ATTRACTIONS.map((attraction, index) => (
                        <AttractionItem key={attraction.id} attraction={attraction} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Tourism;
