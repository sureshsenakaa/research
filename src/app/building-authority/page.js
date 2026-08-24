'use client';

import { useState, useCallback, useRef, useMemo } from 'react';
import DynamicMap, { PolygonLayer, RoadLayer, BuildingLayer } from '@/components/map/DynamicMap';
import FloatingPanel from '@/components/layout/FloatingPanel';
import Badge from '@/components/ui/Badge';
import { AUTHORITY_BUILDINGS, AUTHORITY_ROADS, AUTHORITY_NATURE_RESERVES, AUTHORITY_STATS } from '@/data/mockData';
import { Shield, AlertTriangle, Building2, HardHat, TreePine, MapPin, Eye, Search } from 'lucide-react';

export default function BuildingAuthorityPage() {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [showNatureReserves, setShowNatureReserves] = useState(true);
  const [showRoads, setShowRoads] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const mapRef = useRef(null);

  // Nature reserve polygons
  const reservePolygons = useMemo(() =>
    AUTHORITY_NATURE_RESERVES.map((nr) => ({
      id: nr.id,
      coords: nr.coords,
      color: nr.color,
      fillColor: nr.color,
      fillOpacity: 0.18,
      weight: 1.5,
      label: nr.name,
      data: nr,
    })), []
  );

  // Filter buildings according to tab
  const filteredBuildings = useMemo(() => {
    if (filterStatus === 'all') return AUTHORITY_BUILDINGS;
    return AUTHORITY_BUILDINGS.filter(b => b.status === filterStatus);
  }, [filterStatus]);

  // Get unauthorized buildings for the alert list
  const unauthorizedBuildings = useMemo(() =>
    AUTHORITY_BUILDINGS.filter((b) => b.status === 'unauthorized'), []
  );

  // Handle building click — zoom and select
  const handleBuildingClick = useCallback((buildingData) => {
    setSelectedBuilding(buildingData);
  }, []);

  // Handle alert click — fly to unauthorized building
  const handleAlertClick = useCallback((building) => {
    setSelectedBuilding(building);
    if (mapRef.current && building.lat && building.lng) {
      mapRef.current.flyTo([building.lat, building.lng], 18, {
        duration: 1.2,
      });
    }
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-56px)]">
      {/* Dynamic Map */}
      <DynamicMap mapRef={mapRef}>
        {/* Nature Reserves Layer */}
        {showNatureReserves && (
          <PolygonLayer polygons={reservePolygons} />
        )}

        {/* Roads Layer */}
        {showRoads && (
          <RoadLayer roads={AUTHORITY_ROADS} />
        )}

        {/* Buildings Layer (Existing, New Construction, Unauthorized) */}
        <BuildingLayer
          buildings={filteredBuildings}
          onBuildingClick={handleBuildingClick}
        />
      </DynamicMap>

      {/* Right Floating Control & Compliance Panel */}
      <FloatingPanel position="right" title="Building Authority & Detection">
        {/* KPI Summary */}
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          <div className="bg-white/5 rounded-xl p-3 border border-white/10 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Building2 size={13} className="text-cyan-400" />
              Total Monitored
            </div>
            <div className="text-2xl font-bold text-white mt-1">{AUTHORITY_STATS.totalBuildings}</div>
            <span className="text-[10px] text-gray-500">Registered footprints</span>
          </div>

          <div className="bg-red-500/10 rounded-xl p-3 border border-red-500/25 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-xs text-red-400 font-semibold">
              <AlertTriangle size={13} className="text-red-400 animate-pulse" />
              Unauthorized
            </div>
            <div className="text-2xl font-bold text-red-400 mt-1">{AUTHORITY_STATS.unauthorized}</div>
            <span className="text-[10px] text-red-300/70">Regulation violations</span>
          </div>

          <div className="bg-yellow-500/10 rounded-xl p-3 border border-yellow-500/25 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-xs text-yellow-400 font-semibold">
              <HardHat size={13} className="text-yellow-400" />
              New Constructions
            </div>
            <div className="text-2xl font-bold text-yellow-400 mt-1">{AUTHORITY_STATS.newConstructions}</div>
            <span className="text-[10px] text-yellow-300/70">Yellow footprints</span>
          </div>

          <div className="bg-emerald-500/10 rounded-xl p-3 border border-emerald-500/25 flex flex-col justify-between">
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <TreePine size={13} className="text-emerald-400" />
              Nature Reserves
            </div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">{AUTHORITY_STATS.natureReserves}</div>
            <span className="text-[10px] text-emerald-300/70">Protected zones</span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex p-1 bg-white/5 rounded-lg border border-white/10 mb-5 text-xs">
          {[
            { id: 'all', label: 'All Buildings' },
            { id: 'unauthorized', label: 'Unauthorized (5)' },
            { id: 'new_construction', label: 'New (4)' },
            { id: 'existing', label: 'Existing (6)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`flex-1 py-1.5 px-2 rounded-md font-medium transition-all ${
                filterStatus === tab.id
                  ? 'bg-cyan-500 text-white shadow'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Map Legend */}
        <div className="mb-5 bg-white/5 p-3.5 rounded-xl border border-white/10">
          <h3 className="text-xs font-bold text-white/90 mb-2.5 uppercase tracking-wider">
            Classification Legend
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3.5 h-3.5 rounded bg-emerald-500/70 border border-emerald-400 inline-block shrink-0"></span>
                <span className="text-gray-200">Existing Compliant Buildings</span>
              </div>
              <span className="text-gray-400 text-[11px]">Green</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3.5 h-3.5 rounded bg-yellow-400/80 border border-yellow-300 border-dashed inline-block shrink-0"></span>
                <span className="text-gray-200">New Construction / Ongoing</span>
              </div>
              <span className="text-yellow-400 text-[11px]">Yellow</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3.5 h-3.5 rounded bg-red-500/90 border-2 border-red-500 animate-pulse inline-block shrink-0"></span>
                <span className="text-red-300 font-semibold">Unauthorized Buildings</span>
              </div>
              <span className="text-red-400 text-[11px] font-bold">Red (Click to Zoom)</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3.5 h-3.5 rounded bg-teal-500/40 border border-teal-400 inline-block shrink-0"></span>
                <span className="text-gray-200">Nature Reserves & Buffers</span>
              </div>
              <span className="text-teal-400 text-[11px]">Teal / Green</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-3.5 h-1 bg-slate-300 rounded inline-block shrink-0"></span>
                <span className="text-gray-200">Road Networks</span>
              </div>
              <span className="text-slate-400 text-[11px]">Lines</span>
            </div>
          </div>
        </div>

        {/* Layer Controls */}
        <div className="mb-5 flex gap-4">
          <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer bg-white/5 px-3 py-2 rounded-lg border border-white/10 hover:bg-white/10 flex-1">
            <input
              type="checkbox"
              checked={showNatureReserves}
              onChange={(e) => setShowNatureReserves(e.target.checked)}
              className="accent-teal-500 rounded"
            />
            <span>Nature Reserves</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer bg-white/5 px-3 py-2 rounded-lg border border-white/10 hover:bg-white/10 flex-1">
            <input
              type="checkbox"
              checked={showRoads}
              onChange={(e) => setShowRoads(e.target.checked)}
              className="accent-cyan-500 rounded"
            />
            <span>Road Overlay</span>
          </label>
        </div>

        {/* Selected Building Detail Card */}
        {selectedBuilding && (
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-white/90 uppercase tracking-wider">
                Selected Building Details
              </h3>
              <button
                onClick={() => setSelectedBuilding(null)}
                className="text-[11px] text-gray-400 hover:text-white"
              >
                Clear
              </button>
            </div>

            <div className={`p-4 rounded-xl border ${
              selectedBuilding.status === 'unauthorized'
                ? 'bg-red-500/15 border-red-500/40 shadow-lg shadow-red-500/10'
                : selectedBuilding.status === 'new_construction'
                ? 'bg-yellow-500/15 border-yellow-500/40'
                : 'bg-emerald-500/15 border-emerald-500/40'
            }`}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h4 className="font-bold text-white text-sm">{selectedBuilding.name}</h4>
                  <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                    <MapPin size={11} />
                    {selectedBuilding.lat?.toFixed(4)}, {selectedBuilding.lng?.toFixed(4)}
                  </div>
                </div>
                <Badge variant={
                  selectedBuilding.status === 'unauthorized' ? 'violation'
                  : selectedBuilding.status === 'new_construction' ? 'warning'
                  : 'compliant'
                }>
                  {selectedBuilding.status === 'unauthorized' ? 'Unauthorized'
                  : selectedBuilding.status === 'new_construction' ? 'New Construction'
                  : 'Compliant'}
                </Badge>
              </div>

              <div className="text-xs text-white/80 space-y-1.5 my-3 border-t border-white/10 pt-2.5">
                <div className="flex justify-between">
                  <span className="text-gray-400">Building ID:</span>
                  <span className="font-mono font-semibold">{selectedBuilding.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Category:</span>
                  <span>{selectedBuilding.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Permit Number:</span>
                  <span className="font-mono">{selectedBuilding.permitId || 'None / Not Issued'}</span>
                </div>
                {selectedBuilding.constructionYear && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Construction Year:</span>
                    <span>{selectedBuilding.constructionYear}</span>
                  </div>
                )}
              </div>

              {selectedBuilding.status === 'unauthorized' && (
                <div className="p-3 bg-red-500/20 rounded-lg border border-red-500/40 text-xs mt-2">
                  <div className="flex items-center gap-1.5 text-red-300 font-bold mb-1">
                    <AlertTriangle size={13} />
                    <span>Violation Notice</span>
                  </div>
                  <p className="text-red-200/90 leading-relaxed">{selectedBuilding.violation}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Unauthorized Buildings Alert List */}
        <div>
          <h3 className="text-xs font-bold text-white/90 mb-2.5 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-red-400">
              <AlertTriangle size={13} />
              Unauthorized Detection Feed
            </span>
            <span className="text-[11px] text-gray-500 font-normal">Click to zoom</span>
          </h3>

          <div className="space-y-2">
            {unauthorizedBuildings.map((building) => (
              <div
                key={building.id}
                onClick={() => handleAlertClick(building)}
                className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 hover:scale-[1.01] ${
                  selectedBuilding?.id === building.id
                    ? 'bg-red-500/20 border-red-500/60 shadow-md shadow-red-500/20'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-red-500/30'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                    <span className="text-xs font-bold text-white">{building.id}</span>
                    <span className="text-[11px] text-gray-400">• {building.name}</span>
                  </div>
                  <Badge variant="violation">Illegal</Badge>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-gray-400 mb-1">
                  <MapPin size={10} className="text-red-400" />
                  {building.lat.toFixed(4)}, {building.lng.toFixed(4)} ({building.type})
                </div>
                <p className="text-[11px] text-red-300/80 leading-snug line-clamp-2 bg-red-950/30 p-1.5 rounded border border-red-900/40">
                  {building.violation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FloatingPanel>
    </div>
  );
}
