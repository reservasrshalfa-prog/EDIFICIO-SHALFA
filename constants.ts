
// constants.ts

import { Room, RoomType, HeroSlide, Attraction, ShoppingSpot, ShoppingTip } from './types.ts';

// Helper para converter links do Google Drive em links diretos de imagem
export const resolveGoogleDriveImage = (url: string) => {
  if (!url) return '';
  // Verifica se é um link de visualização ou compartilhamento do Google Drive
  if (url.includes('drive.google.com')) {
    const idMatch = url.match(/\/file\/d\/([^/?]+)/) || url.match(/id=([^&]+)/);
    if (idMatch && idMatch[1]) {
      // Retorna o link direto de alta performance via lh3
      return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
    }
  }
  return url;
};

// Otimizada para WebP, qualidade 60, largura 800px (Placeholder leve)
export const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=60&w=800&fm=webp&fit=crop";

export const HOTEL_INFO = {
  name: "Residencial Shalfa",
  address: "R. Cassiano Ricardo, 675 - Vila Portes, Foz do Iguaçu - PR, 85865-050",
  phone: "+55 45 99135-8262",
  email: "reservasrshalfa@gmail.com",
  coordinates: {
    lat: -25.511361, 
    lng: -54.592083,
  },
};

export const HOTEL_RULES = {
  checkIn: "15:00 às 05:00",
  checkOut: "Até às 11:00",
  receptionInfo: "Check-in presencial na recepção"
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image:  'https://www.destino.foz.br/wp-content/uploads/2024/03/por-do-sol-nas-cataratas8.jpg', 
    alt: 'Cataratas do Iguaçu',
    title: 'Maravilha Natural',
    subtitle: 'Sinta a energia inigualável das águas',
    translations: {
        en: {
            name: '',
            title: 'Natural Wonder',
            subtitle: 'Feel the unmatched energy of the waters'
        },
        es: {
            name: '',
            title: 'Maravilla Natural',
            subtitle: 'Sienta la energía inigualable de las aguas'
        }
    }
  },
  {
    id: 2,
    image: 'https://drive.google.com/file/d/1xZG-Yp1PgQlsJikEnnMJn9sXgtjyvxdL/view?usp=sharing', 
    alt: 'Residencial Shalfa',
    title: 'Residencial Shalfa',
    subtitle: 'Seu refúgio de conforto na Vila Portes',
    translations: {
        en: {
            name: '',
            title: 'Residencial Shalfa',
            subtitle: 'Your comfort refuge in Vila Portes'
        },
        es: {
            name: '',
            title: 'Residencial Shalfa',
            subtitle: 'Su refugio de confort en Vila Portes'
        }
    }
  },
  {
    id: 3,
    image: 'https://statics.forbes.com.py/2025/02/67bab38de29d7.jpg', 
    alt: 'Compras no Paraguai',
    title: 'Compras no Paraguai',
    subtitle: 'As melhores marcas a um passo de você',
    translations: {
        en: {
            name: '',
            title: 'Shopping in Paraguay',
            subtitle: 'The best brands just a step away'
        },
        es: {
            name: '',
            title: 'Compras en Paraguay',
            subtitle: 'Las mejores marcas a un paso de usted'
        }
    }
  }
];

export const ROOMS: Room[] = [
  {
    id: 'casal-std',
    name: 'Suíte Casal Standard',
    type: RoomType.STANDARD,
    description: 'Ideal para casais, esta suíte oferece cozinha completa para que você possa preparar suas refeições com conforto.',
    price: 180,
    capacity: 2,
    imageUrl: 'https://i.im.ge/2025/11/28/49DzIx.402-1.webp',
    images: ['https://i.im.ge/2025/11/28/49DzIx.402-1.webp'],
    amenities: ['Wi-Fi Grátis', 'Ar Condicionado', 'Cozinha Completa', 'Frigobar', 'TV Smart'],
    translations: {
        en: { name: 'Standard Couple Suite', description: 'Ideal for couples, featuring a full kitchen.', amenities: ['Free Wi-Fi', 'Air Conditioning', 'Full Kitchen'] },
        es: { name: 'Suite Matrimonial', description: 'Ideal para parejas, con cocina completa.', amenities: ['Wi-Fi Gratis', 'Aire Acondicionado', 'Cocina Completa'] }
    }
  },
  {
    id: 'triplo-comfort',
    name: 'Suíte Comfort Tripla',
    type: RoomType.COMFORT,
    description: 'Versatilidade para pequenas famílias. 1 cama de casal e 1 de solteiro. Sem cozinha.',
    price: 220,
    capacity: 3,
    imageUrl: 'https://i.im.ge/2025/11/28/49IhkW.409-1.webp',
    images: ['https://i.im.ge/2025/11/28/49IhkW.409-1.webp'],
    amenities: ['Wi-Fi Grátis', 'Ar Condicionado', 'Frigobar'],
    translations: {
        en: { name: 'Comfort Triple Suite', description: 'Versatility for small families.', amenities: ['Free Wi-Fi', 'Air Conditioning'] },
        es: { name: 'Suite Confort Triple', description: 'Versatilidad para familias pequeñas.', amenities: ['Wi-Fi Gratis', 'Aire Acondicionado'] }
    }
  },
  {
    id: 'apartamento-imperial',
    name: 'Apartamento Imperial',
    type: RoomType.APARTMENT,
    description: 'Exclusividade total em 200m². 4 quartos, sala ampla e cozinha completa.',
    price: 750,
    capacity: 7,
    imageUrl: 'https://i.im.ge/2025/12/03/4xMQDa.204-1.jpeg',
    images: ['https://i.im.ge/2025/12/03/4xMQDa.204-1.jpeg'],
    amenities: ['Wi-Fi Grátis', 'Ar Condicionado', '4 Quartos', 'Cozinha Completa', 'Sala de Estar'],
    translations: {
        en: { name: 'Imperial Apartment', description: 'Total exclusivity in 200m².', amenities: ['Free Wi-Fi', '4 Bedrooms'] },
        es: { name: 'Apartamento Imperial', description: 'Exclusividad total en 200m².', amenities: ['Wi-Fi Gratis', '4 Habitaciones'] }
    }
  }
];

export const ATTRACTIONS: Attraction[] = [
  {
    id: 1,
    name: "Cataratas do Iguaçu",
    distance: "20 km",
    image: "https://www.destino.foz.br/wp-content/uploads/2024/03/por-do-sol-nas-cataratas8.jpg",
    description: "Uma das 7 Maravilhas da Natureza.",
    translations: {
        en: { name: 'Iguazu Falls', description: 'One of the 7 Wonders of Nature.' },
        es: { name: 'Cataratas del Iguazú', description: 'Una de las 7 Maravillas de la Naturaleza.' }
    }
  }
];

export const SHOPPING_SPOTS: ShoppingSpot[] = [
  {
    id: 1,
    name: "Monalisa",
    description: "Ícone de luxo no Paraguai.",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/f8/c5/7f/tienda-monalisa.jpg?w=1200&h=-1&s=1",
    tags: ["Luxo", "Vinhos"],
    url: "https://www.monalisa.com.py/",
    translations: {
        en: { name: 'Monalisa', description: 'Luxury icon in Paraguay.' },
        es: { name: 'Monalisa', description: 'Icono del lujo en Paraguay.' }
    }
  }
];

export const SHOPPING_TIPS: ShoppingTip[] = [
  {
    title: "Cota de Isenção",
    text: "US$ 500,00 por pessoa via terrestre.",
    icon: "CreditCard",
    translations: {
        // Fix: Added missing name property to comply with LocalizedContent interface requirements
        en: { name: '', title: 'Exemption Quota', text: 'US$ 500.00 per person via land.' },
        // Fix: Added missing name property to comply with LocalizedContent interface requirements
        es: { name: '', title: 'Cuota de Exención', text: 'US$ 500.00 por persona vía terrestre.' }
    }
  }
];
