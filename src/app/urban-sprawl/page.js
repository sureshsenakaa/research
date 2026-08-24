'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SprawlMapCanvas from '@/components/map/SprawlMapCanvas';
import DoughnutChart from '@/components/charts/DoughnutChart';
import {
  MATALE_GIS_LAYERS,
  MATALE_PREDICTION_MODELS,
  MATALE_SCENARIOS,
  MATALE_EXPANSION_HOTSPOTS,
  MATALE_YEAR_METRICS,
} from '@/data/mockData';
import {
  Play,
  Pause,
  Download,
  MapPin,
  ChevronDown,
  TrendingUp,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';

const TIMELINE_YEARS = [2015, 2020, 2026, 2030, 2035];

export default function UrbanSprawlPage() {
  // State
  const [selectedYear, setSelectedYear] = useState(2026);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  // GIS Layer toggles
  const [activeLayers, setActiveLayers] = useState({
    builtup: true,
    vegetation: true,
    water: true,
    roads: true,
  });

  // Simulation parameters
  const [selectedModel, setSelectedModel] = useState('CA-Markov');
  const [selectedScenario, setSelectedScenario] = useState('standard');
  const [populationGrowth, setPopulationGrowth] = useState(2.1);
  const [roadWeight, setRoadWeight] = useState('Medium'); // 'Low' | 'Medium' | 'High'

  // District selector dropdown
  const [districtOpen, setDistrictOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('මාතලේ දිස්ත්‍රික්කය / Matale MC');

  // Simulation timer for auto-play
  const playIntervalRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        setSelectedYear((prevYear) => {
          const currentIndex = TIMELINE_YEARS.indexOf(prevYear);
          if (currentIndex === -1 || currentIndex === TIMELINE_YEARS.length - 1) {
            return TIMELINE_YEARS[0];
          }
          return TIMELINE_YEARS[currentIndex + 1];
        });
      }, 2000);
    } else {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    }

    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
    };
  }, [isPlaying]);

  // Handle Scenario preset change
  const handleScenarioChange = (scenarioKey) => {
    setSelectedScenario(scenarioKey);
    const scenario = MATALE_SCENARIOS[scenarioKey];
    if (scenario) {
      setPopulationGrowth(scenario.popGrowth);
      setRoadWeight(scenario.roadWeight);
    }
  };

  // Run Simulation action
  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
      setSelectedYear(2035);
    }, 1200);
  };

  // Toggle single layer
  const toggleLayer = (layerKey) => {
    setActiveLayers((prev) => ({
      ...prev,
      [layerKey]: !prev[layerKey],
    }));
  };

  // Current year metrics
  const currentMetrics = useMemo(() => {
    return MATALE_YEAR_METRICS[selectedYear] || MATALE_YEAR_METRICS[2026];
  }, [selectedYear]);

  // Active prediction model details
  const modelInfo = useMemo(() => {
    return MATALE_PREDICTION_MODELS[selectedModel] || MATALE_PREDICTION_MODELS['CA-Markov'];
  }, [selectedModel]);

  return (
    <div className="flex flex-col w-full h-[calc(100vh-56px)] bg-[#070b1e] text-white overflow-hidden select-none">
      {/* 1. TOP HEADER BAR */}
      <header className="h-14 bg-[#0a0f2c] border-b border-white/10 px-5 flex items-center justify-between shrink-0 z-30">
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center font-black text-white text-xs tracking-wider shadow-md shadow-blue-500/20">
            UL
          </div>
          <div>
            <h1 className="text-sm font-bold text-white leading-none">
              Urbanscapes<span className="text-cyan-400">-LK</span>
            </h1>
            <p className="text-[9px] font-mono text-gray-400 tracking-widest uppercase mt-0.5">
              URBAN GROWTH SIMULATION PLATFORM
            </p>
          </div>
        </div>

        {/* Center District Dropdown Pill */}
        <div className="relative">
          <button
            onClick={() => setDistrictOpen(!districtOpen)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12193b] border border-white/15 hover:border-cyan-500/50 text-xs font-medium text-gray-200 hover:text-white transition-all shadow-sm"
          >
            <MapPin size={13} className="text-cyan-400" />
            <span>{selectedDistrict}</span>
            <ChevronDown size={13} className="text-gray-400" />
          </button>

          {districtOpen && (
            <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 w-64 bg-[#0f153a] border border-white/15 rounded-xl shadow-2xl py-1 z-50">
              {[
                'මාතලේ දිස්ත්‍රික්කය / Matale MC',
                'කුරුණෑගල දිස්ත්‍රික්කය / Kurunegala MC',
                'මහනුවර දිස්ත්‍රික්කය / Kandy MC',
              ].map((dist) => (
                <button
                  key={dist}
                  onClick={() => {
                    setSelectedDistrict(dist);
                    setDistrictOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs transition-colors ${
                    selectedDistrict === dist
                      ? 'bg-cyan-500/20 text-cyan-400 font-semibold'
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {dist}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-md shadow-blue-600/30 transition-all active:scale-95">
            <Download size={13} />
            <span>Export Master Plan (PDF / GeoTIFF)</span>
          </button>

          <div className="w-8 h-8 rounded-full bg-[#1a2350] border border-blue-400/30 flex items-center justify-center font-bold text-xs text-cyan-300">
            RS
          </div>
        </div>
      </header>

      {/* 2. MAIN 3-COLUMN WORKSPACE */}
      <div className="flex-1 grid grid-cols-[290px_1fr_320px] overflow-hidden relative">
        {/* LEFT PANEL: GIS LAYERS & SIMULATION CONTROLS */}
        <aside className="bg-[#0a0f2c]/95 border-r border-white/10 flex flex-col justify-between p-4 overflow-y-auto z-20">
          <div className="space-y-5">
            {/* GIS LAYERS */}
            <div>
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                GIS LAYERS
              </h3>
              <div className="space-y-2.5">
                {Object.values(MATALE_GIS_LAYERS).map((layer) => {
                  const isActive = activeLayers[layer.id];
                  return (
                    <div
                      key={layer.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-all"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className="w-3 h-3 rounded-sm shrink-0"
                          style={{ backgroundColor: layer.color }}
                        />
                        <div className="truncate">
                          <p className="text-xs font-medium text-white leading-tight">
                            {layer.label}
                          </p>
                          <p className="text-[10px] text-gray-400 leading-none mt-0.5">
                            {layer.sinhala}
                          </p>
                        </div>
                      </div>

                      {/* Toggle Switch */}
                      <button
                        onClick={() => toggleLayer(layer.id)}
                        className={`relative w-8 h-4 rounded-full transition-colors ${
                          isActive ? 'bg-blue-600' : 'bg-gray-700'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full transition-transform ${
                            isActive ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="h-px bg-white/10" />

            {/* PREDICTION MODEL */}
            <div>
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
                PREDICTION MODEL
              </h3>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {Object.keys(MATALE_PREDICTION_MODELS).map((modelKey) => (
                  <button
                    key={modelKey}
                    onClick={() => setSelectedModel(modelKey)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                      selectedModel === modelKey
                        ? 'bg-[#15234d] text-cyan-400 border border-cyan-500/50 shadow-sm'
                        : 'bg-white/5 text-gray-400 hover:text-white border border-transparent'
                    }`}
                  >
                    {modelKey}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                {modelInfo.description}
              </p>
            </div>

            <div className="h-px bg-white/10" />

            {/* SCENARIO PARAMETERS */}
            <div>
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                SCENARIO PARAMETERS
              </h3>

              {/* Population Growth Slider */}
              <div className="space-y-1.5 mb-3.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300">Population Growth Rate</span>
                  <span className="text-cyan-400 font-semibold">{populationGrowth}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="5.0"
                  step="0.1"
                  value={populationGrowth}
                  onChange={(e) => setPopulationGrowth(parseFloat(e.target.value))}
                  className="w-full custom-range cursor-pointer"
                />
              </div>

              {/* Road Development Weight Slider */}
              <div className="space-y-1.5 mb-3.5">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-300">Road Development Weight</span>
                  <span className="text-cyan-400 font-semibold">{roadWeight}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="1"
                  value={roadWeight === 'Low' ? 1 : roadWeight === 'Medium' ? 2 : 3}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setRoadWeight(val === 1 ? 'Low' : val === 2 ? 'Medium' : 'High');
                  }}
                  className="w-full custom-range cursor-pointer"
                />
              </div>

              {/* Scenario Presets (3 Pills) */}
              <div className="grid grid-cols-3 gap-1.5">
                {Object.keys(MATALE_SCENARIOS).map((key) => {
                  const scen = MATALE_SCENARIOS[key];
                  const isActive = selectedScenario === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handleScenarioChange(key)}
                      className={`py-1.5 px-1 rounded-lg text-[10px] font-semibold transition-all truncate text-center ${
                        isActive
                          ? 'bg-[#351c14] text-[#ff7a29] border border-[#ff7a29]/70 shadow-sm'
                          : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
                      }`}
                    >
                      {scen.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RUN SIMULATION BUTTON */}
          <div className="pt-4 border-t border-white/10">
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="w-full py-2.5 px-4 rounded-xl bg-[#0f1738] hover:bg-[#15204d] text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
            >
              {isSimulating ? (
                <>
                  <RotateCcw size={14} className="animate-spin text-cyan-400" />
                  <span>Simulating Sprawl...</span>
                </>
              ) : (
                <>
                  <Play size={13} className="fill-cyan-400 text-cyan-400" />
                  <span>Run Simulation</span>
                </>
              )}
            </button>
          </div>
        </aside>

        {/* CENTER COLUMN: INTERACTIVE MAP CANVAS */}
        <main className="relative w-full h-full overflow-hidden bg-[#070b1e]">
          <SprawlMapCanvas
            selectedYear={selectedYear}
            activeLayers={activeLayers}
            activeModel={selectedModel}
            scenarioMultiplier={MATALE_SCENARIOS[selectedScenario]?.sprawlMultiplier || 1.0}
          />
        </main>

        {/* RIGHT PANEL: METRICS & ANALYTICS */}
        <aside className="bg-[#0a0f2c]/95 border-l border-white/10 flex flex-col justify-between p-4 overflow-y-auto z-20 space-y-4">
          {/* 1. GROWTH VELOCITY */}
          <div>
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
              GROWTH VELOCITY
            </h3>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  REGIONAL GROWTH SCORE
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {currentMetrics.velocityBadge}
                </span>
              </div>
              <div className="flex items-baseline gap-1.5 my-1">
                <span className="text-2xl font-black text-white tracking-tight">
                  {currentMetrics.growthScore.split(' ')[0]}
                </span>
                <span className="text-xs text-gray-400 font-medium">km² / year</span>
              </div>
              <p className="text-[11px] text-gray-400 leading-snug mt-1 font-light">
                Matale MC — current figures along the Kandy—Dambulla (A9) road corridor.
              </p>
            </div>
          </div>

          <div className="h-px bg-white/10" />

          {/* 2. LULC DISTRIBUTION DONUT CHART */}
          <div>
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              LULC DISTRIBUTION
            </h3>
            <DoughnutChart data={currentMetrics.distribution} showCustomLegend={true} />
          </div>

          <div className="h-px bg-white/10" />

          {/* 3. TOP EXPANSION HOTSPOTS */}
          <div>
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
              TOP EXPANSION HOTSPOTS
            </h3>
            <div className="space-y-2">
              {MATALE_EXPANSION_HOTSPOTS.map((hotspot) => (
                <div
                  key={hotspot.rank}
                  className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 hover:border-white/15 transition-all"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xs font-mono font-bold text-gray-500">
                      {hotspot.rank}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-white leading-tight">
                        {hotspot.name}
                      </p>
                      <p className="text-[10px] text-gray-400 leading-none mt-0.5">
                        {hotspot.division}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#ff7a29] shrink-0">
                    {hotspot.rate}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/10" />

          {/* 4. MODEL VALIDATION */}
          <div>
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
              MODEL VALIDATION
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-xl font-black text-emerald-400">
                  {modelInfo.kappa.toFixed(2)}
                </div>
                <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">
                  KAPPA INDEX
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <div className="text-xl font-black text-cyan-400">
                  {modelInfo.accuracy}%
                </div>
                <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">
                  VALIDATION MATCH
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* 3. BOTTOM TIMELINE & SIMULATION PLAYER */}
      <footer className="h-16 bg-[#090e29] border-t border-white/10 px-6 flex items-center justify-between gap-6 shrink-0 z-30 shadow-2xl">
        {/* Play / Pause Circular Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-600/40 transition-transform active:scale-90 shrink-0"
          title={isPlaying ? 'Pause Simulation' : 'Play Simulation'}
        >
          {isPlaying ? (
            <Pause size={16} className="fill-white" />
          ) : (
            <Play size={16} className="fill-white ml-0.5" />
          )}
        </button>

        {/* Timeline Slider Track */}
        <div className="flex-1 relative flex flex-col justify-center max-w-4xl mx-auto">
          {/* Milestone Labels */}
          <div className="flex justify-between items-center text-xs font-mono mb-2 text-gray-400">
            {TIMELINE_YEARS.map((year) => {
              const isSelected = selectedYear === year;
              const isCurrent = year === 2026;
              const isPredicted = year > 2026;

              return (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`flex flex-col items-center group transition-colors ${
                    isSelected ? 'text-white font-bold scale-105' : 'hover:text-gray-200'
                  }`}
                >
                  <span className="text-xs">{year}</span>
                  {isCurrent && (
                    <span className="text-[9px] font-bold text-cyan-400 tracking-wider">
                      CURRENT
                    </span>
                  )}
                  {isPredicted && (
                    <span className="text-[9px] text-[#ff7a29] font-medium tracking-wider">
                      PREDICTED
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Timeline Bar Track */}
          <div className="relative w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            {/* Historical Orange Progress Line */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-blue-500 to-[#ff7a29] rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((TIMELINE_YEARS.indexOf(selectedYear) + 0.2) / (TIMELINE_YEARS.length - 1)) * 100
                }%`,
              }}
            />
          </div>
        </div>

        {/* Right-side Quick KPI Metrics */}
        <div className="flex items-center gap-6 shrink-0 border-l border-white/10 pl-6">
          <div className="text-right">
            <div className="text-base font-black text-[#ff7a29] leading-none">
              {currentMetrics.builtupShare}%
            </div>
            <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-1">
              BUILT-UP SHARE
            </div>
          </div>

          <div className="text-right">
            <div className="text-base font-black text-emerald-400 leading-none">
              {currentMetrics.greenCover}%
            </div>
            <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-1">
              GREEN COVER
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
