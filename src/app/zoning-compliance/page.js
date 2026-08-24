'use client';

import { useState, useCallback, useRef } from 'react';
import DynamicMap, { PolygonLayer } from '@/components/map/DynamicMap';
import FloatingPanel from '@/components/layout/FloatingPanel';
import AlertItem from '@/components/ui/AlertItem';
import ToggleSwitch from '@/components/ui/ToggleSwitch';
import Badge from '@/components/ui/Badge';
import { BUILDING_FOOTPRINTS, ZONING_BUFFERS, COMPLIANCE_ALERTS } from '@/data/mockData';
import { ShieldAlert, ShieldCheck } from 'lucide-react';

export default function ZoningCompliancePage() {
  const [activeBuffers, setActiveBuffers] = useState({});
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const mapRef = useRef(null);

  const toggleBuffer = (id) => {
    setActiveBuffers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const buildingPolygons = BUILDING_FOOTPRINTS.map(b => ({
    id: b.id,
    coordinates: b.coordinates,
    color: b.compliant ? '#22c55e' : '#ef4444',
    fillOpacity: b.compliant ? 0.3 : 0.5,
    className: b.compliant ? '' : 'animate-pulseGlow',
    data: b
  }));

  const activeBufferPolygons = ZONING_BUFFERS.filter(zb => activeBuffers[zb.id]).map(zb => ({
    id: zb.id,
    coordinates: zb.coordinates,
    color: zb.color,
    fillOpacity: 0.15,
    data: zb
  }));

  const handleBuildingClick = useCallback((polygon) => {
    setSelectedBuilding(polygon.data);
  }, []);

  const handleAlertClick = (alert) => {
    if (mapRef.current) {
      mapRef.current.flyTo([alert.lat, alert.lng], 16);
    }
  };

  const compliantCount = BUILDING_FOOTPRINTS.filter(b => b.compliant).length;
  const violationCount = BUILDING_FOOTPRINTS.length - compliantCount;

  return (
    <div className="relative w-full h-[calc(100vh-56px)]">
      <DynamicMap mapRef={mapRef}>
        <PolygonLayer polygons={buildingPolygons} onPolygonClick={handleBuildingClick} />
        {activeBufferPolygons.length > 0 && (
          <PolygonLayer polygons={activeBufferPolygons} />
        )}
      </DynamicMap>
      <FloatingPanel position="right" title="Compliance Monitor">
        <div className="flex gap-2 mb-6">
          <Badge variant="success" icon={<ShieldCheck size={14} />}>
            {compliantCount} Compliant
          </Badge>
          <Badge variant="danger" icon={<ShieldAlert size={14} />}>
            {violationCount} Violations
          </Badge>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-white/80 mb-3 uppercase tracking-wider">Zoning Overlay Toggles</h3>
          <div className="space-y-3">
            {ZONING_BUFFERS.map(buffer => (
              <div key={buffer.id} className="flex justify-between items-center">
                <span className="text-sm text-white/90">{buffer.name}</span>
                <ToggleSwitch 
                  checked={!!activeBuffers[buffer.id]} 
                  onChange={() => toggleBuffer(buffer.id)} 
                />
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-white/10 my-6" />

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-white/80 mb-3 uppercase tracking-wider">Recent Alerts</h3>
          <div className="space-y-2">
            {COMPLIANCE_ALERTS.map(alert => (
              <div key={alert.id} onClick={() => handleAlertClick(alert)} className="cursor-pointer">
                <AlertItem alert={alert} />
              </div>
            ))}
          </div>
        </div>

        {selectedBuilding && !selectedBuilding.compliant && (
          <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
            <h4 className="font-semibold text-white mb-2">Verification Card</h4>
            <div className="text-sm text-white/70 space-y-1 mb-3">
              <p>Building ID: {selectedBuilding.id}</p>
              <p>Type: {selectedBuilding.type}</p>
              <p>Permit ID: {selectedBuilding.permitId || 'N/A'}</p>
            </div>
            
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span>IoU Score</span>
                <span>{selectedBuilding.iouScore}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${selectedBuilding.iouScore > 0.7 ? 'bg-green-500' : selectedBuilding.iouScore < 0.5 ? 'bg-red-500' : 'bg-amber-500'}`}
                  style={{ width: `${selectedBuilding.iouScore * 100}%` }}
                />
              </div>
            </div>

            <p className="text-xs text-red-400 bg-red-400/10 p-2 rounded">
              Violation: {selectedBuilding.violationDescription || 'Non-compliant building footprint detected.'}
            </p>
          </div>
        )}
      </FloatingPanel>
    </div>
  );
}
