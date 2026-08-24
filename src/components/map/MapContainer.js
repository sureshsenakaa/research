'use client';

import { MapContainer as LeafletMap, TileLayer, ZoomControl } from 'react-leaflet';
import { useEffect } from 'react';

export default function MapContainer({ children, mapRef, center = [7.4818, 80.3609], zoom = 14, ...props }) {
  useEffect(() => {
    // Fix leaflet default icon — must run client-side only
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });
    }
  }, []);

  return (
    <LeafletMap
      center={center}
      zoom={zoom}
      zoomControl={false}
      className="absolute inset-0 w-full h-full z-0"
      ref={mapRef}
      {...props}
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution='Tiles &copy; Esri'
      />
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
      />
      <ZoomControl position="bottomright" />
      {children}
    </LeafletMap>
  );
}
