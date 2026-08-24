'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import DynamicMap, { HeatmapLayer, MarkerLayer } from '@/components/map/DynamicMap';
import FloatingPanel from '@/components/layout/FloatingPanel';
import SliderControl from '@/components/ui/SliderControl';
import Badge from '@/components/ui/Badge';
import { SUITABILITY_GRID, AHP_DEFAULTS, OPTIMAL_LOCATION } from '@/data/mockData';
import { Construction, Zap, MapPin, BarChart3, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InfrastructurePage() {
  const [weights, setWeights] = useState({
    roadAccess: 30,
    populationDensity: 25,
    hydrologyRisk: 20,
    landCost: 15,
    environmentalImpact: 10
  });
  const [algorithm, setAlgorithm] = useState('ga'); // 'ga' | 'pso'
  const [isRunning, setIsRunning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleWeightChange = useCallback((key, newValue) => {
    setWeights(prevWeights => {
      const newWeights = { ...prevWeights, [key]: newValue };
      const total = Object.values(newWeights).reduce((s, v) => s + v, 0);
      if (total > 0) {
        const normalized = {};
        for (const [k, v] of Object.entries(newWeights)) {
          normalized[k] = Math.round((v / total) * 100);
        }
        
        // Adjust for rounding errors to ensure exact sum is 100
        const newTotal = Object.values(normalized).reduce((s, v) => s + v, 0);
        if (newTotal !== 100) {
           const diff = 100 - newTotal;
           // Add diff to the largest weight to minimize relative change
           const maxKey = Object.keys(normalized).reduce((a, b) => normalized[a] > normalized[b] ? a : b);
           normalized[maxKey] += diff;
        }

        return normalized;
      }
      return prevWeights;
    });
  }, []);

  const runOptimization = () => {
    setIsRunning(true);
    setShowResult(false);
    setProgress(0);

    let currentProgress = 0;
    
    intervalRef.current = setInterval(() => {
      currentProgress += Math.random() * 5 + 2; // Random increment between 2 and 7
      
      if (currentProgress >= 100) {
        clearInterval(intervalRef.current);
        setProgress(100);
        setIsRunning(false);
        setShowResult(true);
      } else {
        setProgress(currentProgress);
      }
    }, 100);
  };

  const criteriaMap = [
    { key: 'roadAccess', label: 'Road Access', score: 0.96 },
    { key: 'populationDensity', label: 'Population Density', score: 0.92 },
    { key: 'hydrologyRisk', label: 'Hydrology Risk', score: 0.88 },
    { key: 'landCost', label: 'Land Cost', score: 0.91 },
    { key: 'environmentalImpact', label: 'Environmental Impact', score: 0.97 }
  ];

  const getScoreColor = (score) => {
    if (score > 0.9) return 'bg-green-500';
    if (score > 0.7) return 'bg-cyan-500';
    return 'bg-amber-500';
  };

  const getScoreTextColor = (score) => {
    if (score > 0.9) return 'text-green-500';
    if (score > 0.7) return 'text-cyan-500';
    return 'text-amber-500';
  };

  const suitabilityPoints = useMemo(() => {
     return SUITABILITY_GRID || [];
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-56px)] overflow-hidden bg-[#0a0e27]">
      <DynamicMap>
        {suitabilityPoints.length > 0 && <HeatmapLayer points={suitabilityPoints} />}
        {showResult && OPTIMAL_LOCATION && (
          <MarkerLayer
            markers={[{ lat: OPTIMAL_LOCATION.lat, lng: OPTIMAL_LOCATION.lng, label: 'Optimal Site' }]}
            glowing={true}
          />
        )}
      </DynamicMap>

      <FloatingPanel position="right" title="Infrastructure Optimizer" icon={<Construction className="w-5 h-5 text-cyan-400" />}>
        {/* AHP Criteria Weights */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider">AHP Criteria Weights</h3>
            <Badge variant="outline" className="text-xs border-white/20 bg-white/5">
              Total: {Object.values(weights).reduce((a, b) => a + b, 0)}%
            </Badge>
          </div>
          
          <div className="space-y-4">
            <SliderControl
              label="Road Access"
              value={weights.roadAccess}
              min={0}
              max={100}
              step={1}
              unit="%"
              onChange={(v) => handleWeightChange('roadAccess', v)}
            />
            <SliderControl
              label="Population Density"
              value={weights.populationDensity}
              min={0}
              max={100}
              step={1}
              unit="%"
              onChange={(v) => handleWeightChange('populationDensity', v)}
            />
            <SliderControl
              label="Hydrology Risk"
              value={weights.hydrologyRisk}
              min={0}
              max={100}
              step={1}
              unit="%"
              onChange={(v) => handleWeightChange('hydrologyRisk', v)}
            />
            <SliderControl
              label="Land Cost"
              value={weights.landCost}
              min={0}
              max={100}
              step={1}
              unit="%"
              onChange={(v) => handleWeightChange('landCost', v)}
            />
            <SliderControl
              label="Environmental Impact"
              value={weights.environmentalImpact}
              min={0}
              max={100}
              step={1}
              unit="%"
              onChange={(v) => handleWeightChange('environmentalImpact', v)}
            />
          </div>
        </div>

        <div className="h-px bg-white/10 w-full my-6"></div>

        {/* Algorithm Selection */}
        <div className="space-y-4 mb-6">
          <h3 className="text-sm font-semibold text-white/90 uppercase tracking-wider">Algorithm Selection</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setAlgorithm('ga')}
              className={`py-2 px-3 rounded-xl border transition-all text-sm font-medium flex items-center justify-center ${
                algorithm === 'ga'
                  ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300 shadow-[0_0_10px_rgba(0,212,255,0.2)]'
                  : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              Genetic Algorithm (GA)
            </button>
            <button
              onClick={() => setAlgorithm('pso')}
              className={`py-2 px-3 rounded-xl border transition-all text-sm font-medium flex items-center justify-center ${
                algorithm === 'pso'
                  ? 'border-purple-500 bg-purple-500/20 text-purple-300 shadow-[0_0_10px_rgba(124,58,237,0.2)]'
                  : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              Particle Swarm (PSO)
            </button>
          </div>
        </div>

        <div className="h-px bg-white/10 w-full my-6"></div>

        {/* Run Optimization Button */}
        <div className="relative mb-6">
          <button
            onClick={runOptimization}
            disabled={isRunning}
            className={`w-full py-3.5 rounded-xl flex items-center justify-center font-bold text-white shadow-lg transition-all ${
              isRunning 
                ? 'bg-white/10 border border-white/20 cursor-not-allowed opacity-80' 
                : 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 active:scale-[0.98] border border-white/10'
            }`}
          >
            {isRunning ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin text-cyan-400" />
                <span>Optimizing...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2" />
                <span>Run Optimization</span>
              </>
            )}
          </button>
          
          {isRunning && (
            <div className="mt-4 h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Results */}
        <AnimatePresence>
          {showResult && OPTIMAL_LOCATION && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 rounded-xl backdrop-blur-xl bg-white/5 border border-cyan-500/30 shadow-[0_0_20px_rgba(0,212,255,0.15)] relative overflow-hidden">
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                
                <div className="flex items-start justify-between mb-5 relative z-10">
                  <div>
                    <h4 className="text-white font-medium flex items-center text-sm uppercase tracking-wider mb-1">
                      <MapPin className="w-4 h-4 mr-2 text-cyan-400" />
                      Optimal Location Found
                    </h4>
                    <div className="text-sm text-cyan-200/80 font-mono bg-cyan-950/40 px-2 py-1 rounded inline-block border border-cyan-500/20">
                      {OPTIMAL_LOCATION.lat.toFixed(4)}, {OPTIMAL_LOCATION.lng.toFixed(4)}
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center w-14 h-14 rounded-full border-2 border-green-500 bg-green-500/10 relative shadow-[0_0_15px_rgba(34,197,94,0.3)] shrink-0">
                     <span className="text-white font-bold text-lg">0.94</span>
                  </div>
                </div>

                <div className="space-y-3.5 relative z-10">
                  <div className="text-xs text-white/60 mb-2 flex items-center uppercase tracking-wider">
                    <BarChart3 className="w-3.5 h-3.5 mr-1.5" /> Score Breakdown
                  </div>
                  {criteriaMap.map((criteria) => (
                    <div key={criteria.key} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-white/80">{criteria.label}</span>
                        <span className={getScoreTextColor(criteria.score)}>{criteria.score.toFixed(2)}</span>
                      </div>
                      <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden border border-white/5">
                        <div 
                          className={`h-full rounded-full ${getScoreColor(criteria.score)} shadow-[0_0_5px_currentColor]`}
                          style={{ width: `${criteria.score * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPanel>
    </div>
  );
}
