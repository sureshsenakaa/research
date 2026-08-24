'use client';

import { Marker, Popup, Tooltip } from 'react-leaflet';
import { useMemo } from 'react';

export default function MarkerLayer({ markers = [], onMarkerClick, glowing = false, color = '#00d4ff' }) {
  const glowingIcon = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const L = require('leaflet');
    return new L.DivIcon({
      html: `
        <div style="position: relative; width: 24px; height: 24px;">
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: ${color}; opacity: 0.4; border-radius: 50%; animation: pulseGlow 2s infinite;"></div>
          <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 8px; height: 8px; background-color: ${color}; border-radius: 50%; box-shadow: 0 0 10px ${color};"></div>
        </div>
      `,
      className: 'custom-glowing-icon',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12],
    });
  }, [color]);

  return (
    <>
      <style>{`
        @keyframes pulseGlow {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(0.8); opacity: 0; }
        }
      `}</style>
      
      {markers.map((marker, idx) => (
        <Marker
          key={marker.id || idx}
          position={[marker.lat, marker.lng]}
          icon={glowing && glowingIcon ? glowingIcon : undefined}
          eventHandlers={{
            click: () => onMarkerClick && onMarkerClick(marker.data || marker)
          }}
        >
          {marker.label && (
            <Tooltip direction="top" offset={[0, -10]} opacity={1}>
              {marker.label}
            </Tooltip>
          )}
          {marker.data && (
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg mb-2">{marker.label || 'Details'}</h3>
                <div className="space-y-1 text-sm">
                  {Object.entries(marker.data).map(([key, value]) => (
                    <div key={key}>
                      <span className="font-semibold opacity-70">{key}:</span> {String(value)}
                    </div>
                  ))}
                </div>
              </div>
            </Popup>
          )}
        </Marker>
      ))}
    </>
  );
}
