'use client';

import { Marker, Tooltip, useMapEvents } from 'react-leaflet';
import { useMemo } from 'react';

/**
 * Click handler subcomponent inside Leaflet Map
 */
export function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      if (onMapClick) {
        onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
      }
    },
  });
  return null;
}

/**
 * Custom Pin Marker for selected property
 */
export default function PinMarker({ position, label, onDragEnd, color = '#06b6d4' }) {
  const pinIcon = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const L = require('leaflet');
    return new L.DivIcon({
      html: `
        <div style="position: relative; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; width: 36px; height: 36px; background: ${color}; opacity: 0.35; border-radius: 50%; animation: pulsePin 1.8s infinite;"></div>
          <div style="position: absolute; width: 22px; height: 22px; background: #0a0e27; border: 3px solid ${color}; border-radius: 50%; box-shadow: 0 0 16px ${color}; display: flex; align-items: center; justify-content: center;">
            <div style="width: 8px; height: 8px; background: #ffffff; border-radius: 50%;"></div>
          </div>
          <div style="position: absolute; bottom: 0px; width: 2px; height: 10px; background: ${color}; transform: translateY(10px);"></div>
        </div>
      `,
      className: 'custom-pin-icon',
      iconSize: [36, 46],
      iconAnchor: [18, 46],
      tooltipAnchor: [0, -48],
    });
  }, [color]);

  if (!position) return null;

  return (
    <>
      <style>{`
        @keyframes pulsePin {
          0% { transform: scale(0.6); opacity: 0.6; }
          70% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(0.6); opacity: 0; }
        }
      `}</style>
      <Marker
        position={position}
        icon={pinIcon || undefined}
        draggable={Boolean(onDragEnd)}
        eventHandlers={{
          dragend: (e) => {
            if (onDragEnd) {
              const marker = e.target;
              const pos = marker.getLatLng();
              onDragEnd({ lat: pos.lat, lng: pos.lng });
            }
          },
        }}
      >
        {label && (
          <Tooltip direction="top" permanent={false} opacity={0.95}>
            <span className="font-semibold text-xs">{label}</span>
          </Tooltip>
        )}
      </Marker>
    </>
  );
}
