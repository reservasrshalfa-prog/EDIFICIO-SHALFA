
import React, { useRef, useState } from 'react';
import RoomList from './RoomList';
import BookingForm, { BookingFormData } from './BookingForm';
import { motion } from 'framer-motion';
import { Room } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const BookingPage: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [preSelectedRoom, setPreSelectedRoom] = useState<Room | null>(null);
  const { t } = useLanguage();

  const handleSelectRoom = (room: Room) => {
    setPreSelectedRoom(room);
    if (formRef.current) {
      setTimeout(() => {
          formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleBookingSubmit = (data: BookingFormData) => {
    console.log("Reserva iniciada:", data);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950 pt-24 md:pt-32 pb-16 md:pb-24 transition-colors duration-700">
       
       {/* Simple Elegant Header */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-20 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <span className="text-brand-600 dark:text-brand-400 uppercase tracking-[0.3em] text-[10px] font-bold block mb-4">
                    {t('booking_page.brand')}
                </span>
                
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-dark-950 dark:text-white mb-6 tracking-tight">
                    {t('booking_page.title')}
                </h1>
                
                <div className="w-16 h-[1px] bg-brand-500 mx-auto mb-6"></div>

                <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-light text-base md:text-lg leading-relaxed">
                    {t('booking_page.subtitle')}
                </p>
            </motion.div>
       </div>

       {/* Room List */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 md:mb-32">
            <RoomList onSelectRoom={handleSelectRoom} />
       </div>

       {/* Booking Form Section */}
       <div ref={formRef} id="form-reserva" className="bg-gray-50 dark:bg-black py-16 md:py-24">
           <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 md:mb-12">
                    <h2 className="text-2xl md:text-3xl font-serif text-dark-950 dark:text-white">{t('booking_page.form_title')}</h2>
                    <p className="text-gray-500 text-sm mt-2">{t('booking_page.form_subtitle')}</p>
                </div>
                
                <BookingForm 
                    nextCallback={handleBookingSubmit} 
                    preSelectedRoom={preSelectedRoom}
                />
           </div>
       </div>
    </div>
  );
};

export default BookingPage;
