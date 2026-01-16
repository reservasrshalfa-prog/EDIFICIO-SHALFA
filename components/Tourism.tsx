
import React, { useRef, useState, useMemo } from "react";
import { ATTRACTIONS, FALLBACK_IMAGE } from "../constants";
import { motion } from "framer-motion";
import { MapPin, Play } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const AttractionItem: React.FC<{ attraction: typeof ATTRACTIONS[number]; index: number }> = ({ attraction, index }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { language } = useLanguage();
  
  const isMobile = useMemo(() => typeof window !== 'undefined' && window.innerWidth < 768, []);

  const content = useMemo(() => {
    if (language !== 'pt' && attraction.translations) {
        return { ...attraction, ...attraction.translations[language as 'en'|'es'] };
    }
    return attraction;
  }, [language, attraction]);

  const toggleVideo = () => {
    if (!attraction.videoUrl || !videoRef.current) return;
    
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile && videoRef.current && attraction.videoUrl) {
      videoRef.current.play().then(() => setIsVideoPlaying(true)).catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsVideoPlaying(false);
    }
  };

  const isEven = index % 2 === 0;

  return (
    <div 
      className={`flex flex-col md:flex-row gap-8 md:gap-20 items-center mb-16 md:mb-40 ${!isEven ? 'md:flex-row-reverse' : ''}`}
    >
      <div 
        className="w-full md:w-[40%] relative aspect-video md:aspect-[3/4] group cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={isMobile ? toggleVideo : undefined}
      >
        <div className="relative w-full h-full overflow-hidden bg-black rounded-lg md:rounded-none">
            <img 
              src={attraction.image} 
              // Fixed: onError should return void to avoid TypeScript mismatch
              onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
              alt={content.name}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-10 ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`}
              loading="lazy"
              decoding="async"
            />

            {attraction.videoUrl && (
            <video
                ref={videoRef}
                src={attraction.videoUrl}
                className="absolute inset-0 w-full h-full object-cover z-0"
                muted
                loop
                playsInline
                preload="none"
            />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20 pointer-events-none"></div>

            {!isVideoPlaying && attraction.videoUrl && (
                <div className="absolute inset-0 flex items-center justify-center z-30">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40">
                        <Play className="text-white fill-white ml-1" size={20} />
                    </div>
                </div>
            )}
        </div>
      </div>

      <div className="w-full md:w-[60%] space-y-4 px-2">
         <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400">
            <MapPin size={14} />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest">{attraction.distance}</span>
         </div>
         
         <h3 className="text-3xl md:text-6xl font-serif text-dark-950 dark:text-white leading-tight">
            {content.name}
         </h3>

         {content.story && (
             <div className="pl-4 border-l-2 border-brand-400 py-2 bg-brand-50/50 dark:bg-white/5">
                 <p className="text-sm md:text-xl italic font-serif text-brand-800 dark:text-brand-200">
                    "{content.story}"
                 </p>
             </div>
         )}

         <p className="text-gray-600 dark:text-gray-400 font-light text-sm md:text-lg">
            {content.description}
         </p>
      </div>
    </div>
  );
};

const Tourism: React.FC = () => (
    <section id="turismo" className="py-12 md:py-32 px-4 bg-brand-50 dark:bg-dark-900 overflow-hidden">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 md:mb-32">
                 <span className="text-brand-700 dark:text-brand-400 uppercase tracking-[0.3em] text-[10px] font-bold">Exploração</span>
                 <h2 className="text-4xl md:text-8xl font-serif text-dark-950 dark:text-white mt-4">Foz do Iguaçu</h2>
            </div>
            {ATTRACTIONS.map((attraction, index) => (
                <AttractionItem key={attraction.id} attraction={attraction} index={index} />
            ))}
        </div>
    </section>
);

export default Tourism;
