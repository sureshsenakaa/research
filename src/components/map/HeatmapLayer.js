'use client';

import { CircleMarker, Tooltip } from 'react-leaflet';
import { getHeatColor } from '@/lib/utils';

export default function HeatmapLayer({ points = [], options = {} }) {
  return (
    <>
      {points.map((point, idx) => {
        const [lat, lng, intensity] = point;
        const color = getHeatColor ? getHeatColor(intensity) : '#ef4444'; // Fallback if getHeatColor missing
        
        return (
          <CircleMarker
            key={idx}
            center={[lat, lng]}
            radius={options.radius || (intensity * 15)}
            pathOptions={{
              color: color,
              fillColor: color,
              fillOpacity: options.blur ? 0.4 : 0.6,
              weight: 0
            }}
          >
            <Tooltip>Intensity: {intensity.toFixed(2)}</Tooltip>
          </CircleMarker>
        );
      })}
    </>
  );
}
