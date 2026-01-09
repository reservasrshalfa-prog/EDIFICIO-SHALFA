




import React, { useState, useEffect } from 'react';
import { ROOMS, FALLBACK_IMAGE, resolveGoogleDriveImage } from '../constants';
import { Room } from '../types';
import { ChevronLeft, ChevronRight, X, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const RoomCard: React.FC<{
  room: Room;
  onSelect: (id: string) => void;
}> = ({ room, onSelect }) => {
  const { language, t } = useLanguage();
  
  // Translation Logic
  const translated = (room.translations && language !== 'pt') 
    ? room.translations[language as 'en'|'es'] 
    : { name: room.name, description: room.description };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      e.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <motion.div 
      variants={item} 
      onClick={() => onSelect(room.id)}
      className="group cursor-pointer bg-white dark:bg-dark-900 border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full rounded-sm overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={resolveGoogleDriveImage(room.imageUrl)}
          onError={handleImageError}
          alt={translated.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-opacity duration-500" />
        
        {/* Simple Type Badge */}
        <div className="absolute top-0 left-0 bg-white dark:bg-dark-950 px-4 py-2">
             <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-dark-950 dark:text-white">
                {room.type}
             </span>
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
           <h3 className="text-2xl font-serif text-dark-950 dark:text-white leading-tight group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
             {translated.name}
           </h3>
        </div>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 font-light leading-relaxed line-clamp-2 mb-6">
            {translated.description}
        </p>

        {/* Icons / Amenities Preview */}
        <div className="flex items-center gap-3 mb-8">
             <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 font-medium">
                <span className="w-1.5 h-1.5 bg-brand-500 rounded-full"></span>
                {room.capacity} {t('rooms.capacity')}
             </div>
             {room.amenities.some(a => a.toLowerCase().includes('cozinha')) && (
                <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 font-medium">
                    <span className="w-1.5 h-1.5 bg-brand-500 rounded-full"></span>
                    {t('rooms.kitchen')}
                </div>
             )}
        </div>
        
        <div className="mt-auto flex items-end justify-between border-t border-gray-100 dark:border-white/10 pt-6">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{t('rooms.from')}</p>
              <div className="flex items-baseline gap-1">
                 <span className="text-sm text-gray-500 font-serif">R$</span>
                 <span className="text-2xl font-serif text-dark-950 dark:text-white">{room.price}</span>
              </div>
            </div>
            
            <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-700 dark:text-brand-400 group-hover:gap-4 transition-all">
              {t('rooms.details')} <ArrowRight size={14} />
            </button>
        </div>
      </div>
    </motion.div>
  );
};

interface RoomListProps {
  onSelectRoom?: (room: Room) => void;
}

const RoomList: React.FC<RoomListProps> = ({ onSelectRoom }) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { language, t } = useLanguage();

  const selectedRoom = ROOMS.find(r => r.id === selectedRoomId) || null;
  
  // Helper to get translated data for the selected room
  const getTranslatedRoom = () => {
    if(!selectedRoom) return null;
    const trans = (selectedRoom.translations && language !== 'pt') 
        ? selectedRoom.translations[language as 'en'|'es'] 
        : { name: selectedRoom.name, description: selectedRoom.description, amenities: selectedRoom.amenities };
    return { ...selectedRoom, ...trans };
  };

  const localizedRoom = getTranslatedRoom();

  useEffect(() => {
    if (selectedRoomId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedRoomId]);

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedRoom) return;
    setCurrentImageIndex((prev) => (prev === selectedRoom.images.length - 1 ? 0 : prev + 1));
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedRoom) return;
    setCurrentImageIndex((prev) => (prev === 0 ? selectedRoom.images.length - 1 : prev - 1));
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      e.currentTarget.src = FALLBACK_IMAGE;
  };

  const handleOpenModal = (id: string) => {
    setSelectedRoomId(id);
    setCurrentImageIndex(0);
  };

  return (
    <>
        <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {ROOMS.map(room => (
            <RoomCard 
              key={room.id} 
              room={room} 
              onSelect={handleOpenModal} 
            />
          ))}
        </motion.div>

        {/* MODAL STRUCTURE */}
        <AnimatePresence>
        {localizedRoom && selectedRoom && (
          <div className="fixed inset-0 z-[9999] overflow-hidden flex items-center justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/95 dark:bg-black/95 backdrop-blur-sm"
              onClick={() => setSelectedRoomId(null)}
            />
            
            <div className="absolute inset-0 overflow-y-auto overscroll-contain md:flex md:items-center md:justify-center p-0 md:p-6 no-scrollbar">
                
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    onClick={(e) => e.stopPropagation()} 
                    className="relative w-full min-h-full md:min-h-0 md:h-[85vh] max-w-6xl bg-white dark:bg-dark-900 shadow-2xl flex flex-col md:flex-row overflow-visible md:overflow-hidden md:rounded-lg"
                >
                   
                   {/* CLOSE BUTTON */}
                   <button 
                        onClick={() => setSelectedRoomId(null)} 
                        className="fixed top-4 right-4 z-[10000] md:absolute md:top-4 md:right-4 bg-white/90 dark:bg-black/50 text-dark-950 dark:text-white p-3 rounded-full hover:rotate-90 transition-all shadow-lg border border-black/5"
                    >
                        <X size={20} />
                   </button>

                   <div className="md:hidden absolute top-0 left-0 w-full z-20 p-4 pointer-events-none bg-gradient-to-b from-black/60 to-transparent">
                        <span className="text-white text-xs font-bold uppercase tracking-widest drop-shadow-md">{selectedRoom.type}</span>
                   </div>

                   {/* GALLERY */}
                   <div className="w-full md:w-[60%] h-[45vh] md:h-full relative bg-gray-100 dark:bg-black group flex-shrink-0">
                     <AnimatePresence mode='wait'>
                        <motion.img 
                            key={currentImageIndex}
                            src={resolveGoogleDriveImage(selectedRoom.images[currentImageIndex] || selectedRoom.imageUrl)} 
                            onError={handleImageError}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className="w-full h-full object-cover" 
                            alt={localizedRoom.name}
                            decoding="async"
                        />
                     </AnimatePresence>
                     
                     <div className="absolute inset-0 flex items-center justify-between px-4">
                        <button onClick={handlePrevImage} className="p-2 md:p-3 bg-black/20 md:bg-white/10 hover:bg-black/40 md:hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all">
                            <ChevronLeft size={24} />
                        </button>
                        <button onClick={handleNextImage} className="p-2 md:p-3 bg-black/20 md:bg-white/10 hover:bg-black/40 md:hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all">
                            <ChevronRight size={24} />
                        </button>
                     </div>

                     <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {selectedRoom.images.map((_, idx) => (
                            <div 
                                key={idx} 
                                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                                className={`h-1.5 rounded-full transition-all cursor-pointer shadow-sm ${idx === currentImageIndex ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'}`}
                            />
                        ))}
                     </div>
                   </div>
                   
                   {/* DETAILS */}
                   <div className="w-full md:w-[40%] flex flex-col bg-white dark:bg-dark-900 md:overflow-y-auto">
                      
                      <div className="flex-1 p-6 md:p-10 pb-32 md:pb-10">
                          <span className="hidden md:block text-brand-600 dark:text-brand-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
                            Coleção {selectedRoom.type}
                          </span>
                          
                          <h4 className="text-3xl md:text-4xl font-serif text-dark-950 dark:text-white mb-4 md:mb-6 leading-tight">
                            {localizedRoom.name}
                          </h4>
                          
                          <p className="text-gray-600 dark:text-gray-300 font-light text-sm leading-7 mb-8 text-justify">
                            {localizedRoom.description}
                          </p>
                          
                          <div>
                              <h5 className="font-bold text-[10px] text-dark-950 dark:text-white uppercase tracking-widest border-b border-gray-100 dark:border-white/10 pb-3 mb-4">
                                {t('rooms.amenities_title')}
                              </h5>
                              <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
                                  {localizedRoom.amenities?.map(a => (
                                      <li key={a} className="text-xs text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                          <Check size={12} className="text-brand-500 flex-shrink-0" />
                                          <span>{a}</span>
                                      </li>
                                  ))}
                              </ul>
                          </div>
                      </div>

                      {/* Footer */}
                      <div className="p-6 md:p-8 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-black/20 mt-auto">
                          <div className="flex justify-between items-center mb-6">
                             <span className="text-xs text-gray-500 uppercase tracking-widest">{t('rooms.daily_rate')}</span>
                             <span className="text-3xl font-serif text-dark-950 dark:text-white">R$ {selectedRoom.price}</span>
                          </div>
                          
                          <button 
                            onClick={() => { 
                                onSelectRoom?.(selectedRoom); 
                                setSelectedRoomId(null); 
                            }} 
                            className="w-full bg-dark-950 dark:bg-white text-white dark:text-dark-950 py-4 uppercase tracking-[0.2em] text-[11px] font-bold hover:bg-brand-600 dark:hover:bg-brand-400 transition-colors rounded-sm"
                          >
                             {t('rooms.select')}
                          </button>
                      </div>
                   </div>

                </motion.div>
            </div>
          </div>
        )}
        </AnimatePresence>
    </>
  );
};

export default RoomList;
