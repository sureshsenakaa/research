'use client';

import { Polygon, Popup, Tooltip, useMap } from 'react-leaflet';

const STATUS_CONFIG = {
  existing: {
    color: '#22c55e',
    fillColor: '#22c55e',
    fillOpacity: 0.45,
    weight: 2,
    dashArray: undefined,
    label: 'Existing / Compliant',
    popupClass: 'existing-popup',
  },
  new_construction: {
    color: '#facc15',
    fillColor: '#facc15',
    fillOpacity: 0.55,
    weight: 2.5,
    dashArray: '6 4',
    label: 'New Construction',
    popupClass: 'construction-popup',
  },
  unauthorized: {
    color: '#ef4444',
    fillColor: '#ef4444',
    fillOpacity: 0.65,
    weight: 3,
    dashArray: undefined,
    label: 'Unauthorized Building',
    popupClass: 'unauthorized-popup',
  },
};

export default function BuildingLayer({ buildings = [], onBuildingClick }) {
  const map = useMap();

  return (
    <>
      {buildings.filter((b) => b && b.coords).map((building) => {
        const config = STATUS_CONFIG[building.status] || STATUS_CONFIG.existing;
        const isUnauthorized = building.status === 'unauthorized';

        return (
          <Polygon
            key={building.id}
            positions={building.coords}
            pathOptions={{
              color: config.color,
              fillColor: config.fillColor,
              fillOpacity: config.fillOpacity,
              weight: config.weight,
              dashArray: config.dashArray,
              className: isUnauthorized ? 'unauthorized-building-glow' : '',
            }}
            eventHandlers={{
              click: () => {
                if (onBuildingClick) {
                  onBuildingClick(building);
                }
                if (map && building.lat && building.lng) {
                  map.flyTo([building.lat, building.lng], isUnauthorized ? 18 : 17, {
                    duration: 1.2,
                  });
                }
              },
            }}
          >
            <Tooltip sticky>
              <div className="font-semibold text-sm">{building.name || building.id}</div>
              <div className="text-xs text-gray-300">
                Status: <span className="font-bold">{config.label}</span>
              </div>
              <div className="text-xs text-gray-400">Type: {building.type}</div>
            </Tooltip>

            <Popup className={config.popupClass}>
              {isUnauthorized ? (
                <div className="p-3 min-w-[240px] max-w-[300px]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">⚠️</span>
                    <div>
                      <h3 className="font-bold text-base text-white leading-tight">
                        Unauthorized Building
                      </h3>
                      <span className="text-[11px] text-red-200 uppercase tracking-wider font-semibold">
                        Regulation Violation Detected
                      </span>
                    </div>
                  </div>
                  <div className="h-px bg-white/25 my-2" />
                  <div className="space-y-1 text-xs text-white/90">
                    <p><span className="font-semibold">ID:</span> {building.id}</p>
                    <p><span className="font-semibold">Building Name:</span> {building.name}</p>
                    <p><span className="font-semibold">Type:</span> {building.type}</p>
                    <p><span className="font-semibold">Coordinates:</span> {building.lat?.toFixed(4)}, {building.lng?.toFixed(4)}</p>
                  </div>
                  <div className="mt-2.5 p-2 bg-black/30 rounded border border-red-400/40 text-xs text-white">
                    <p className="font-bold text-red-200 mb-0.5">Violation Reason:</p>
                    <p className="leading-snug">{building.violation || 'Building constructed without authorized UDA approval or permits.'}</p>
                  </div>
                  <div className="mt-2.5 text-center">
                    <span className="inline-block px-2.5 py-1 bg-white/20 border border-white/30 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                      🚫 Non-Compliant Structure
                    </span>
                  </div>
                </div>
              ) : building.status === 'new_construction' ? (
                <div className="p-3 min-w-[220px]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🏗️</span>
                    <div>
                      <h3 className="font-bold text-base text-yellow-300 leading-tight">
                        {building.name}
                      </h3>
                      <span className="text-[11px] text-yellow-200 uppercase tracking-wider font-semibold">
                        New Construction / Under Way
                      </span>
                    </div>
                  </div>
                  <div className="h-px bg-white/20 my-2" />
                  <div className="space-y-1 text-xs text-white/85">
                    <p><span className="font-semibold">ID:</span> {building.id}</p>
                    <p><span className="font-semibold">Type:</span> {building.type}</p>
                    <p><span className="font-semibold">Permit:</span> {building.permitId || 'Pending'}</p>
                    <p><span className="font-semibold">Year:</span> {building.constructionYear || 2026}</p>
                  </div>
                </div>
              ) : (
                <div className="p-3 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🏢</span>
                    <div>
                      <h3 className="font-bold text-base text-green-300 leading-tight">
                        {building.name}
                      </h3>
                      <span className="text-[11px] text-green-200 uppercase tracking-wider font-semibold">
                        Compliant Existing Structure
                      </span>
                    </div>
                  </div>
                  <div className="h-px bg-white/20 my-2" />
                  <div className="space-y-1 text-xs text-white/85">
                    <p><span className="font-semibold">ID:</span> {building.id}</p>
                    <p><span className="font-semibold">Type:</span> {building.type}</p>
                    {building.permitId && <p><span className="font-semibold">Permit:</span> {building.permitId}</p>}
                    {building.constructionYear && <p><span className="font-semibold">Year Built:</span> {building.constructionYear}</p>}
                  </div>
                </div>
              )}
            </Popup>
          </Polygon>
        );
      })}
    </>
  );
}
