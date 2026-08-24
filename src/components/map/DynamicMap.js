'use client';
import dynamic from 'next/dynamic';

const DynamicMapContainer = dynamic(
  () => import('./MapContainer'),
  { 
    ssr: false,
    loading: () => <div className="w-full h-full bg-[#0a0e27] flex items-center justify-center">
      <div className="text-cyan-400 animate-pulse">Loading Map...</div>
    </div>
  }
);

const DynamicPolygonLayer = dynamic(() => import('./PolygonLayer'), { ssr: false });
const DynamicHeatmapLayer = dynamic(() => import('./HeatmapLayer'), { ssr: false });
const DynamicMarkerLayer = dynamic(() => import('./MarkerLayer'), { ssr: false });
const DynamicRoadLayer = dynamic(() => import('./RoadLayer'), { ssr: false });
const DynamicBuildingLayer = dynamic(() => import('./BuildingLayer'), { ssr: false });
const DynamicPinMarker = dynamic(() => import('./PinMarker'), { ssr: false });
const DynamicMapClickHandler = dynamic(() => import('./PinMarker').then(m => m.MapClickHandler), { ssr: false });

export default function DynamicMap(props) {
  return <DynamicMapContainer {...props} />;
}

export { DynamicPolygonLayer as PolygonLayer };
export { DynamicHeatmapLayer as HeatmapLayer };
export { DynamicMarkerLayer as MarkerLayer };
export { DynamicRoadLayer as RoadLayer };
export { DynamicBuildingLayer as BuildingLayer };
export { DynamicPinMarker as PinMarker };
export { DynamicMapClickHandler as MapClickHandler };

