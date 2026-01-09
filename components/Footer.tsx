
import React from 'react';
import { MapPin, Phone, Instagram } from 'lucide-react';
import { HOTEL_INFO } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-dark-950 text-gray-400 pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <div>
                <span className="text-white font-serif text-xl tracking-widest">SHALFA</span>
                <p className="text-xs text-brand-400 uppercase tracking-[0.3em] mt-1">{t('footer.brand_sub')}</p>
            </div>
            <p className="font-light text-sm leading-relaxed max-w-xs">
              {t('footer.desc')}
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-6">
             <h4 className="text-white text-sm font-bold uppercase tracking-widest">{t('footer.contact')}</h4>
             <ul className="space-y-4 font-light text-sm">
                <li className="flex items-start gap-3">
                    <MapPin className="text-brand-500 w-5 h-5" />
                    <span>{HOTEL_INFO.address}</span>
                </li>
                <li className="flex items-center gap-3">
                    <Phone className="text-brand-500 w-5 h-5" />
                    <span>{HOTEL_INFO.phone}</span>
                </li>
             </ul>
          </div>

          {/* Social */}
          <div className="space-y-6">
            <h4 className="text-white text-sm font-bold uppercase tracking-widest">{t('footer.social')}</h4>
            <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/residencialshalfa/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 border border-white/10 rounded-full hover:bg-brand-600 hover:border-brand-600 hover:text-white transition-all"
                >
                    <Instagram size={20} />
                </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center">
            <p className="text-xs font-light tracking-wide text-gray-600">
                &copy; {new Date().getFullYear()} Residencial Shalfa. {t('footer.rights')}
            </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
