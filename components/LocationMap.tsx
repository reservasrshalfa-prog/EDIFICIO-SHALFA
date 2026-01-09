
import React, { useEffect } from 'react';
import { HOTEL_INFO, ATTRACTIONS } from '../constants';

const LocationMap: React.FC = () => {
  useEffect(() => {
    if (!(window as any).L) return;

    const L = (window as any).L;
    // Forçando o mapa a renderizar tiles em P&B ou mais neutros se possível, mas usando o Voyager padrão por enquanto.
    const map = L.map('map').setView([HOTEL_INFO.coordinates.lat, HOTEL_INFO.coordinates.lng], 12);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    const hotelIcon = L.icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png', // Trocado para Gold se existir ou similar
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    const attractionIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    L.marker([HOTEL_INFO.coordinates.lat, HOTEL_INFO.coordinates.lng], { icon: hotelIcon })
      .addTo(map)
      .bindPopup(`
        <div style="text-align: center; font-family: 'Lato', sans-serif;">
            <b style="font-size: 16px; color: #C59D5F;">${HOTEL_INFO.name}</b><br/>
            <small style="color: #555;">${HOTEL_INFO.address}</small>
        </div>
      `)
      .openPopup();

    ATTRACTIONS.forEach((spot) => {
        if(spot.coordinates) {
             const marker = L.marker([spot.coordinates.lat, spot.coordinates.lng], { icon: attractionIcon }).addTo(map);
             marker.bindPopup(`
                <div style="width: 200px; font-family: 'Lato', sans-serif;">
                    <img src="${spot.image}" style="width: 100%; height: 100px; object-fit: cover; border-radius: 4px; margin-bottom: 8px;" />
                    <b style="font-size: 14px; color: #18181b;">${spot.name}</b><br/>
                    <small style="color: #777;">${spot.distance}</small>
                </div>
             `);
        }
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="w-full h-full bg-gray-100 relative z-0">
      <div id="map" className="w-full h-full z-10"></div>
    </div>
  );
};

export default LocationMap;
