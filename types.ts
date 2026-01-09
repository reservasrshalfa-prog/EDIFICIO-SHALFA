
export type Language = 'pt' | 'en' | 'es';

export enum RoomType {
  STANDARD = 'Standard',
  COMFORT = 'Conforto',
  FAMILY = 'Família',
  APARTMENT = 'Apartamento',
  STUDIO = 'Estúdio Gourmet'
}

export interface LocalizedContent {
    name: string;
    description?: string;
    amenities?: string[];
    title?: string;
    subtitle?: string;
    story?: string;
    text?: string;
}

export interface Translations {
    en: LocalizedContent;
    es: LocalizedContent;
}

export interface HeroSlide {
    id: number;
    image: string;
    alt: string;
    title: string;
    subtitle: string;
    translations?: Translations;
}

export interface Attraction {
    id: number;
    name: string;
    distance: string;
    image: string;
    videoUrl?: string;
    story?: string;
    description: string;
    coordinates?: { lat: number; lng: number };
    translations?: Translations;
}

export interface ShoppingSpot {
    id: number;
    name: string;
    description: string;
    image: string;
    tags: string[];
    url: string;
    translations?: Translations;
}

export interface ShoppingTip {
    title: string;
    text: string;
    icon: string;
    translations?: Translations;
}

export interface Room {
  id: string;
  name: string; // Fallback / PT Name
  type: RoomType;
  description: string; // Fallback / PT Description
  price: number;
  capacity: number;
  imageUrl: string;
  images: string[];
  amenities: string[];
  translations?: Translations;
}

export interface BookingDetails {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: RoomType;
  name: string;
  email: string;
  phone: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
