

// constants.ts

import { Room, RoomType, HeroSlide, Attraction, ShoppingSpot, ShoppingTip } from './types';

// Helper para converter links do Google Drive em links diretos de imagem
export const resolveGoogleDriveImage = (url: string) => {
  if (!url) return '';
  // Verifica se é um link de visualização do Google Drive
  if (url.includes('drive.google.com') && url.includes('/file/d/')) {
    const idMatch = url.match(/\/file\/d\/([^/]+)/);
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
  // Categoria 1
  {
    id: 'casal-std',
    name: 'Suíte Casal Standard',
    type: RoomType.STANDARD,
    description:
      'Intimidade e total autonomia. Ideal para casais, esta suíte oferece cozinha completa (fogão, forno, micro-ondas, panelas e louças) para que você possa preparar suas refeições com conforto.',
    price: 180,
    capacity: 2,
    imageUrl: 'https://i.im.ge/2025/11/28/49DzIx.402-1.webp',
    images: [
        'https://i.im.ge/2025/11/28/49DzIx.402-1.webp',
        'https://i.im.ge/2025/11/28/49DkMG.402-2.webp',
        'https://i.im.ge/2025/11/28/49DHxa.402-3.webp'
    ],
    amenities: ['Wi-Fi Grátis', 'Ar Condicionado', '1 Cama Casal', 'Cozinha Completa', 'Fogão e Forno', 'Micro-ondas', 'Utensílios/Louças', 'Frigobar', 'TV Smart'],
    translations: {
        en: {
            name: 'Standard Couple Suite',
            description: 'Intimacy and full autonomy. Ideal for couples, featuring a full kitchen (stove, oven, microwave, cookware, and dishes) to prepare meals comfortably.',
            amenities: ['Free Wi-Fi', 'Air Conditioning', '1 Double Bed', 'Full Kitchen', 'Stove & Oven', 'Microwave', 'Kitchenware', 'Minibar', 'Smart TV']
        },
        es: {
            name: 'Suite Matrimonial Estándar',
            description: 'Intimidad y total autonomía. Ideal para parejas, ofrece cocina completa (cocina, horno, microondas, ollas y vajilla) para preparar sus comidas.',
            amenities: ['Wi-Fi Gratis', 'Aire Acondicionado', '1 Cama Matrimonial', 'Cocina Completa', 'Cocina y Horno', 'Microondas', 'Utensilios/Vajilla', 'Minibar', 'Smart TV']
        }
    }
  },
  
  // Categoria 2
  {
    id: 'triplo-comfort',
    name: 'Suíte Comfort Tripla',
    type: RoomType.COMFORT,
    description:
      'Versatilidade para pequenas famílias. Configuração inteligente com 1 cama de casal e 1 de solteiro, garantindo descanso após um dia de passeios. Sem cozinha.',
    price: 220,
    capacity: 3,
    imageUrl: 'https://i.im.ge/2025/11/28/49IhkW.409-1.webp',
    images: [
        'https://i.im.ge/2025/11/28/49IhkW.409-1.webp',
        "https://i.im.ge/2025/11/28/49I0F0.409-2.webp",
        "https://i.im.ge/2025/11/28/49I5jT.409-3.jpeg"
    ],
    amenities: ['Wi-Fi Grátis', 'Ar Condicionado', '1 Cama Casal', '1 Cama Solteiro', 'Frigobar'],
    translations: {
        en: {
            name: 'Comfort Triple Suite',
            description: 'Versatility for small families. Smart configuration with 1 double bed and 1 single bed. No kitchen.',
            amenities: ['Free Wi-Fi', 'Air Conditioning', '1 Double Bed', '1 Single Bed', 'Minibar']
        },
        es: {
            name: 'Suite Confort Triple',
            description: 'Versatilidad para familias pequeñas. Configuración inteligente con 1 cama matrimonial y 1 individual. Sin cocina.',
            amenities: ['Wi-Fi Gratis', 'Aire Acondicionado', '1 Cama Matrimonial', '1 Cama Individual', 'Minibar']
        }
    }
  },

  // Categoria 3
  {
    id: 'triplo-twin',
    name: 'Suíte Twin Tripla',
    type: RoomType.COMFORT,
    description:
      'Perfeito para grupos de amigos ou colegas de trabalho. Três camas de solteiro individuais oferecem conforto e independência para todos os hóspedes.',
    price: 220,
    capacity: 3,
    imageUrl: 'https://i.im.ge/2025/11/28/49IN4a.414-1.webp',
    images: [
        'https://i.im.ge/2025/11/28/49IN4a.414-1.webp',
        'https://i.im.ge/2025/11/28/49I63x.414-2.webp',
        'https://i.im.ge/2025/11/28/49ItqJ.Captura-de-tela-2025-11-28-095616.png'
    ],
    amenities: ['Wi-Fi Grátis', 'Ar Condicionado', '3 Camas Solteiro', 'Frigobar', 'TV Smart'],
    translations: {
        en: {
            name: 'Twin Triple Suite',
            description: 'Perfect for groups of friends. Three individual single beds offer comfort and independence.',
            amenities: ['Free Wi-Fi', 'Air Conditioning', '3 Single Beds', 'Minibar', 'Smart TV']
        },
        es: {
            name: 'Suite Twin Triple',
            description: 'Perfecto para grupos de amigos. Tres camas individuales ofrecen confort e independencia.',
            amenities: ['Wi-Fi Gratis', 'Aire Acondicionado', '3 Camas Individuales', 'Minibar', 'Smart TV']
        }
    }
  },

  // Categoria 4
  {
    id: 'apto-royal',
    name: 'Apartamento Royal (2 Quartos)',
    type: RoomType.APARTMENT,
    description:
      'Privacidade absoluta. Unidade exclusiva com 2 quartos separados, ambos com cama de casal. A escolha ideal para casais viajando juntos ou famílias que valorizam o espaço individual.',
    price: 350,
    capacity: 4,
    imageUrl: 'https://i.im.ge/2025/11/28/49LoZT.403-1-1.jpeg',
    images: [
        'https://i.im.ge/2025/11/28/49LoZT.403-1-1.jpeg',
        'https://i.im.ge/2025/11/28/49LTm0.403-2.jpeg',
        'https://i.im.ge/2025/11/28/49Lloc.403-3.jpeg'
    ],
    amenities: ['Wi-Fi Grátis', 'Ar Condicionado', '2 Quartos Separados', '2 Camas Casal', 'Frigobar'],
    translations: {
        en: {
            name: 'Royal Apartment (2 Bedrooms)',
            description: 'Absolute privacy. Exclusive unit with 2 separate bedrooms, both with double beds.',
            amenities: ['Free Wi-Fi', 'Air Conditioning', '2 Separate Bedrooms', '2 Double Beds', 'Minibar']
        },
        es: {
            name: 'Apartamento Royal (2 Habitaciones)',
            description: 'Privacidad absoluta. Unidad exclusiva con 2 habitaciones separadas, ambas con cama matrimonial.',
            amenities: ['Wi-Fi Gratis', 'Aire Acondicionado', '2 Habitaciones Separadas', '2 Camas Matrimoniales', 'Minibar']
        }
    }
  },

  // Categoria 5
  {
    id: 'estudio-gourmet',
    name: 'Estúdio  Quádruplo',
    type: RoomType.STUDIO,
    description:
      'Independência e espaço. Acomoda 4 pessoas com cozinha completa equipada com fogão, forno, micro-ondas e utensílios, perfeita para preparar refeições completas.',
    price: 280,
    capacity: 4,
    imageUrl: 'https://i.im.ge/2025/11/28/49L2yJ.415-1.webp',
    images: [
        'https://i.im.ge/2025/11/28/49L2yJ.415-1.webp',
        'https://i.im.ge/2025/11/28/49L1aa.415-2.webp',
        'https://i.im.ge/2025/11/28/49LSHy.415-3.jpeg'
    ],
    amenities: ['Wi-Fi Grátis', 'Ar Condicionado', '4 Camas Solteiro', 'Cozinha Completa', 'Fogão e Forno', 'Micro-ondas', 'Utensílios/Louças', 'Frigobar'],
    translations: {
        en: {
            name: 'Gourmet Quad Studio',
            description: 'Independence and space. Accommodates 4 people featuring a full kitchen with stove, oven, microwave and cookware.',
            amenities: ['Free Wi-Fi', 'Air Conditioning', '4 Single Beds', 'Full Kitchen', 'Stove & Oven', 'Microwave', 'Kitchenware', 'Minibar']
        },
        es: {
            name: 'Estudio Gourmet Cuádruple',
            description: 'Independencia y espacio. Acomoda 4 personas con cocina completa equipada con cocina, horno, microondas y utensilios.',
            amenities: ['Wi-Fi Gratis', 'Aire Acondicionado', '4 Camas Individuales', 'Cocina Completa', 'Cocina y Horno', 'Microondas', 'Utensilios', 'Minibar']
        }
    }
  },

  // Categoria 6
  {
    id: 'familia-premium',
    name: 'Estúdio Família Premium',
    type: RoomType.STUDIO,
    description:
      'Nossa acomodação mais completa. 1 Cama de casal e 2 de solteiro. A cozinha é completa: fogão, forno, micro-ondas, panelas, pratos e talheres à sua disposição.',
    price: 300,
    capacity: 4,
    imageUrl: 'https://i.im.ge/2025/11/28/49Lq1S.416-1.webp',
    images: [
        'https://i.im.ge/2025/11/28/49Lq1S.416-1.webp',
        'https://i.im.ge/2025/11/28/49LaZ6.416-2.jpeg',
        'https://i.im.ge/2025/11/28/49Lsmz.416-3.jpeg'
    ],
    amenities: ['Wi-Fi Grátis', 'Ar Condicionado', '1 Cama Casal', '2 Camas Solteiro', 'Cozinha Completa', 'Fogão e Forno', 'Micro-ondas', 'Utensílios/Louças'],
    translations: {
        en: {
            name: 'Family Premium Studio',
            description: 'Our most complete accommodation. 1 Double and 2 Singles. The kitchen is full: stove, oven, microwave, pans, dishes and cutlery.',
            amenities: ['Free Wi-Fi', 'Air Conditioning', '1 Double Bed', '2 Single Beds', 'Full Kitchen', 'Stove & Oven', 'Microwave', 'Kitchenware']
        },
        es: {
            name: 'Estudio Familia Premium',
            description: 'Nuestra opción más completa. 1 cama matrimonial y 2 individuales. La cocina es completa: cocina, horno, microondas, ollas y vajilla.',
            amenities: ['Wi-Fi Gratis', 'Aire Acondicionado', '1 Cama Matrimonial', '2 Camas Individuales', 'Cocina Completa', 'Cocina y Horno', 'Microondas', 'Utensilios']
        }
    }
  },

  // Categoria 7 (3 Quartos)
  {
    id: 'apartamento-grand-family',
    name: 'Apartamento Grand Family (3 Quartos)',
    type: RoomType.APARTMENT,
    description:
      'Conforto para grandes famílias. São 3 quartos, todos com cama de casal (sendo 1 suíte), além de sala de estar ampla, mesa de jantar, cozinha completa e lavanderia privativa.',
    price: 580,
    capacity: 6,
    imageUrl: 'https://i.im.ge/2025/12/03/4EBDS0.302-1.webp',
    images: [
        'https://i.im.ge/2025/12/03/4EBDS0.302-1.webp',
        'https://i.im.ge/2025/12/03/4EBavW.302-2.webp',
        'https://i.im.ge/2025/12/03/4EBINT.302-3.webp',
        'https://i.im.ge/2025/12/03/4EBsEr.302-4.webp', 
        'https://i.im.ge/2025/12/03/4EBLVc.302-5.webp',
        'https://i.im.ge/2025/12/03/4EBhrL.302-6.jpeg'
    ],
    amenities: ['Wi-Fi Grátis', 'Ar Condicionado', '3 Quartos', '3 Camas Casal', 'Cozinha Completa', 'Lavanderia', '2 Banheiros + Lavabo', 'Sala de Estar', 'Mesa de Jantar'],
    translations: {
        en: {
            name: 'Grand Family Apartment (3 Bedrooms)',
            description: 'Comfort for large families. 3 bedrooms, all with double beds (1 en-suite), plus a spacious living room, dining table, full kitchen, and private laundry.',
            amenities: ['Free Wi-Fi', 'Air Conditioning', '3 Bedrooms', '3 Double Beds', 'Full Kitchen', 'Laundry Room', '2 Bathrooms + Half Bath', 'Living Room', 'Dining Table']
        },
        es: {
            name: 'Apartamento Grand Family (3 Habitaciones)',
            description: 'Confort para grandes familias. 3 habitaciones con cama matrimonial (1 en suite), amplia sala de estar, comedor, cocina completa y lavandería.',
            amenities: ['Wi-Fi Gratis', 'Aire Acondicionado', '3 Habitaciones', '3 Camas Matrimoniales', 'Cocina Completa', 'Lavandería', '2 Baños + Aseo', 'Sala de Estar', 'Mesa de Comedor']
        }
    }
  },

  // Categoria 8 (Imperial - 200m2)
  {
    id: 'apartamento-imperial',
    name: 'Apartamento Imperial',
    type: RoomType.APARTMENT,
    description:
      'Exclusividade total em 200m². Configuração de 4 quartos: 1 Suíte Casal, 1 Suíte Solteiro, 1 Quarto Casal e 1 Quarto com duas camas solteiro. Conta com banheiro social, lavabo, sala de estar, cozinha completa e lavanderia.',
    price: 750,
    capacity: 7,
    imageUrl: 'https://i.im.ge/2025/12/03/4xMQDa.204-1.jpeg',
    images: [
        'https://i.im.ge/2025/12/03/4xMQDa.204-1.jpeg',
        'https://i.im.ge/2025/12/03/4EeJVT.204-2.webp',
        'https://i.im.ge/2025/12/03/4Eezvr.204-3.webp',
        'https://i.im.ge/2025/12/03/4Eep2W.204-4.webp',
        'https://i.im.ge/2025/12/03/4EeB0L.204-5.webp',
        'https://i.im.ge/2025/12/03/4EeGcG.204-6.webp',
        'https://i.im.ge/2025/12/03/4Eev60.204-7.webp'
    ],
    amenities: ['Wi-Fi Grátis', 'Ar Condicionado', '4 Quartos (2 Suítes)', '2 Camas Casal', '3 Camas Solteiro', 'Cozinha Completa', 'Lavanderia', 'Banheiro Social + Lavabo', 'Sala de Estar', 'Mesa de Jantar'],
    translations: {
        en: {
            name: 'Imperial Apartment (200m²)',
            description: 'Total exclusivity in 200m². Features 4 bedrooms: 1 Double Suite, 1 Single Suite, 1 Double Room, and 1 Twin Room. Includes shared bath, half bath, living room, full kitchen, and laundry.',
            amenities: ['Free Wi-Fi', 'Air Conditioning', '4 Bedrooms (2 Suites)', '2 Double Beds', '3 Single Beds', 'Full Kitchen', 'Laundry Room', 'Bath + Half Bath', 'Living Room', 'Dining Table']
        },
        es: {
            name: 'Apartamento Imperial (200m²)',
            description: 'Exclusividad total en 200m². Cuenta con 4 habitaciones: 1 Suite Matrimonial, 1 Suite Individual, 1 Habitación Matrimonial y 1 Twin. Incluye baño social, aseo, sala, cocina completa y lavandería.',
            amenities: ['Wi-Fi Gratis', 'Aire Acondicionado', '4 Habitaciones (2 Suites)', '2 Camas Matrimoniales', '3 Camas Individuales', 'Cocina Completa', 'Lavandería', 'Baño + Aseo', 'Sala de Estar', 'Mesa de Comedor']
        }
    }
  },
];

export const ATTRACTIONS: Attraction[] = [
  {
    id: 1,
    name: "Cataratas do Iguaçu",
    distance: "20 km do Residencial Shalfa",
    image: "https://i0.wp.com/thetravelpub.com/wp-content/uploads/2023/12/paraguay.jpg?fit=1280,879&ssl=1",
    videoUrl: "https://cdn.pixabay.com/video/2025/02/23/260535_large.mp4", 
    story: "A Lenda de Naipi e Tarobá",
    description:
      "Patrimônio Natural da Humanidade pela UNESCO, as Cataratas formam o maior sistema de quedas d'água do mundo. O destaque é a 'Garganta do Diabo', um abismo em forma de U com mais de 80 metros de altura.",
    coordinates: { lat: -25.695272, lng: -54.436666 },
    translations: {
        en: {
            name: 'Iguazu Falls',
            description: 'A UNESCO World Heritage Site, the Falls form the largest waterfall system in the world. The highlight is the "Devil\'s Throat", a U-shaped abyss over 80 meters high.',
            story: 'The Legend of Naipi and Tarobá'
        },
        es: {
            name: 'Cataratas del Iguazú',
            description: 'Patrimonio Natural de la Humanidad por la UNESCO, las Cataratas forman el sistema de caídas de agua más grande del mundo. Lo más destacado es la "Garganta del Diablo", un abismo en forma de U de más de 80 metros de altura.',
            story: 'La Leyenda de Naipi y Tarobá'
        }
    }
  },
  {
    id: 2,
    name: "Parque das Aves",
    distance: "19 km do Residencial Shalfa",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Arara_vermelha_-_Parque_das_aves_-_Foz_do_Iguacu_-_Brasil_%2824195243491%29.jpg",
    videoUrl: "https://cdn.pixabay.com/video/2022/04/04/112873-696348992_large.mp4",
    story: "O Resgate da Mata Atlântica",
    description:
      "Muito mais que um zoológico, é um centro de conservação internacional. Caminhe dentro de viveiros gigantes onde tucanos e araras voam livremente sobre sua cabeça.",
    coordinates: { lat: -25.6166, lng: -54.4827 },
    translations: {
        en: {
            name: 'Bird Park',
            description: 'Much more than a zoo, it is an international conservation center. Walk inside giant aviaries where toucans and macaws fly freely over your head.',
            story: 'Atlantic Forest Rescue'
        },
        es: {
            name: 'Parque de las Aves',
            description: 'Mucho más que un zoológico, es un centro de conservación internacional. Camine dentro de viveros gigantes donde tucanes y guacamayos vuelan libremente sobre su cabeza.',
            story: 'El Rescate de la Mata Atlántica'
        }
    }
  },
  {
    id: 3,
    name: "Usina de Itaipu",
    distance: "9 km do Residencial Shalfa",
    image: "https://turismoitaipu.com.br/wp-content/uploads/2024/08/usina-de-itaipu-foz-do-iguacu-curiosidades-scaled.jpg",
    story: "Concreto e Aço",
    description:
      "Uma obra faraônica que mudou a geografia da América do Sul. A estrutura possui ferro suficiente para construir 380 Torres Eiffel.",
    coordinates: { lat: -25.4131, lng: -54.5883 },
    translations: {
        en: {
            name: 'Itaipu Dam',
            description: 'A pharaonic work that changed the geography of South America. The structure has enough iron to build 380 Eiffel Towers.',
            story: 'Concrete and Steel'
        },
        es: {
            name: 'Represa de Itaipú',
            description: 'Una obra faraónica que cambió la geografía de América del Sur. La estructura tiene suficiente hierro para construir 380 Torres Eiffel.',
            story: 'Concreto y Acero'
        }
    }
  },
  {
    id: 4,
    name: "Marco das 3 Fronteiras",
    distance: "10 km do Residencial Shalfa",
    image: "https://www.hoteldelreyfoz.com.br/wp-content/uploads/2022/04/imgns-blog-TRESFRONTEIRAS1.jpg",
    story: "O Encontro de Nações",
    description:
      "Onde o Rio Iguaçu encontra o Rio Paraná, três países se olham. O local foi revitalizado para honrar as missões jesuíticas com arquitetura colonial.",
    coordinates: { lat: -25.5995, lng: -54.6000 },
    translations: {
        en: {
            name: 'Triple Frontier Landmark',
            description: 'Where the Iguazu River meets the Paraná River, three countries look at each other. The site was revitalized to honor Jesuit missions with colonial architecture.',
            story: 'Meeting of Nations'
        },
        es: {
            name: 'Hito de las 3 Fronteras',
            description: 'Donde el río Iguazú se encuentra con el río Paraná, tres países se miran. El lugar fue revitalizado para honrar las misiones jesuíticas con arquitectura colonial.',
            story: 'El Encuentro de Naciones'
        }
    }
  },
];

export const SHOPPING_SPOTS: ShoppingSpot[] = [
  {
    id: 1,
    name: "Monalisa",
    description: "Um ícone de sofisticação com mais de 50 anos de história. Explore andares dedicados à alta costura, joalheria internacional e uma adega climatizada premiada.",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/f8/c5/7f/tienda-monalisa.jpg?w=1200&h=-1&s=1",
    tags: ["Luxo", "Haute Couture", "Vinhos"],
    url: "https://www.google.com/maps/search/?api=1&query=Monalisa+Ciudad+del+Este",
    translations: {
        en: {
            name: 'Monalisa',
            description: 'A sophisticated icon with over 50 years of history. Explore floors dedicated to haute couture, international jewelry, and an award-winning wine cellar.'
        },
        es: {
            name: 'Monalisa',
            description: 'Un icono de sofisticación con más de 50 años de historia. Explore pisos dedicados a la alta costura, joyería internacional y una bodega galardonada.'
        }
    }
  },
  {
    id: 2,
    name: "Cellshop Importados",
    description: "O epicentro da tecnologia. Desde os últimos lançamentos da Apple até equipamentos de som profissionais, é a referência absoluta em eletrônicos originais.",
    image: "https://www.h2foz.com.br/wp-content/uploads/2022/09/d3ffa164-261-cellshop.jpg", 
    tags: ["Tech", "Apple Auth.", "Bebidas"],
    url: "https://www.google.com/maps/search/?api=1&query=Cellshop+Importados+Ciudad+del+Este",
    translations: {
        en: {
            name: 'Cellshop Importados',
            description: 'The epicenter of technology. From the latest Apple releases to professional sound equipment, it is the absolute reference in original electronics.'
        },
        es: {
            name: 'Cellshop Importados',
            description: 'El epicentro de la tecnología. Desde los últimos lanzamientos de Apple hasta equipos de sonido profesionales, es la referencia absoluta en electrónica original.'
        }
    }
  },
  {
    id: 3,
    name: "Shopping China/Pris",
    description: "Eleita a melhor loja de importados do mundo. Um complexo gigantesco que oferece de chocolates suíços a cosméticos de luxo em um ambiente impecável.",
    image: "https://i.ytimg.com/vi/a3eWj0-f9-o/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGGUgXihPMA8=&rs=AOn4CLBT1rTn9XSMcBrqaeDdhe-F6EKsaA",
    tags: ["Departamento", "Cosméticos", "Gourmet"],
    url: "https://www.google.com/maps/search/?api=1&query=Shopping+China+Importados+Ciudad+del+Este",
    translations: {
        en: {
            name: 'Shopping China/Pris',
            description: 'Voted the best import store in the world. A gigantic complex offering from Swiss chocolates to luxury cosmetics in an impeccable environment.'
        },
        es: {
            name: 'Shopping China/Pris',
            description: 'Elegida la mejor tienda de importados del mundo. Un complejo gigantesco que ofrece desde chocolates suizos hasta cosméticos de lujo en un ambiente impecable.'
        }
    }
  },
  {
    id: 4,
    name: "Nissei",
    description: "Especialistas em imagem e som. Revendedora autorizada das maiores marcas fotográficas, oferecendo garantia e atendimento técnico especializado.",
    image: "https://nissei.com/media/wysiwyg/geral/quienes-somos/quienes-somos-Nissei-CDE-Tienda.jpg",
    tags: ["Fotografia", "Drones", "Gadgets"],
    url: "https://www.google.com/maps/search/?api=1&query=Nissei+Ciudad+del+Este",
    translations: {
        en: {
            name: 'Nissei',
            description: 'Image and sound specialists. Authorized dealer of major camera brands, offering warranty and specialized technical service.'
        },
        es: {
            name: 'Nissei',
            description: 'Especialistas en imagen y sonido. Distribuidor autorizado de las principales marcas de fotografía, ofreciendo garantía y servicio técnico especializado.'
        }
    }
  }
];

export const SHOPPING_TIPS: ShoppingTip[] = [
  {
    title: "Cota de Isenção",
    text: "US$ 500,00 por pessoa via terrestre. Declaração necessária se exceder.",
    icon: "CreditCard",
    translations: {
        en: {
            name: '',
            title: 'Exemption Quota',
            text: 'US$ 500.00 per person via land. Declaration required if exceeded.'
        },
        es: {
            name: '',
            title: 'Cuota de Exención',
            text: 'US$ 500.00 por persona vía terrestre. Declaración necesaria si se excede.'
        }
    }
  },
  {
    title: "Documentação",
    text: "Obrigatório RG (menos de 10 anos) ou Passaporte. CNH não é aceita para entrada.",
    icon: "FileText",
    translations: {
        en: {
            name: '',
            title: 'Documentation',
            text: 'Mandatory ID (less than 10 years) or Passport. Driver\'s license is not accepted for entry.'
        },
        es: {
            name: '',
            title: 'Documentación',
            text: 'Obligatorio RG (menos de 10 años) o Pasaporte. La licencia de conducir no se acepta para el ingreso.'
        }
    }
  },
  {
    title: "Horários",
    text: "A maioria das lojas funciona das 07h às 16h (Horário BR). Evite ir aos domingos.",
    icon: "Clock",
    translations: {
        en: {
            name: '',
            title: 'Opening Hours',
            text: 'Most stores are open from 07:00 to 16:00 (BR Time). Avoid going on Sundays.'
        },
        es: {
            name: '',
            title: 'Horarios',
            text: 'La mayoría de las tiendas abren de 07:00 a 16:00 (Hora BR). Evite ir los domingos.'
        }
    }
  },
  {
    title: "Proximidade",
    text: "O Shalfa está na Vila Portes, a poucos minutos da Ponte da Amistad.",
    icon: "MapPin",
    translations: {
        en: {
            name: '',
            title: 'Proximity',
            text: 'Shalfa is in Vila Portes, just minutes from the Friendship Bridge.'
        },
        es: {
            name: '',
            title: 'Proximidad',
            text: 'Shalfa está en Vila Portes, a pocos minutos del Puente de la Amistad.'
        }
    }
  }
];
