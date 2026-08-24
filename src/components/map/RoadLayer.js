'use client';

import { Polyline, Tooltip } from 'react-leaflet';

export default function RoadLayer({ roads = [] }) {
  return (
    <>
      {roads.map((road) => (
        <Polyline
          key={road.id}
          positions={road.coords}
          pathOptions={{
            color: road.color || '#94a3b8',
            weight: road.width || 2,
            opacity: 0.7,
            dashArray: road.type === 'Secondary' ? '8 4' : undefined,
          }}
        >
          <Tooltip sticky>
            <div className="font-semibold">{road.name}</div>
            <div className="text-xs opacity-70">{road.type} Road</div>
          </Tooltip>
        </Polyline>
      ))}
    </>
  );
}
