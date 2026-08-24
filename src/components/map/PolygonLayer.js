'use client';

import { Polygon, Popup, Tooltip } from 'react-leaflet';

export default function PolygonLayer({ polygons = [], onPolygonClick }) {
  return (
    <>
      {polygons.filter(p => p && p.coords).map((polygon, idx) => (
        <Polygon
          key={polygon.id || `polygon-${idx}`}
          positions={polygon.coords}
          pathOptions={{
            color: polygon.color || '#7c3aed',
            fillColor: polygon.fillColor || '#7c3aed',
            fillOpacity: polygon.fillOpacity || 0.3,
            weight: 2
          }}
          eventHandlers={{
            click: () => onPolygonClick && onPolygonClick(polygon.data || polygon)
          }}
        >
          {polygon.label && (
            <Tooltip sticky>
              <div className="font-semibold">{polygon.label}</div>
            </Tooltip>
          )}
          {polygon.data && (
            <Popup className="custom-popup">
              <div className="p-2">
                <h3 className="font-bold text-lg mb-2">{polygon.label || polygon.id}</h3>
                <div className="space-y-1 text-sm">
                  {Object.entries(polygon.data).map(([key, value]) => (
                    <div key={key}>
                      <span className="font-semibold opacity-70">{key}:</span> {String(value)}
                    </div>
                  ))}
                </div>
              </div>
            </Popup>
          )}
        </Polygon>
      ))}
    </>
  );
}
