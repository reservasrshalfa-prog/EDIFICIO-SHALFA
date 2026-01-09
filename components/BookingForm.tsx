

import React, { useState, useEffect, useMemo } from "react";
import { ROOMS, resolveGoogleDriveImage } from "../constants";
import { Room } from "../types";
import { 
  ArrowRight, User, Users, Calendar, Phone, 
  CreditCard, CheckCircle2, Utensils, Coffee,
  ChefHat, Ban, Sparkles, AlertCircle
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export interface BookingFormData {
  name: string;
  cpf: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  room: Room | null;
}

interface BookingFormProps {
  nextCallback?: (formData: BookingFormData) => void;
  preSelectedRoom?: Room | null;
}

// --- LUXURY COMPONENTS ---

interface LuxuryInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    placeholder?: string;
    error?: string;
    icon?: React.ElementType;
    className?: string;
}

const LuxuryInput: React.FC<LuxuryInputProps> = ({ label, name, value, onChange, type = "text", placeholder, error, icon: Icon, className = "" }) => (
    <div className={`group relative mb-6 ${className}`}>
        <div className={`flex items-center border-b-2 transition-colors duration-300 py-2
            ${error 
                ? 'border-red-400' 
                : 'border-gray-300 dark:border-white/10 focus-within:border-brand-500 dark:focus-within:border-brand-400'
            }`}
        >
            {Icon && <Icon size={18} className="text-gray-500 dark:text-gray-400 group-focus-within:text-brand-600 dark:group-focus-within:text-brand-400 transition-colors mr-3" />}
            <div className="flex-1">
                <label className={`block text-[10px] uppercase font-bold tracking-widest mb-1 transition-colors
                    ${error ? 'text-red-400' : 'text-gray-500 dark:text-gray-400 group-focus-within:text-brand-700 dark:group-focus-within:text-brand-400'}`}>
                    {label}
                </label>
                <input 
                    type={type} 
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full bg-transparent text-dark-950 dark:text-white outline-none font-serif text-lg placeholder-gray-400 dark:placeholder-gray-600"
                />
            </div>
        </div>
        {error && <span className="absolute -bottom-5 left-0 text-red-400 text-[10px] font-medium animate-fade-in">{error}</span>}
    </div>
);

const GuestSelector = ({ value, onChange, label }: { value: number, onChange: (n: number) => void, label: string }) => {
    return (
        <div className="mb-8">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                <User size={12} /> {label}
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {[1, 2, 3, 4, 5, 6].map(num => {
                    const isSelected = value === num;
                    return (
                        <button
                            key={num}
                            onClick={() => onChange(num)}
                            className={`relative h-14 rounded-lg border flex flex-col items-center justify-center transition-all duration-300 group overflow-hidden
                                ${isSelected 
                                    ? 'bg-brand-600 border-brand-600 text-white shadow-lg shadow-brand-500/20' 
                                    : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-brand-300 dark:hover:border-white/30'}
                            `}
                        >
                            <div className="flex -space-x-1 mb-1">
                                {num === 1 ? <User size={16} /> : 
                                 num === 2 ? <><User size={14} /><User size={14} /></> :
                                 <><Users size={16} /></>
                                }
                            </div>
                            <span className="text-[10px] font-bold">{num}</span>
                            
                            {isSelected && (
                                <motion.div layoutId="guest-glow" className="absolute inset-0 bg-white/20 blur-md" />
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    );
};

const KitchenSelector = ({ value, onChange, t }: { value: string, onChange: (v: any) => void, t: any }) => {
    const options = [
        { val: 'any', label: t('booking.kitchen_any'), icon: Coffee },
        { val: 'yes', label: t('booking.kitchen_yes'), icon: ChefHat },
        { val: 'no', label: t('booking.kitchen_no'), icon: Ban }
    ];

    return (
        <div className="mb-8">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                <Utensils size={12} /> {t('booking.kitchen_label')}
            </label>
            <div className="grid grid-cols-3 gap-3">
                {options.map(opt => {
                    const isSelected = value === opt.val;
                    return (
                        <button
                            key={opt.val}
                            onClick={() => onChange(opt.val)}
                            className={`relative py-3 px-2 rounded-lg border flex flex-col items-center justify-center transition-all duration-300 gap-2
                                ${isSelected 
                                    ? 'bg-dark-950 dark:bg-white text-white dark:text-dark-950 border-dark-950 dark:border-white' 
                                    : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-gray-400'}
                            `}
                        >
                            <opt.icon size={18} className={isSelected ? 'text-brand-400 dark:text-brand-600' : 'text-gray-400'} />
                            <span className="text-[10px] font-bold uppercase tracking-wide">{opt.label}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    );
};

const RoomSelectionCard: React.FC<{ room: Room, isSelected: boolean, onClick: () => void, language: string }> = ({ room, isSelected, onClick, language }) => {
    const displayName = (room.translations && language !== 'pt') 
        ? room.translations[language as 'en'|'es'].name 
        : room.name;

    return (
        <div 
            onClick={onClick}
            className={`group relative flex items-center gap-4 p-3 rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden
                ${isSelected 
                    ? 'bg-brand-50 dark:bg-brand-900/10 border-brand-500 shadow-md ring-1 ring-brand-500/20' 
                    : 'bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'}
            `}
        >
            {/* Thumbnail */}
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 relative">
                <img src={resolveGoogleDriveImage(room.imageUrl)} alt={displayName} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                {isSelected && (
                    <div className="absolute inset-0 bg-brand-900/20 flex items-center justify-center">
                        <CheckCircle2 size={24} className="text-white drop-shadow-md" />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                    <h4 className={`font-serif text-sm leading-tight mb-1 truncate pr-2 ${isSelected ? 'text-brand-800 dark:text-brand-400 font-bold' : 'text-dark-950 dark:text-white'}`}>
                        {displayName}
                    </h4>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400 mb-2">
                    <span className="flex items-center gap-1"><Users size={10} /> {room.capacity}</span>
                    {room.amenities.some(a => a.toLowerCase().includes('cozinha')) && (
                        <span className="flex items-center gap-1"><ChefHat size={10} /> Cozinha</span>
                    )}
                </div>
                <p className="text-xs font-bold text-dark-950 dark:text-white">
                    R$ {room.price} <span className="text-[9px] font-normal text-gray-400">/ noite</span>
                </p>
            </div>
            
            {isSelected && <div className="absolute right-0 top-0 bottom-0 w-1 bg-brand-500"></div>}
        </div>
    );
};

const BookingForm: React.FC<BookingFormProps> = ({ nextCallback, preSelectedRoom }) => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    cpf: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 2, 
    room: null,
  });

  const [kitchenPref, setKitchenPref] = useState<'any' | 'yes' | 'no'>('any');
  const [nights, setNights] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [errors, setErrors] = useState({ name: "", cpf: "", phone: "", checkIn: "", checkOut: "" });

  useEffect(() => {
    if (preSelectedRoom) {
      setFormData(prev => ({
        ...prev,
        room: preSelectedRoom,
        guests: preSelectedRoom.capacity
      }));
      const hasKitchen = preSelectedRoom.amenities.some(a => a.toLowerCase().includes('cozinha'));
      if (hasKitchen) setKitchenPref('yes');
      else setKitchenPref('any');
    } else {
        // Inicializa com null para forçar seleção
        setFormData(prev => ({ ...prev, room: null }));
    }
  }, [preSelectedRoom]);

  const availableRooms = useMemo(() => {
    return ROOMS.filter(room => {
      // Keep selected room visible even if filters change (optional, but good UX)
      if (formData.room?.id === room.id) return true;

      const capacityOk = room.capacity >= formData.guests;
      const hasKitchen = room.amenities.some(amenity => 
        amenity.toLowerCase().includes('cozinha') || 
        amenity.toLowerCase().includes('micro-ondas')
      );
      
      let kitchenOk = true;
      if (kitchenPref === 'yes') kitchenOk = hasKitchen;
      else if (kitchenPref === 'no') kitchenOk = !hasKitchen;
      
      return capacityOk && kitchenOk;
    });
  }, [formData.guests, kitchenPref, formData.room?.id]);

  useEffect(() => {
    // Logic: If current room becomes invalid due to filters, deselect it.
    if (formData.room) {
        const currentRoomStillValid = availableRooms.some(r => r.id === formData.room!.id);
        if (!currentRoomStillValid) {
            setFormData(prev => ({ ...prev, room: null }));
        }
    }
  }, [availableRooms, formData.room]);

  useEffect(() => {
    if (formData.checkIn && formData.checkOut && formData.room) {
      const start = new Date(formData.checkIn);
      const end = new Date(formData.checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      if (diffDays > 0 && end > start) {
        setNights(diffDays);
        setTotalValue(diffDays * formData.room.price);
      } else {
        setNights(0);
        setTotalValue(0);
      }
    } else if (formData.room) {
        setNights(1);
        setTotalValue(formData.room.price);
    } else {
        setNights(0);
        setTotalValue(0);
    }
  }, [formData.checkIn, formData.checkOut, formData.room]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "guests" ? Number(value) : value,
    });
  };

  const toggleRoom = (room: Room) => {
      if (formData.room?.id === room.id) {
          setFormData({ ...formData, room: null });
      } else {
          setFormData({ ...formData, room: room });
      }
  };

  const validateForm = () => {
    let newErrors = { name: "", cpf: "", phone: "", checkIn: "", checkOut: "" };
    let isValid = true;
    const nameRegex = /^[a-zA-Z\u00C0-\u00FF\s]+$/;
    const phoneRegex = /^[\d\s+\-()]*$/;

    if (!formData.name.trim()) { newErrors.name = "Obrigatório"; isValid = false; }
    else if (!nameRegex.test(formData.name)) { newErrors.name = "Nome inválido"; isValid = false; }

    if (!formData.cpf.trim()) { newErrors.cpf = "Obrigatório"; isValid = false; }

    if (!formData.phone.trim()) { newErrors.phone = "Obrigatório"; isValid = false; }
    else if (!phoneRegex.test(formData.phone)) { newErrors.phone = "Telefone inválido"; isValid = false; }

    if (!formData.checkIn) { newErrors.checkIn = "Obrigatório"; isValid = false; }
    if (!formData.checkOut) { newErrors.checkOut = "Obrigatório"; isValid = false; }
    if (!formData.room) { isValid = false; }

    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (checkInDate < today) { newErrors.checkIn = "Data inválida"; isValid = false; }
      if (checkOutDate <= checkInDate) { newErrors.checkOut = "Data inválida"; isValid = false; }
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    if (!formData.room) return;
    
    if (nextCallback) nextCallback(formData);
    
    // INTEGRATION WITH STAYS.NET
    // Base URL for the Stays booking engine search
    const baseUrl = "https://jomaa.stays.net/search";
    
    // Construct query parameters
    const params = new URLSearchParams({
        checkInDate: formData.checkIn, // Format: YYYY-MM-DD
        checkOutDate: formData.checkOut, // Format: YYYY-MM-DD
        adults: formData.guests.toString()
        // Note: Without specific Stays Listing IDs for each room, we redirect to the search
        // results filtered by date and capacity, allowing the user to pick the room there.
    });

    // Redirect to Stays.net
    window.open(`${baseUrl}?${params.toString()}`, "_blank");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start">
        
        {/* --- LEFT COLUMN: INPUTS --- */}
        <div className="w-full lg:w-2/3">
            
            {/* 1. CONFIGURAÇÃO DA ESTADIA */}
            <div className="mb-12">
                 <h3 className="flex items-center gap-3 font-serif text-2xl text-dark-950 dark:text-white mb-8">
                    <span className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 flex items-center justify-center text-sm font-bold border border-brand-200">1</span>
                    {t('booking.accommodation')}
                 </h3>
                 
                 <div className="bg-gray-50 dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                     <GuestSelector 
                        value={formData.guests} 
                        onChange={(n) => setFormData({...formData, guests: n})} 
                        label={t('booking.guests_label')} 
                     />
                     
                     <KitchenSelector 
                        value={kitchenPref} 
                        onChange={setKitchenPref} 
                        t={t} 
                     />

                     {/* Room List Visual */}
                     <div className="mt-8">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                            <Sparkles size={12} /> {t('booking.choose_suite')}
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {availableRooms.length > 0 ? (
                                availableRooms.map((room) => (
                                    <RoomSelectionCard 
                                        key={room.id}
                                        room={room}
                                        isSelected={formData.room?.id === room.id}
                                        onClick={() => toggleRoom(room)}
                                        language={language}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full py-8 text-center border-2 border-dashed border-gray-200 dark:border-white/10 rounded-xl">
                                    <p className="text-gray-500 text-sm">{t('booking.no_rooms')}</p>
                                </div>
                            )}
                        </div>
                     </div>
                 </div>
            </div>

            {/* 2. DADOS DO HÓSPEDE */}
            <div>
                 <h3 className="flex items-center gap-3 font-serif text-2xl text-dark-950 dark:text-white mb-8">
                    <span className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 flex items-center justify-center text-sm font-bold border border-brand-200">2</span>
                    {t('booking.your_data')}
                 </h3>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                     <LuxuryInput 
                        label={t('booking.name_label')} 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder={t('booking.name_placeholder')} 
                        error={errors.name}
                        icon={User}
                        className="md:col-span-2"
                     />
                     <LuxuryInput 
                        label={t('booking.cpf_label')} 
                        name="cpf" 
                        value={formData.cpf} 
                        onChange={handleChange} 
                        placeholder={t('booking.cpf_placeholder')} 
                        error={errors.cpf}
                        icon={CreditCard}
                     />
                     <LuxuryInput 
                        label={t('booking.phone_label')} 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        placeholder="(XX) 99999-9999" 
                        error={errors.phone}
                        icon={Phone}
                     />
                     <LuxuryInput 
                        label={t('booking.checkin')} 
                        name="checkIn" 
                        value={formData.checkIn} 
                        onChange={handleChange} 
                        type="date" 
                        error={errors.checkIn}
                        icon={Calendar}
                     />
                     <LuxuryInput 
                        label={t('booking.checkout')} 
                        name="checkOut" 
                        value={formData.checkOut} 
                        onChange={handleChange} 
                        type="date" 
                        error={errors.checkOut}
                        icon={Calendar}
                     />
                 </div>
            </div>
        </div>

        {/* --- RIGHT COLUMN: SUMMARY VOUCHER --- */}
        <div className="w-full lg:w-1/3 relative">
            <div className="sticky top-32">
                {formData.room ? (
                    <div className="bg-white dark:bg-dark-900 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 dark:ring-white/10 animate-fade-in">
                        
                        {/* Header Image */}
                        <div className="relative h-56 w-full">
                            <img 
                                src={resolveGoogleDriveImage(formData.room.imageUrl)} 
                                className="w-full h-full object-cover" 
                                alt={formData.room.name}
                                decoding="async"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent opacity-90"></div>
                            
                            <div className="absolute bottom-6 left-6 right-6 text-white">
                                <span className="inline-block px-2 py-1 bg-brand-600 rounded text-[9px] font-bold uppercase tracking-widest mb-2">Reserva</span>
                                <h3 className="font-serif text-2xl leading-none">
                                    {(formData.room.translations && language !== 'pt') ? formData.room.translations[language as 'en'|'es'].name : formData.room.name}
                                </h3>
                            </div>
                        </div>

                        {/* Ticket Body */}
                        <div className="p-8 relative bg-brand-50/50 dark:bg-white/5">
                            {/* Cutout circles for ticket effect */}
                            <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-gray-50 dark:bg-black"></div>
                            <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-gray-50 dark:bg-black"></div>

                            <div className="space-y-6">
                                {/* Dates */}
                                <div className="flex items-center justify-between">
                                    <div className="text-center">
                                        <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Check-in</span>
                                        <p className="text-lg font-serif text-dark-950 dark:text-white">
                                            {formData.checkIn ? new Date(formData.checkIn).toLocaleDateString(undefined, {day: '2-digit', month: 'short'}) : '--'}
                                        </p>
                                    </div>
                                    <div className="h-[1px] flex-1 bg-gray-300 dark:bg-white/20 mx-4 relative">
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-300 dark:bg-white/20"></div>
                                    </div>
                                    <div className="text-center">
                                        <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Check-out</span>
                                        <p className="text-lg font-serif text-dark-950 dark:text-white">
                                            {formData.checkOut ? new Date(formData.checkOut).toLocaleDateString(undefined, {day: '2-digit', month: 'short'}) : '--'}
                                        </p>
                                    </div>
                                </div>

                                {/* Details List */}
                                <div className="space-y-3 py-6 border-t border-b border-dashed border-gray-300 dark:border-white/10">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">{t('booking.duration')}</span>
                                        <span className="font-medium text-dark-950 dark:text-white">{nights} {nights === 1 ? t('booking.night') : t('booking.nights')}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">{t('booking.guests_label')}</span>
                                        <span className="font-medium text-dark-950 dark:text-white">{formData.guests}</span>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="flex justify-between items-end">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('booking.total')}</span>
                                    <span className="text-4xl font-serif text-brand-600 dark:text-brand-400">R$ {totalValue}</span>
                                </div>

                                {/* CTA */}
                                <button 
                                    onClick={handleSubmit}
                                    className="group w-full bg-dark-950 dark:bg-white text-white dark:text-dark-950 py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-xs transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-3"
                                >
                                    {t('booking.confirm')} <ArrowRight size={16} />
                                </button>
                                
                                <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                                    {t('booking.whatsapp_note')}
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-dark-900 rounded-3xl p-10 text-center border border-gray-200 dark:border-white/5 shadow-xl flex flex-col items-center justify-center h-96">
                        <div className="w-16 h-16 rounded-full bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center mb-6">
                            <Sparkles className="text-brand-500" size={24} />
                        </div>
                        <h3 className="font-serif text-xl text-dark-950 dark:text-white mb-2">{t('booking.choose_suite')}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-[200px]">
                            Selecione uma suíte ao lado para visualizar o resumo da sua reserva e valores.
                        </p>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default BookingForm;
