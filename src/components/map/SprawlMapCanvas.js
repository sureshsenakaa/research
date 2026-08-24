'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MATALE_MAP_FEATURES, MATALE_EXPANSION_HOTSPOTS } from '@/data/mockData';
import { Layers, Maximize2, Minimize2 } from 'lucide-react';

export default function SprawlMapCanvas({
  selectedYear = 2026,
  activeLayers = { builtup: true, vegetation: true, water: true, roads: true },
  activeModel = 'CA-Markov',
  scenarioMultiplier = 1.0,
}) {
  const [mapMode, setMapMode] = useState('vector'); // 'vector' | 'satellite' | 'compare'
  const [compareSplit, setCompareSplit] = useState(50);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Active sprawl polygons for current year (scaled if scenario multiplier applied)
  const currentSprawl = useMemo(() => {
    const polygons = MATALE_MAP_FEATURES.sprawlByYear[selectedYear] || MATALE_MAP_FEATURES.sprawlByYear[2026];
    return polygons;
  }, [selectedYear]);

  // Comparison sprawl (2035) for compare mode
  const compareSprawl2035 = useMemo(() => {
    return MATALE_MAP_FEATURES.sprawlByYear[2035];
  }, []);

  // Convert lat/lng to SVG coordinate viewBox (0 0 1000 700)
  // Lat: 7.410 -> 7.530 (height: 0.120)
  // Lng: 80.570 -> 80.700 (width: 0.130)
  const toSvgCoords = (lat, lng) => {
    const minLat = 7.410;
    const maxLat = 7.530;
    const minLng = 80.570;
    const maxLng = 80.700;

    const x = ((lng - minLng) / (maxLng - minLng)) * 1000;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 700;
    return [x, y];
  };

  const toPolygonPath = (coords) => {
    if (!coords || coords.length === 0) return '';
    return coords
      .map((c, i) => {
        const [x, y] = toSvgCoords(c[0], c[1]);
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ') + ' Z';
  };

  const toPolylinePath = (coords) => {
    if (!coords || coords.length === 0) return '';
    return coords
      .map((c, i) => {
        const [x, y] = toSvgCoords(c[0], c[1]);
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  };

  // Center town coords in SVG space
  const [townX, townY] = toSvgCoords(MATALE_MAP_FEATURES.townCenter.coords[0], MATALE_MAP_FEATURES.townCenter.coords[1]);

  return (
    <div className={`relative w-full h-full bg-[#070b1e] overflow-hidden select-none ${isFullScreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Background Cartographic Grid / Radar Circles */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cartoGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00d4ff" strokeWidth="0.5" strokeOpacity="0.15" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cartoGrid)" />
        {/* Subtle concentric distance rings centered on Matale */}
        <circle cx={`${(townX / 10).toFixed(0)}%`} cy={`${(townY / 7).toFixed(0)}%`} r="120" fill="none" stroke="#00d4ff" strokeWidth="0.75" strokeDasharray="4 6" strokeOpacity="0.25" />
        <circle cx={`${(townX / 10).toFixed(0)}%`} cy={`${(townY / 7).toFixed(0)}%`} r="240" fill="none" stroke="#00d4ff" strokeWidth="0.75" strokeDasharray="4 6" strokeOpacity="0.15" />
        <circle cx={`${(townX / 10).toFixed(0)}%`} cy={`${(townY / 7).toFixed(0)}%`} r="380" fill="none" stroke="#00d4ff" strokeWidth="0.5" strokeDasharray="6 8" strokeOpacity="0.1" />
      </svg>

      {/* Satellite Imagery Layer (when in Satellite Mode) */}
      {mapMode === 'satellite' && (
        <div className="absolute inset-0 opacity-40 mix-blend-luminosity pointer-events-none">
          <img
            src="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/13/3820/5835"
            alt="Satellite Base"
            className="w-full h-full object-cover scale-150 filter contrast-125 brightness-75"
          />
        </div>
      )}

      {/* Main SVG Vector Sprawl Map */}
      <svg
        viewBox="0 0 1000 700"
        className="w-full h-full object-contain"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Radial Glow Filters */}
          <filter id="orangeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="cyanGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradients */}
          <linearGradient id="builtupGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff7a29" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ea580c" stopOpacity="0.7" />
          </linearGradient>

          <linearGradient id="reservoirGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.55" />
          </linearGradient>
        </defs>

        {/* 1. GREEN COVER LAYER (Vegetation) */}
        {activeLayers.vegetation && (
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            d={toPolygonPath(MATALE_MAP_FEATURES.greenCover)}
            fill="#14532d"
            fillOpacity="0.32"
            stroke="#22c55e"
            strokeWidth="1.5"
            strokeOpacity="0.35"
            strokeDasharray="6 4"
          />
        )}

        {/* Scatter Vegetation Dots */}
        {activeLayers.vegetation &&
          MATALE_MAP_FEATURES.scatterDots.map((dot, i) => {
            const [x, y] = toSvgCoords(dot[0], dot[1]);
            return (
              <circle
                key={`dot-${i}`}
                cx={x}
                cy={y}
                r="2.5"
                fill="#22c55e"
                fillOpacity="0.5"
              />
            );
          })}

        {/* 2. WATER & WETLANDS LAYER (Bowatenna Reservoir) */}
        {activeLayers.water && (
          <g>
            <motion.path
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              d={toPolygonPath(MATALE_MAP_FEATURES.reservoir.coords)}
              fill="url(#reservoirGradient)"
              stroke="#00d4ff"
              strokeWidth="1.8"
              filter="url(#cyanGlow)"
            />
            {/* Reservoir Label */}
            <text
              x={toSvgCoords(7.4930, 80.6080)[0]}
              y={toSvgCoords(7.4930, 80.6080)[1] - 8}
              fill="#00d4ff"
              fontSize="12"
              fontFamily="monospace"
              fontWeight="600"
              letterSpacing="0.5"
              textAnchor="middle"
            >
              Bowatenna Reservoir
            </text>
          </g>
        )}

        {/* 3. ROAD NETWORK LAYER */}
        {activeLayers.roads && (
          <g>
            {MATALE_MAP_FEATURES.roadCorridors.map((road) => (
              <g key={road.id}>
                {/* Road Glow underlay */}
                <path
                  d={toPolylinePath(road.coords)}
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth={road.width + 3}
                  strokeOpacity="0.15"
                />
                {/* Main Road Line */}
                <path
                  d={toPolylinePath(road.coords)}
                  fill="none"
                  stroke={road.color}
                  strokeWidth={road.width}
                  strokeOpacity="0.85"
                  strokeDasharray={road.id === 'RattotaRd' || road.id === 'UkuwelaRd' ? '6 3' : undefined}
                />
                {/* Road Node Dots */}
                {road.coords.map((c, i) => {
                  const [rx, ry] = toSvgCoords(c[0], c[1]);
                  return (
                    <circle
                      key={`rnode-${road.id}-${i}`}
                      cx={rx}
                      cy={ry}
                      r="3.5"
                      fill="#e2e8f0"
                      stroke="#0f172a"
                      strokeWidth="1"
                    />
                  );
                })}
              </g>
            ))}
          </g>
        )}

        {/* 4. BUILT-UP / URBAN SPRAWL POLYGONS */}
        {activeLayers.builtup && (
          <g>
            {/* Standard Vector View */}
            {mapMode !== 'compare' &&
              currentSprawl.map((sprawl, idx) => (
                <motion.path
                  key={`sprawl-${sprawl.id}-${idx}`}
                  layout
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: sprawl.opacity || 0.7 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  d={toPolygonPath(sprawl.coords)}
                  fill={sprawl.color === '#ff7a29' ? 'url(#builtupGradient)' : sprawl.color}
                  stroke={sprawl.color}
                  strokeWidth="2"
                  filter={sprawl.color === '#ff7a29' ? 'url(#orangeGlow)' : undefined}
                />
              ))}

            {/* Compare Mode (2026 vs 2035) */}
            {mapMode === 'compare' && (
              <g>
                {/* 2035 Projected Background Extension in Dashed Purple/Red */}
                {compareSprawl2035.map((sprawl, idx) => (
                  <path
                    key={`compare-2035-${idx}`}
                    d={toPolygonPath(sprawl.coords)}
                    fill="#ef4444"
                    fillOpacity="0.35"
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeDasharray="6 3"
                  />
                ))}

                {/* 2026 Baseline in Solid Orange */}
                {MATALE_MAP_FEATURES.sprawlByYear[2026].map((sprawl, idx) => (
                  <path
                    key={`compare-2026-${idx}`}
                    d={toPolygonPath(sprawl.coords)}
                    fill="url(#builtupGradient)"
                    stroke="#ff7a29"
                    strokeWidth="2"
                  />
                ))}
              </g>
            )}
          </g>
        )}

        {/* 5. HOTSPOTS & RADAR PULSE RINGS */}
        {activeLayers.builtup &&
          MATALE_EXPANSION_HOTSPOTS.map((hotspot) => {
            const [hx, hy] = toSvgCoords(hotspot.coords[0], hotspot.coords[1]);
            return (
              <g key={hotspot.rank}>
                {/* Concentric radar rings */}
                <circle cx={hx} cy={hy} r="18" fill="none" stroke="#ef4444" strokeWidth="1" strokeOpacity="0.4" className="animate-ping" style={{ transformOrigin: `${hx}px ${hy}px`, animationDuration: '3s' }} />
                <circle cx={hx} cy={hy} r="12" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeOpacity="0.7" />
                <circle cx={hx} cy={hy} r="4" fill="#ef4444" />
              </g>
            );
          })}

        {/* 6. MATALE TOWN CENTER PIN & LABEL */}
        <g>
          <circle cx={townX} cy={townY} r="8" fill="#ffffff" fillOpacity="0.2" className="animate-pulse" />
          <circle cx={townX} cy={townY} r="4.5" fill="#ffffff" stroke="#0a0e27" strokeWidth="1.5" />
          <text
            x={townX + 10}
            y={townY + 4}
            fill="#ffffff"
            fontSize="14"
            fontFamily="sans-serif"
            fontWeight="bold"
            letterSpacing="0.3"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))"
          >
            Matale Town
          </text>
        </g>
      </svg>

      {/* Top Floating Map Controls (Vector / Satellite / Compare) */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center bg-[#0d1430]/90 backdrop-blur-md p-1 rounded-full border border-white/10 shadow-xl z-20">
        <button
          onClick={() => setMapMode('vector')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
            mapMode === 'vector'
              ? 'bg-[#1e2c56] text-cyan-400 border border-cyan-500/40 shadow-sm'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Vector
        </button>
        <button
          onClick={() => setMapMode('satellite')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
            mapMode === 'satellite'
              ? 'bg-[#1e2c56] text-cyan-400 border border-cyan-500/40 shadow-sm'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Satellite
        </button>
        <button
          onClick={() => setMapMode('compare')}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
            mapMode === 'compare'
              ? 'bg-[#1e2c56] text-cyan-400 border border-cyan-500/40 shadow-sm'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Compare 2026 vs 2035
        </button>
      </div>

      {/* Top Right / Left Action Icons */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
        <button
          onClick={() => setIsFullScreen(!isFullScreen)}
          className="p-2 rounded-lg bg-[#0d1430]/80 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          title={isFullScreen ? 'Exit Full Screen' : 'Full Screen'}
        >
          {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>

      {/* Bottom Map Overlays */}
      {/* Bottom-Left Floating Legend */}
      <div className="absolute bottom-4 left-4 flex items-center gap-4 bg-[#0d1430]/85 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/10 text-[11px] font-medium text-gray-300 shadow-lg z-20">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#ff7a29]" />
          <span>Built-up</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#22c55e]" />
          <span>Vegetation</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#00d4ff]" />
          <span>Water</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm bg-[#facc15]" />
          <span>Bare Land</span>
        </div>
      </div>

      {/* Bottom-Right Coordinates Badge */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-[#0d1430]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 font-mono text-[11px] text-gray-300 shadow-lg z-20">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span>LAT <strong className="text-cyan-400 font-semibold">7.4675°N</strong></span>
        <span className="text-gray-500">|</span>
        <span>LON <strong className="text-cyan-400 font-semibold">80.6234°E</strong></span>
      </div>
    </div>
  );
}
