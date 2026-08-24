// ==========================================
// Urbanscapes-LK: Land Valuation & Risk Engine
// ==========================================

export const KURUNEGALA_CBD = { lat: 7.4818, lng: 80.3609, name: 'Kurunegala Town CBD' };

// Hazard reference points / zones for Kurunegala
export const HAZARD_ZONES = {
  waterBodies: [
    { name: 'Kurunegala Lake', lat: 7.4827, lng: 80.3447, radius: 0.45 },
    { name: 'Mallawapitiya Stream & Wetland', lat: 7.4845, lng: 80.3720, radius: 0.40 },
    { name: 'Wilgoda Canal System', lat: 7.4780, lng: 80.3500, radius: 0.30 },
  ],
  slopeZones: [
    { name: 'Athugala (Elephant Rock) Slope', lat: 7.4915, lng: 80.3645, radius: 0.50 },
    { name: 'Malkaduwawa Hill Ridge', lat: 7.4720, lng: 80.3580, radius: 0.35 },
  ],
};

// Known neighborhoods with base profiles
export const KNOWN_ZONES = [
  { name: 'Kurunegala Town CBD', lat: 7.4818, lng: 80.3609, basePrice: 4200000 },
  { name: 'Wehera', lat: 7.4797, lng: 80.3557, basePrice: 2800000 },
  { name: 'Yanthampalawa', lat: 7.4767, lng: 80.3647, basePrice: 3200000 },
  { name: 'Gettuwana', lat: 7.4927, lng: 80.3617, basePrice: 1600000 },
  { name: 'Uhumiya', lat: 7.4897, lng: 80.3527, basePrice: 1800000 },
  { name: 'Malkaduwawa', lat: 7.4737, lng: 80.3697, basePrice: 1400000 },
  { name: 'Theliyagonna', lat: 7.4697, lng: 80.3597, basePrice: 1200000 },
  { name: 'Mallawapitiya', lat: 7.4847, lng: 80.3747, basePrice: 1100000 },
  { name: 'Bamunawala', lat: 7.4727, lng: 80.3477, basePrice: 2400000 },
  { name: 'Illuppugedara', lat: 7.4947, lng: 80.3547, basePrice: 950000 },
];

/**
 * Calculate distance between two lat/lng coordinates in kilometers (Haversine formula)
 */
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Determine closest neighborhood name
 */
export function getClosestZoneName(lat, lng) {
  let closest = KNOWN_ZONES[0];
  let minDistance = Infinity;

  for (const zone of KNOWN_ZONES) {
    const dist = calculateDistanceKm(lat, lng, zone.lat, zone.lng);
    if (dist < minDistance) {
      minDistance = dist;
      closest = zone;
    }
  }

  if (minDistance > 3.0) {
    return 'Kurunegala Outskirts';
  }
  return closest.name;
}

/**
 * Assess Flood & Landslide Risk based on location
 */
export function assessHazardRisks(lat, lng) {
  // Flood Risk Analysis
  let minWaterDist = Infinity;
  let nearestWater = HAZARD_ZONES.waterBodies[0];
  for (const wb of HAZARD_ZONES.waterBodies) {
    const d = calculateDistanceKm(lat, lng, wb.lat, wb.lng);
    if (d < minWaterDist) {
      minWaterDist = d;
      nearestWater = wb;
    }
  }

  let floodRisk = { level: 'Low Risk', levelSi: 'අවදානමක් නැත (Low)', color: '#22c55e', bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', factor: 0, reason: 'Safe distance from water reservations & low-lying floodplains (>400m).' };
  if (minWaterDist < 0.15) {
    floodRisk = { level: 'High Risk', levelSi: 'ඉහළ අවදානම් (High)', color: '#ef4444', bg: 'bg-rose-500/10 text-rose-400 border-rose-500/20', factor: 0.20, reason: `Located within ${Math.round(minWaterDist * 1000)}m of ${nearestWater.name} buffer. High seasonal flood risk.` };
  } else if (minWaterDist < 0.35) {
    floodRisk = { level: 'Medium Risk', levelSi: 'මධ්‍යම අවදානම් (Medium)', color: '#f59e0b', bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20', factor: 0.08, reason: `Adjacent to ${nearestWater.name} secondary drainage zone (${Math.round(minWaterDist * 1000)}m). Moderate caution advised.` };
  }

  // Landslide / Slope Risk Analysis
  let minSlopeDist = Infinity;
  let nearestSlope = HAZARD_ZONES.slopeZones[0];
  for (const sz of HAZARD_ZONES.slopeZones) {
    const d = calculateDistanceKm(lat, lng, sz.lat, sz.lng);
    if (d < minSlopeDist) {
      minSlopeDist = d;
      nearestSlope = sz;
    }
  }

  let landslideRisk = { level: 'Low Risk', levelSi: 'අවදානමක් නැත (Low)', color: '#22c55e', bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', factor: 0, reason: 'Stable flat terrain (<10° slope). NBRO safe zone.' };
  if (minSlopeDist < 0.20) {
    landslideRisk = { level: 'High Risk', levelSi: 'ඉහළ අවදානම් (High)', color: '#ef4444', bg: 'bg-rose-500/10 text-rose-400 border-rose-500/20', factor: 0.18, reason: `Steep rocky terrain adjacent to ${nearestSlope.name}. NBRO hazard clearance required.` };
  } else if (minSlopeDist < 0.45) {
    landslideRisk = { level: 'Medium Risk', levelSi: 'මධ්‍යම අවදානම් (Medium)', color: '#f59e0b', bg: 'bg-amber-500/10 text-amber-400 border-amber-500/20', factor: 0.06, reason: `Moderate slope gradient (${Math.round(minSlopeDist * 1000)}m from ${nearestSlope.name}). Retaining structure suggested.` };
  }

  const totalRiskDiscount = Math.min(0.35, floodRisk.factor + landslideRisk.factor);

  return {
    floodRisk,
    landslideRisk,
    totalRiskDiscount,
  };
}

/**
 * Predict Land Value, Assessment Tax, Future Projections, and SHAP Explainability
 */
export function predictLandValuation({
  lat = KURUNEGALA_CBD.lat,
  lng = KURUNEGALA_CBD.lng,
  perches = 10,
  landType = 'residential', // 'residential' | 'commercial' | 'agricultural'
  targetYear = 2030,
  roadWidth = '15ft', // '10ft' | '12ft' | '15ft' | '20ft' | '30+ft'
  utilities = { electricity: true, water: true },
}) {
  const currentYear = 2026;
  const distToCbd = calculateDistanceKm(lat, lng, KURUNEGALA_CBD.lat, KURUNEGALA_CBD.lng);
  const zoneName = getClosestZoneName(lat, lng);

  // 1. Base Perch Price in 2026 (Exponential Decay from CBD)
  const cbdPeakPrice = 4200000;
  const floorPrice = 650000;
  const decayRate = 0.42;
  let basePerchPrice = cbdPeakPrice * Math.exp(-decayRate * distToCbd) + floorPrice;

  // 2. Land Type Multipliers
  const typeMultipliers = {
    commercial: 1.45,
    residential: 1.00,
    agricultural: 0.42,
  };
  const typeMult = typeMultipliers[landType] || 1.0;

  // 3. Access Road Width Multipliers
  const roadMultipliers = {
    '10ft': 0.80,
    '12ft': 0.90,
    '15ft': 1.00,
    '20ft': 1.15,
    '30+ft': 1.30,
  };
  const roadMult = roadMultipliers[roadWidth] || 1.0;

  // 4. Utilities Multipliers
  let utilMult = 0.85; // Baseline with no utilities
  if (utilities.electricity && utilities.water) {
    utilMult = 1.15;
  } else if (utilities.electricity) {
    utilMult = 1.00;
  } else if (utilities.water) {
    utilMult = 0.95;
  }

  // 5. Environmental & Disaster Hazard Discount
  const { floodRisk, landslideRisk, totalRiskDiscount } = assessHazardRisks(lat, lng);
  const riskMult = Math.max(0.65, 1 - totalRiskDiscount);

  // Current (2026) Adjusted Per-Perch Price
  const currentPerchPrice = basePerchPrice * typeMult * roadMult * utilMult * riskMult;
  const currentTotalValue = currentPerchPrice * perches;

  // 6. Future Compound Growth (CAGR) to Target Year
  const annualGrowthRate = landType === 'commercial' ? 0.095 : landType === 'residential' ? 0.082 : 0.058;
  const yearsDelta = Math.max(0, targetYear - currentYear);
  const appreciationFactor = Math.pow(1 + annualGrowthRate, yearsDelta);

  const futurePerchPrice = currentPerchPrice * appreciationFactor;
  const futureTotalValue = futurePerchPrice * perches;

  // 7. Annual Municipal Assessment Tax (වරිපනම් බද්ද)
  const arvRate = 0.04;
  const taxRateOnArv = landType === 'commercial' ? 0.09 : landType === 'residential' ? 0.06 : 0.02;
  const annualTax = futureTotalValue * arvRate * taxRateOnArv;

  // 8. Yearly Trend Projection (from 2024 to targetYear)
  const projectionTimeline = [];
  const startYear = 2024;
  const maxForecastYear = Math.max(targetYear, 2030);

  for (let yr = startYear; yr <= maxForecastYear; yr++) {
    const yrDelta = yr - currentYear;
    const yrApprec = Math.pow(1 + annualGrowthRate, yrDelta);
    const yrTotalVal = currentTotalValue * yrApprec;
    const yrPerchVal = currentPerchPrice * yrApprec;

    projectionTimeline.push({
      year: yr,
      totalValue: Math.round(yrTotalVal),
      perchValue: Math.round(yrPerchVal),
      isHistorical: yr <= currentYear,
      isTarget: yr === targetYear,
    });
  }

  // 9. Explainability (SHAP-style Feature Impact Breakdown in LKR)
  const rawBaseTotal = basePerchPrice * perches;
  const typeImpact = (typeMult - 1.0) * rawBaseTotal;
  const roadImpact = (roadMult - 1.0) * rawBaseTotal;
  const utilImpact = (utilMult - 1.0) * rawBaseTotal;
  const riskImpact = -totalRiskDiscount * rawBaseTotal;
  const timeGrowthImpact = futureTotalValue - currentTotalValue;

  const shapFeatures = [
    {
      feature: `Land Type (${landType})`,
      value: Math.round(typeImpact),
      direction: typeImpact >= 0 ? 'positive' : 'negative',
    },
    {
      feature: `Road Width (${roadWidth})`,
      value: Math.round(roadImpact),
      direction: roadImpact >= 0 ? 'positive' : 'negative',
    },
    {
      feature: `Utilities (W:${utilities.water ? '✓' : '✗'} E:${utilities.electricity ? '✓' : '✗'})`,
      value: Math.round(utilImpact),
      direction: utilImpact >= 0 ? 'positive' : 'negative',
    },
    {
      feature: `Hazard (${floodRisk.level !== 'Low Risk' ? 'Flood' : ''}${landslideRisk.level !== 'Low Risk' ? ' Slope' : '' || 'Safe'})`,
      value: Math.round(riskImpact),
      direction: riskImpact >= 0 ? 'positive' : 'negative',
    },
    {
      feature: `Growth to ${targetYear} (+${yearsDelta}yr)`,
      value: Math.round(timeGrowthImpact),
      direction: 'positive',
    },
  ];

  return {
    coordinates: { lat, lng },
    zoneName,
    distToCbdKm: distToCbd.toFixed(2),
    perches,
    landType,
    roadWidth,
    utilities,
    targetYear,
    currentYear,
    annualGrowthPercent: (annualGrowthRate * 100).toFixed(1),
    currentPerchPrice: Math.round(currentPerchPrice),
    currentTotalValue: Math.round(currentTotalValue),
    futurePerchPrice: Math.round(futurePerchPrice),
    futureTotalValue: Math.round(futureTotalValue),
    annualTax: Math.round(annualTax),
    floodRisk,
    landslideRisk,
    projectionTimeline,
    shapFeatures,
  };
}
