'use client';

import { useState, useMemo, useCallback } from 'react';
import DynamicMap, { PinMarker, MapClickHandler, PolygonLayer } from '@/components/map/DynamicMap';
import FloatingPanel from '@/components/layout/FloatingPanel';
import SliderControl from '@/components/ui/SliderControl';
import PropertyValueChart from '@/components/charts/PropertyValueChart';
import ShapWaterfall from '@/components/charts/ShapWaterfall';
import { predictLandValuation, KNOWN_ZONES, KURUNEGALA_CBD } from '@/lib/valuationEngine';
import { ZONING_BUFFERS } from '@/data/mockData';
import { formatCurrencyFull, formatPerches } from '@/lib/utils';
import {
  Landmark,
  TrendingUp,
  MapPin,
  ShieldAlert,
  Droplets,
  Zap,
  Navigation,
  Sparkles,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Info,
} from 'lucide-react';

export default function PropertyValuationPage() {
  // Input State
  const [selectedCoords, setSelectedCoords] = useState({ lat: 7.4818, lng: 80.3609 });
  const [perches, setPerches] = useState(10);
  const [landType, setLandType] = useState('residential'); // 'residential' | 'commercial' | 'agricultural'
  const [targetYear, setTargetYear] = useState(2030);
  const [roadWidth, setRoadWidth] = useState('15ft');
  const [electricity, setElectricity] = useState(true);
  const [water, setWater] = useState(true);
  const [showHazardLayers, setShowHazardLayers] = useState(true);
  const [activeTab, setActiveTab] = useState('inputs'); // 'inputs' | 'forecast'

  // Prediction Calculation
  const valuation = useMemo(() => {
    return predictLandValuation({
      lat: selectedCoords.lat,
      lng: selectedCoords.lng,
      perches: Number(perches) || 1,
      landType,
      targetYear: Number(targetYear),
      roadWidth,
      utilities: { electricity, water },
    });
  }, [selectedCoords, perches, landType, targetYear, roadWidth, electricity, water]);

  // Handle map click
  const handleMapClick = useCallback((coords) => {
    setSelectedCoords({ lat: coords.lat, lng: coords.lng });
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-56px)] overflow-hidden">
      {/* Map View */}
      <DynamicMap center={[selectedCoords.lat, selectedCoords.lng]} zoom={14}>
        <MapClickHandler onMapClick={handleMapClick} />
        
        {/* Pinned Marker */}
        <PinMarker
          position={[selectedCoords.lat, selectedCoords.lng]}
          label={`${valuation.zoneName} (${formatPerches(perches)})`}
          onDragEnd={handleMapClick}
          color="#06b6d4"
        />

        {/* Optional Environmental Hazard & Zoning Buffers */}
        {showHazardLayers && <PolygonLayer polygons={ZONING_BUFFERS} />}
      </DynamicMap>

      {/* Floating Top Control / Preset Bar */}
      <div className="absolute top-4 left-4 z-40 flex flex-wrap items-center gap-2 max-w-[calc(100%-420px)] pointer-events-none">
        <div className="glass-panel px-3 py-2 rounded-xl flex items-center gap-2 pointer-events-auto shadow-xl">
          <MapPin size={16} className="text-cyan-400 animate-pulse" />
          <span className="text-xs text-white/90 font-medium">
            {valuation.zoneName}
          </span>
          <span className="text-[10px] text-white/50 bg-white/5 px-2 py-0.5 rounded">
            {selectedCoords.lat.toFixed(4)}, {selectedCoords.lng.toFixed(4)}
          </span>
        </div>

        {/* Quick location presets */}
        <div className="hidden lg:flex items-center gap-1.5 glass-panel px-2 py-1.5 rounded-xl pointer-events-auto">
          <span className="text-[10px] text-white/50 font-medium pl-1">ප්‍රදේශ:</span>
          {KNOWN_ZONES.slice(0, 4).map((zone) => (
            <button
              key={zone.name}
              onClick={() => setSelectedCoords({ lat: zone.lat, lng: zone.lng })}
              className={`text-xs px-2.5 py-1 rounded-lg transition-all font-medium ${
                valuation.zoneName === zone.name
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {zone.name}
            </button>
          ))}
        </div>

        {/* Toggle Hazards overlay */}
        <button
          onClick={() => setShowHazardLayers(!showHazardLayers)}
          className={`glass-panel px-3 py-2 rounded-xl flex items-center gap-1.5 text-xs font-medium pointer-events-auto transition-all ${
            showHazardLayers ? 'text-amber-400 border border-amber-500/30' : 'text-white/60 hover:text-white'
          }`}
          title="Toggle Flood & Steep Slope hazard zones on map"
        >
          <Layers size={14} />
          <span>අවදානම් කලාප {showHazardLayers ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* Main Right Floating Panel */}
      <FloatingPanel
        position="right"
        title="ඉඩම් මිල අනාවැකි & තක්සේරු (AI Valuation)"
        className="max-w-[440px] w-full"
      >
        {/* Navigation Tabs */}
        <div className="flex bg-black/40 p-1 rounded-xl border border-white/10 mb-4">
          <button
            onClick={() => setActiveTab('inputs')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'inputs'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Sparkles size={14} />
            ඉඩම් තොරතුරු (Inputs)
          </button>
          <button
            onClick={() => setActiveTab('forecast')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'forecast'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <TrendingUp size={14} />
            අනාවැකි & අවදානම් (Forecast)
          </button>
        </div>

        {/* TAB 1: INPUT CONTROLS */}
        {activeTab === 'inputs' && (
          <div className="space-y-4">
            {/* Location Banner */}
            <div className="bg-gradient-to-br from-cyan-950/40 to-slate-900/60 border border-cyan-500/20 rounded-xl p-3.5 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0 mt-0.5">
                <MapPin size={18} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{valuation.zoneName}</h4>
                  <span className="text-[10px] text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                    {valuation.distToCbdKm} km CBD සිට
                  </span>
                </div>
                <p className="text-[11px] text-white/60 mt-0.5">
                  මැප් එක මත click කර වෙනත් ස්ථානයක් pin කළ හැක.
                </p>
              </div>
            </div>

            {/* Perches Extent */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-white/90">
                  පර්චස් ප්‍රමාණය (Land Extent)
                </label>
                <span className="text-sm font-bold text-cyan-400">
                  {formatPerches(perches)}
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={50}
                step={0.5}
                value={perches}
                onChange={(e) => setPerches(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-700 rounded-lg appearance-none"
              />
              <div className="flex gap-1.5 mt-2.5">
                {[6, 10, 15, 20, 30].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPerches(p)}
                    className={`flex-1 py-1 text-[11px] font-medium rounded-md border transition-all ${
                      perches === p
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                        : 'border-white/10 text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {p}P
                  </button>
                ))}
              </div>
            </div>

            {/* Land Category / Type */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
              <label className="text-xs font-semibold text-white/90 block mb-2">
                ඉඩම් වර්ගය (Land Category)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'residential', name: 'නේවාසික', sub: 'Residential' },
                  { id: 'commercial', name: 'වානිජ', sub: 'Commercial' },
                  { id: 'agricultural', name: 'කෘෂිකාර්මික', sub: 'Agricultural' },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setLandType(type.id)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      landType === type.id
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-inner'
                        : 'border-white/10 bg-black/20 text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold">{type.name}</div>
                    <div className="text-[10px] text-white/40">{type.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Target Year / Horizon */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-white/90">
                  කාල සීමාව (Target Forecast Year)
                </label>
                <span className="text-sm font-bold text-purple-400">
                  {targetYear} වසර
                </span>
              </div>
              <input
                type="range"
                min={2026}
                max={2035}
                step={1}
                value={targetYear}
                onChange={(e) => setTargetYear(parseInt(e.target.value))}
                className="w-full accent-purple-400 cursor-pointer h-1.5 bg-slate-700 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] text-white/40 mt-1">
                <span>2026 (දැනට)</span>
                <span>2030</span>
                <span>2035</span>
              </div>
            </div>

            {/* Road Width & Utilities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Access Road Width */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <label className="text-xs font-semibold text-white/90 block mb-1.5">
                  පාරේ පළල (Road Width)
                </label>
                <select
                  value={roadWidth}
                  onChange={(e) => setRoadWidth(e.target.value)}
                  className="w-full bg-slate-900 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="10ft">අඩි 10 (10 ft)</option>
                  <option value="12ft">අඩි 12 (12 ft)</option>
                  <option value="15ft">අඩි 15 (15 ft - සාමාන්‍ය)</option>
                  <option value="20ft">අඩි 20 (20 ft - පුළුල්)</option>
                  <option value="30+ft">අඩි 30+ (30+ ft - ප්‍රධාන)</option>
                </select>
              </div>

              {/* Utilities Checkboxes */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col justify-center gap-2">
                <label className="text-xs font-semibold text-white/90 block">
                  පහසුකම් (Utilities)
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 text-xs text-white/80 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={water}
                      onChange={(e) => setWater(e.target.checked)}
                      className="accent-cyan-400 rounded w-3.5 h-3.5 cursor-pointer"
                    />
                    <Droplets size={13} className="text-cyan-400" />
                    <span>නල ජලය</span>
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-white/80 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={electricity}
                      onChange={(e) => setElectricity(e.target.checked)}
                      className="accent-amber-400 rounded w-3.5 h-3.5 cursor-pointer"
                    />
                    <Zap size={13} className="text-amber-400" />
                    <span>විදුලිය</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Button to view forecast */}
            <button
              onClick={() => setActiveTab('forecast')}
              className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <TrendingUp size={16} />
              {targetYear} වටිනාකම & අවදානම් වාර්තාව බලන්න
            </button>
          </div>
        )}

        {/* TAB 2: FORECAST, TAX & HAZARD RISKS */}
        {activeTab === 'forecast' && (
          <div className="space-y-4">
            {/* Big Prediction Card */}
            <div className="relative overflow-hidden bg-gradient-to-br from-purple-950/60 via-slate-900/90 to-cyan-950/60 border border-purple-500/30 rounded-2xl p-5 shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-white/70 tracking-wide uppercase">
                  {targetYear} වසරේ ඉඩම් වටිනාකම
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/40">
                  +{valuation.annualGrowthPercent}% / yr CAGR
                </span>
              </div>

              <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300 tracking-tight my-1">
                {formatCurrencyFull(valuation.futureTotalValue)}
              </div>

              <div className="flex items-center justify-between text-xs text-white/60 border-t border-white/10 pt-2 mt-2">
                <span>පර්චසයක මිල:</span>
                <span className="font-semibold text-cyan-400">
                  {formatCurrencyFull(valuation.futurePerchPrice)} / perch
                </span>
              </div>
            </div>

            {/* Quick Metrics (2026 current vs Tax) */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <span className="text-[11px] text-white/50 block mb-0.5">වත්මන් මිල (2026)</span>
                <span className="text-sm font-bold text-white">
                  {formatCurrencyFull(valuation.currentTotalValue)}
                </span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-[11px] text-white/50">වාර්ෂික වරිපනම් බද්ද</span>
                  <Landmark size={12} className="text-purple-400" />
                </div>
                <span className="text-sm font-bold text-purple-300">
                  {formatCurrencyFull(valuation.annualTax)} / yr
                </span>
              </div>
            </div>

            {/* Hazard Risk Assessment Badges */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert size={14} className="text-amber-400" />
                  ආපදා අවදානම් තක්සේරුව (Hazard Risk)
                </h4>
              </div>

              {/* Flood Risk */}
              <div className="p-2.5 rounded-lg border bg-black/30 border-white/5 flex items-start gap-2.5">
                <div className="p-1.5 rounded-md bg-blue-500/10 text-blue-400 shrink-0 mt-0.5">
                  <Droplets size={15} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white/90">ගංවතුර අවදානම (Flood Risk)</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${valuation.floodRisk.bg}`}>
                      {valuation.floodRisk.levelSi}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/50 mt-1 leading-snug">
                    {valuation.floodRisk.reason}
                  </p>
                </div>
              </div>

              {/* Landslide Risk */}
              <div className="p-2.5 rounded-lg border bg-black/30 border-white/5 flex items-start gap-2.5">
                <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                  <AlertTriangle size={15} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white/90">නායයෑම් අවදානම (Landslide Risk)</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${valuation.landslideRisk.bg}`}>
                      {valuation.landslideRisk.levelSi}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/50 mt-1 leading-snug">
                    {valuation.landslideRisk.reason}
                  </p>
                </div>
              </div>
            </div>

            {/* Growth Chart */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
              <h4 className="text-xs font-bold text-white/90 mb-2 uppercase tracking-wider">
                මිල වර්ධන ප්‍රක්ෂේපණය (Growth Trajectory)
              </h4>
              <PropertyValueChart
                data={valuation.projectionTimeline}
                targetYear={valuation.targetYear}
              />
            </div>

            {/* SHAP Waterfall / Feature Impact */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
              <h4 className="text-xs font-bold text-white/90 mb-1 uppercase tracking-wider">
                මිල තීරණය කළ සාධක (AI SHAP Impact)
              </h4>
              <p className="text-[10px] text-white/50 mb-2">
                පාරේ පළල, පහසුකම් සහ කලාපීය සාධක මිලට බලපෑ ආකාරය (LKR)
              </p>
              <ShapWaterfall features={valuation.shapFeatures} />
            </div>

            {/* Back to inputs button */}
            <button
              onClick={() => setActiveTab('inputs')}
              className="w-full py-2 bg-white/10 hover:bg-white/15 text-white/80 text-xs font-semibold rounded-xl transition-all"
            >
              ← වෙනත් පරාමිතීන් වෙනස් කරන්න
            </button>
          </div>
        )}
      </FloatingPanel>
    </div>
  );
}
