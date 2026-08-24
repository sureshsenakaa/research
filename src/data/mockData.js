// ==========================================
// Urbanscapes-LK: Mock Data
// All simulated data for demo/presentation
// ==========================================

export const KURUNEGALA_CENTER = [7.4818, 80.3609];
export const MATALE_CENTER = [7.4675, 80.6234];

// ==========================================
// Component 1: Urban Sprawl & LULC Data (Matale MC)
// ==========================================

export const MATALE_GIS_LAYERS = {
  builtup: { id: 'builtup', label: 'Built-up Areas', sinhala: 'නාගරික කලාප', color: '#ff7a29', defaultActive: true },
  vegetation: { id: 'vegetation', label: 'Green Cover', sinhala: 'වනාන්තර / ගස්', color: '#22c55e', defaultActive: true },
  water: { id: 'water', label: 'Water & Wetlands', sinhala: 'ජලාශ සහ තෙත්බිම්', color: '#00d4ff', defaultActive: true },
  roads: { id: 'roads', label: 'Road Network', sinhala: 'ප්‍රධාන පාරවල්', color: '#cbd5e1', defaultActive: true },
};

export const MATALE_PREDICTION_MODELS = {
  'CA-Markov': {
    id: 'CA-Markov',
    name: 'CA-Markov',
    description: 'Cellular automata + Markov chain transition matrix — best for rule-based sprawl along existing corridors.',
    kappa: 0.87,
    accuracy: 91.2,
  },
  'ConvLSTM': {
    id: 'ConvLSTM',
    name: 'ConvLSTM',
    description: 'Deep spatiotemporal recurrent convolutional network — captures non-linear spatial dependencies and rapid sprawl.',
    kappa: 0.89,
    accuracy: 93.6,
  },
};

export const MATALE_SCENARIOS = {
  standard: { id: 'standard', name: 'Standard', popGrowth: 2.1, roadWeight: 'Medium', sprawlMultiplier: 1.0 },
  highSprawl: { id: 'highSprawl', name: 'High Sprawl', popGrowth: 3.8, roadWeight: 'High', sprawlMultiplier: 1.35 },
  managed: { id: 'managed', name: 'Managed Growth', popGrowth: 1.4, roadWeight: 'Low', sprawlMultiplier: 0.75 },
};

export const MATALE_EXPANSION_HOTSPOTS = [
  { rank: '01', name: 'Ukuwela', division: 'GN Division • 2026', rate: '+3.4 km²/yr', coords: [7.4420, 80.6150], color: '#ff7a29' },
  { rank: '02', name: 'Rattota', division: 'GN Division • 2026', rate: '+2.9 km²/yr', coords: [7.4720, 80.6550], color: '#ff7a29' },
  { rank: '03', name: 'Aluvihare', division: 'GN Division • 2026', rate: '+2.1 km²/yr', coords: [7.4900, 80.6300], color: '#ff7a29' },
];

export const MATALE_YEAR_METRICS = {
  2015: {
    year: 2015,
    builtupShare: 24.5,
    greenCover: 56.2,
    waterShare: 9.8,
    bareLandShare: 9.5,
    growthScore: '4.2 km² / year',
    velocityBadge: 'MODERATE',
    isPredicted: false,
    distribution: [
      { name: 'Built-up', value: 24.5, color: '#ff7a29' },
      { name: 'Vegetation', value: 56.2, color: '#22c55e' },
      { name: 'Water', value: 9.8, color: '#00d4ff' },
      { name: 'Bare Land', value: 9.5, color: '#facc15' },
    ]
  },
  2020: {
    year: 2020,
    builtupShare: 31.8,
    greenCover: 48.7,
    waterShare: 9.6,
    bareLandShare: 9.9,
    growthScore: '6.5 km² / year',
    velocityBadge: 'ACCELERATING',
    isPredicted: false,
    distribution: [
      { name: 'Built-up', value: 31.8, color: '#ff7a29' },
      { name: 'Vegetation', value: 48.7, color: '#22c55e' },
      { name: 'Water', value: 9.6, color: '#00d4ff' },
      { name: 'Bare Land', value: 9.9, color: '#facc15' },
    ]
  },
  2026: {
    year: 2026,
    builtupShare: 38.2,
    greenCover: 41.6,
    waterShare: 9.4,
    bareLandShare: 10.8,
    growthScore: '8.4 km² / year',
    velocityBadge: 'HIGH VELOCITY',
    isPredicted: false,
    distribution: [
      { name: 'Built-up', value: 38.2, color: '#ff7a29' },
      { name: 'Vegetation', value: 41.6, color: '#22c55e' },
      { name: 'Water', value: 9.4, color: '#00d4ff' },
      { name: 'Bare Land', value: 10.8, color: '#facc15' },
    ]
  },
  2030: {
    year: 2030,
    builtupShare: 45.4,
    greenCover: 34.8,
    waterShare: 9.2,
    bareLandShare: 10.6,
    growthScore: '10.2 km² / year',
    velocityBadge: 'VERY HIGH',
    isPredicted: true,
    distribution: [
      { name: 'Built-up', value: 45.4, color: '#ff7a29' },
      { name: 'Vegetation', value: 34.8, color: '#22c55e' },
      { name: 'Water', value: 9.2, color: '#00d4ff' },
      { name: 'Bare Land', value: 10.6, color: '#facc15' },
    ]
  },
  2035: {
    year: 2035,
    builtupShare: 52.8,
    greenCover: 28.1,
    waterShare: 9.0,
    bareLandShare: 10.1,
    growthScore: '12.6 km² / year',
    velocityBadge: 'CRITICAL EXPANSION',
    isPredicted: true,
    distribution: [
      { name: 'Built-up', value: 52.8, color: '#ff7a29' },
      { name: 'Vegetation', value: 28.1, color: '#22c55e' },
      { name: 'Water', value: 9.0, color: '#00d4ff' },
      { name: 'Bare Land', value: 10.1, color: '#facc15' },
    ]
  },
};

// Matale Sprawl GIS shapes
export const MATALE_MAP_FEATURES = {
  townCenter: { name: 'Matale Town', coords: [7.4675, 80.6234] },
  reservoir: {
    name: 'Bowatenna Reservoir',
    coords: [
      [7.4920, 80.5980], [7.4960, 80.6080], [7.4910, 80.6190],
      [7.4810, 80.6200], [7.4780, 80.6050], [7.4840, 80.5950]
    ],
    color: '#06b6d4',
  },
  greenCover: [
    [7.4350, 80.5850], [7.4600, 80.5750], [7.5050, 80.5850],
    [7.5250, 80.6250], [7.5100, 80.6750], [7.4750, 80.6900],
    [7.4350, 80.6750], [7.4150, 80.6300], [7.4200, 80.5950]
  ],
  roadCorridors: [
    { id: 'A9', name: 'Kandy - Dambulla (A9) Corridor', coords: [[7.4200, 80.5850], [7.4450, 80.6050], [7.4675, 80.6234], [7.4950, 80.6450], [7.5250, 80.6700]], width: 3, color: '#cbd5e1' },
    { id: 'RattotaRd', name: 'Matale - Rattota Link', coords: [[7.4675, 80.6234], [7.4700, 80.6400], [7.4720, 80.6550], [7.4750, 80.6800]], width: 2, color: '#94a3b8' },
    { id: 'UkuwelaRd', name: 'Ukuwela Bypass', coords: [[7.4675, 80.6234], [7.4550, 80.6180], [7.4420, 80.6150], [7.4300, 80.6050]], width: 2, color: '#94a3b8' },
    { id: 'CrossAxis', name: 'East-West Regional Corridor', coords: [[7.4350, 80.6650], [7.4550, 80.6400], [7.4675, 80.6234], [7.4800, 80.6000], [7.5000, 80.5800]], width: 2.5, color: '#cbd5e1' }
  ],
  // Year-wise urban sprawl polygons
  sprawlByYear: {
    2015: [
      { id: 'core', coords: [[7.4720, 80.6180], [7.4730, 80.6280], [7.4620, 80.6300], [7.4610, 80.6190]], color: '#ff7a29', opacity: 0.5 },
    ],
    2020: [
      { id: 'core', coords: [[7.4760, 80.6150], [7.4780, 80.6320], [7.4680, 80.6360], [7.4580, 80.6250], [7.4600, 80.6130]], color: '#ff7a29', opacity: 0.55 },
      { id: 'north_lobe', coords: [[7.4820, 80.6160], [7.4850, 80.6240], [7.4780, 80.6280], [7.4760, 80.6200]], color: '#ff7a29', opacity: 0.5 },
    ],
    2026: [
      // Multi-lobed central sprawl matching the design image
      { id: 'central_core', coords: [[7.4800, 80.6120], [7.4830, 80.6220], [7.4780, 80.6340], [7.4650, 80.6380], [7.4550, 80.6320], [7.4520, 80.6200], [7.4600, 80.6100], [7.4720, 80.6080]], color: '#ff7a29', opacity: 0.65 },
      { id: 'north_sprawl', coords: [[7.4830, 80.6150], [7.4900, 80.6230], [7.4860, 80.6300], [7.4790, 80.6250]], color: '#f97316', opacity: 0.6 },
      { id: 'south_lobe', coords: [[7.4560, 80.6180], [7.4510, 80.6260], [7.4440, 80.6210], [7.4480, 80.6120]], color: '#ea580c', opacity: 0.6 },
      { id: 'east_subzone', coords: [[7.4730, 80.6380], [7.4800, 80.6480], [7.4750, 80.6560], [7.4660, 80.6490]], color: '#ef4444', opacity: 0.55 },
      { id: 'northeast_subzone', coords: [[7.4800, 80.6500], [7.4840, 80.6660], [7.4770, 80.6720], [7.4720, 80.6580]], color: '#6366f1', opacity: 0.45 },
      { id: 'rattota_lobe', coords: [[7.4670, 80.6500], [7.4730, 80.6620], [7.4620, 80.6650], [7.4580, 80.6540]], color: '#ef4444', opacity: 0.6 },
    ],
    2030: [
      { id: 'central_core', coords: [[7.4850, 80.6080], [7.4890, 80.6240], [7.4820, 80.6400], [7.4670, 80.6440], [7.4500, 80.6380], [7.4460, 80.6180], [7.4550, 80.6040], [7.4750, 80.6020]], color: '#ff7a29', opacity: 0.7 },
      { id: 'north_sprawl', coords: [[7.4870, 80.6120], [7.4950, 80.6250], [7.4900, 80.6350], [7.4820, 80.6280]], color: '#f97316', opacity: 0.65 },
      { id: 'south_lobe', coords: [[7.4520, 80.6160], [7.4470, 80.6280], [7.4380, 80.6220], [7.4420, 80.6080]], color: '#ea580c', opacity: 0.65 },
      { id: 'east_subzone', coords: [[7.4750, 80.6360], [7.4840, 80.6520], [7.4780, 80.6620], [7.4640, 80.6540]], color: '#ef4444', opacity: 0.65 },
      { id: 'northeast_subzone', coords: [[7.4820, 80.6480], [7.4880, 80.6700], [7.4800, 80.6780], [7.4740, 80.6620]], color: '#6366f1', opacity: 0.55 },
      { id: 'rattota_lobe', coords: [[7.4690, 80.6480], [7.4770, 80.6660], [7.4600, 80.6700], [7.4550, 80.6520]], color: '#ef4444', opacity: 0.7 },
    ],
    2035: [
      { id: 'central_core', coords: [[7.4900, 80.6040], [7.4950, 80.6260], [7.4860, 80.6460], [7.4700, 80.6500], [7.4450, 80.6440], [7.4400, 80.6140], [7.4500, 80.5980], [7.4780, 80.5960]], color: '#ff7a29', opacity: 0.75 },
      { id: 'north_sprawl', coords: [[7.4920, 80.6080], [7.5020, 80.6280], [7.4950, 80.6400], [7.4860, 80.6320]], color: '#f97316', opacity: 0.7 },
      { id: 'south_lobe', coords: [[7.4480, 80.6120], [7.4420, 80.6300], [7.4320, 80.6240], [7.4360, 80.6040]], color: '#ea580c', opacity: 0.7 },
      { id: 'east_subzone', coords: [[7.4780, 80.6340], [7.4880, 80.6560], [7.4820, 80.6680], [7.4620, 80.6580]], color: '#ef4444', opacity: 0.75 },
      { id: 'northeast_subzone', coords: [[7.4850, 80.6460], [7.4920, 80.6740], [7.4840, 80.6840], [7.4760, 80.6660]], color: '#6366f1', opacity: 0.65 },
      { id: 'rattota_lobe', coords: [[7.4720, 80.6460], [7.4820, 80.6700], [7.4580, 80.6760], [7.4500, 80.6500]], color: '#ef4444', opacity: 0.8 },
    ],
  },
  scatterDots: [
    [7.4400, 80.5900], [7.4500, 80.5820], [7.4800, 80.5850], [7.5100, 80.6000],
    [7.5200, 80.6300], [7.5050, 80.6600], [7.4880, 80.6800], [7.4450, 80.6800],
    [7.4250, 80.6500], [7.4200, 80.6100], [7.4350, 80.6350], [7.4600, 80.6700],
    [7.4950, 80.6050], [7.5050, 80.6350], [7.4700, 80.5900], [7.4300, 80.5950],
  ]
};

export const LULC_CATEGORIES = {
  urban: { label: 'Urban/Built-up', color: '#ff7a29' },
  vegetation: { label: 'Vegetation', color: '#22c55e' },
  water: { label: 'Water Bodies', color: '#00d4ff' },
  agriculture: { label: 'Agriculture', color: '#fcc419' },
  barren: { label: 'Barren Land', color: '#adb5bd' },
};

export const GROWTH_TREND_DATA = [
  { year: 2015, urbanArea: 142.5, predicted: false },
  { year: 2016, urbanArea: 148.2, predicted: false },
  { year: 2017, urbanArea: 155.1, predicted: false },
  { year: 2018, urbanArea: 161.8, predicted: false },
  { year: 2019, urbanArea: 170.3, predicted: false },
  { year: 2020, urbanArea: 178.6, predicted: false },
  { year: 2021, urbanArea: 184.2, predicted: false },
  { year: 2022, urbanArea: 192.7, predicted: false },
  { year: 2023, urbanArea: 199.5, predicted: false },
  { year: 2024, urbanArea: 208.1, predicted: false },
  { year: 2025, urbanArea: 215.3, predicted: false },
  { year: 2026, urbanArea: 223.8, predicted: false },
  { year: 2027, urbanArea: 232.1, predicted: true },
  { year: 2028, urbanArea: 241.5, predicted: true },
  { year: 2029, urbanArea: 250.8, predicted: true },
  { year: 2030, urbanArea: 261.2, predicted: true },
  { year: 2031, urbanArea: 270.4, predicted: true },
  { year: 2032, urbanArea: 280.9, predicted: true },
  { year: 2033, urbanArea: 290.1, predicted: true },
  { year: 2034, urbanArea: 300.6, predicted: true },
  { year: 2035, urbanArea: 312.4, predicted: true },
];

// LULC zones for different years (polygon coordinates around Kurunegala)
export const LULC_ZONES = {
  2015: [
    { type: 'urban', coords: [[7.4897, 80.3447], [7.4897, 80.3697], [7.4747, 80.3697], [7.4747, 80.3447]] },
    { type: 'urban', coords: [[7.4697, 80.3547], [7.4697, 80.3797], [7.4547, 80.3797], [7.4547, 80.3547]] },
    { type: 'vegetation', coords: [[7.4997, 80.3297], [7.4997, 80.3497], [7.4897, 80.3497], [7.4897, 80.3297]] },
    { type: 'vegetation', coords: [[7.5147, 80.3597], [7.5147, 80.3897], [7.4997, 80.3897], [7.4997, 80.3597]] },
    { type: 'water', coords: [[7.4797, 80.3397], [7.4797, 80.3477], [7.4747, 80.3477], [7.4747, 80.3397]] },
    { type: 'agriculture', coords: [[7.5047, 80.3197], [7.5047, 80.3397], [7.4947, 80.3397], [7.4947, 80.3197]] },
  ],
  2020: [
    { type: 'urban', coords: [[7.4947, 80.3397], [7.4947, 80.3747], [7.4697, 80.3747], [7.4697, 80.3397]] },
    { type: 'urban', coords: [[7.4697, 80.3497], [7.4697, 80.3897], [7.4497, 80.3897], [7.4497, 80.3497]] },
    { type: 'urban', coords: [[7.4997, 80.3297], [7.4997, 80.3497], [7.4947, 80.3497], [7.4947, 80.3297]] },
    { type: 'vegetation', coords: [[7.5147, 80.3597], [7.5147, 80.3897], [7.5047, 80.3897], [7.5047, 80.3597]] },
    { type: 'water', coords: [[7.4797, 80.3397], [7.4797, 80.3477], [7.4747, 80.3477], [7.4747, 80.3397]] },
    { type: 'agriculture', coords: [[7.5097, 80.3147], [7.5097, 80.3347], [7.4997, 80.3347], [7.4997, 80.3147]] },
  ],
  2026: [
    { type: 'urban', coords: [[7.4997, 80.3347], [7.4997, 80.3797], [7.4647, 80.3797], [7.4647, 80.3347]] },
    { type: 'urban', coords: [[7.4647, 80.3447], [7.4647, 80.3947], [7.4447, 80.3947], [7.4447, 80.3447]] },
    { type: 'urban', coords: [[7.5047, 80.3247], [7.5047, 80.3547], [7.4997, 80.3547], [7.4997, 80.3247]] },
    { type: 'vegetation', coords: [[7.5167, 80.3647], [7.5167, 80.3897], [7.5097, 80.3897], [7.5097, 80.3647]] },
    { type: 'water', coords: [[7.4797, 80.3397], [7.4797, 80.3477], [7.4747, 80.3477], [7.4747, 80.3397]] },
    { type: 'agriculture', coords: [[7.5127, 80.3097], [7.5127, 80.3297], [7.5047, 80.3297], [7.5047, 80.3097]] },
  ],
  2030: [
    { type: 'urban', coords: [[7.5047, 80.3297], [7.5047, 80.3847], [7.4597, 80.3847], [7.4597, 80.3297]] },
    { type: 'urban', coords: [[7.4597, 80.3397], [7.4597, 80.3997], [7.4397, 80.3997], [7.4397, 80.3397]] },
    { type: 'urban', coords: [[7.5097, 80.3197], [7.5097, 80.3597], [7.5047, 80.3597], [7.5047, 80.3197]] },
    { type: 'vegetation', coords: [[7.5197, 80.3697], [7.5197, 80.3897], [7.5147, 80.3897], [7.5147, 80.3697]] },
    { type: 'water', coords: [[7.4797, 80.3397], [7.4797, 80.3477], [7.4747, 80.3477], [7.4747, 80.3397]] },
    { type: 'agriculture', coords: [[7.5167, 80.3077], [7.5167, 80.3247], [7.5097, 80.3247], [7.5097, 80.3077]] },
  ],
  2035: [
    { type: 'urban', coords: [[7.5097, 80.3247], [7.5097, 80.3897], [7.4547, 80.3897], [7.4547, 80.3247]] },
    { type: 'urban', coords: [[7.4547, 80.3347], [7.4547, 80.4047], [7.4347, 80.4047], [7.4347, 80.3347]] },
    { type: 'urban', coords: [[7.5147, 80.3147], [7.5147, 80.3647], [7.5097, 80.3647], [7.5097, 80.3147]] },
    { type: 'vegetation', coords: [[7.5227, 80.3747], [7.5227, 80.3877], [7.5177, 80.3877], [7.5177, 80.3747]] },
    { type: 'water', coords: [[7.4797, 80.3397], [7.4797, 80.3477], [7.4747, 80.3477], [7.4747, 80.3397]] },
    { type: 'agriculture', coords: [[7.5197, 80.3047], [7.5197, 80.3197], [7.5127, 80.3197], [7.5127, 80.3047]] },
  ],
};

// ==========================================
// Component 2: Zoning Compliance
// ==========================================

export const BUILDING_FOOTPRINTS = [
  // Compliant buildings
  { id: 'B001', coords: [[7.4832, 80.3577], [7.4832, 80.3587], [7.4825, 80.3587], [7.4825, 80.3577]], isCompliant: true, type: 'Residential', permitId: 'UDA-2024-1201', iou: 0.94 },
  { id: 'B002', coords: [[7.4857, 80.3617], [7.4857, 80.3632], [7.4847, 80.3632], [7.4847, 80.3617]], isCompliant: true, type: 'Commercial', permitId: 'UDA-2024-1185', iou: 0.91 },
  { id: 'B003', coords: [[7.4797, 80.3552], [7.4797, 80.3567], [7.4789, 80.3567], [7.4789, 80.3552]], isCompliant: true, type: 'Residential', permitId: 'UDA-2023-0987', iou: 0.88 },
  { id: 'B004', coords: [[7.4877, 80.3647], [7.4877, 80.3662], [7.4869, 80.3662], [7.4869, 80.3647]], isCompliant: true, type: 'Mixed Use', permitId: 'UDA-2024-1340', iou: 0.96 },
  { id: 'B005', coords: [[7.4747, 80.3587], [7.4747, 80.3602], [7.4739, 80.3602], [7.4739, 80.3587]], isCompliant: true, type: 'Industrial', permitId: 'UDA-2023-0845', iou: 0.89 },
  { id: 'B006', coords: [[7.4892, 80.3537], [7.4892, 80.3552], [7.4885, 80.3552], [7.4885, 80.3537]], isCompliant: true, type: 'Residential', permitId: 'UDA-2024-1412', iou: 0.92 },
  { id: 'B007', coords: [[7.4765, 80.3627], [7.4765, 80.3639], [7.4757, 80.3639], [7.4757, 80.3627]], isCompliant: true, type: 'Residential', permitId: 'UDA-2023-1102', iou: 0.90 },
  // Non-compliant buildings
  { id: 'B008', coords: [[7.4815, 80.3507], [7.4815, 80.3525], [7.4805, 80.3525], [7.4805, 80.3507]], isCompliant: false, type: 'Unauthorized', permitId: null, iou: 0.12, violation: 'No UDA permit found. Structure within 10m lake reservation buffer.' },
  { id: 'B009', coords: [[7.4842, 80.3697], [7.4842, 80.3715], [7.4832, 80.3715], [7.4832, 80.3697]], isCompliant: false, type: 'Residential', permitId: 'UDA-2022-0654', iou: 0.38, violation: 'Footprint exceeds approved boundary by 62%. Encroaches wetland zone.' },
  { id: 'B010', coords: [[7.4727, 80.3557], [7.4727, 80.3572], [7.4719, 80.3572], [7.4719, 80.3557]], isCompliant: false, type: 'Commercial', permitId: 'UDA-2023-0412', iou: 0.45, violation: 'Building height exceeds permitted 3 stories. Steep slope zone violation.' },
  { id: 'B011', coords: [[7.4902, 80.3677], [7.4902, 80.3695], [7.4892, 80.3695], [7.4892, 80.3677]], isCompliant: false, type: 'Unauthorized', permitId: null, iou: 0.05, violation: 'Unauthorized construction in UDA restricted zone. No permit on record.' },
  { id: 'B012', coords: [[7.4779, 80.3477], [7.4779, 80.3492], [7.4772, 80.3492], [7.4772, 80.3477]], isCompliant: false, type: 'Residential', permitId: 'UDA-2024-0201', iou: 0.52, violation: 'Setback violation. Structure built 2m from boundary instead of required 5m.' },
];

export const ZONING_BUFFERS = [
  { id: 'Z001', label: 'Lake Reservation (10m)', color: '#339af0', coords: [[7.4827, 80.3377], [7.4827, 80.3517], [7.4727, 80.3517], [7.4727, 80.3377]] },
  { id: 'Z002', label: 'Wetland Protection', color: '#20c997', coords: [[7.4867, 80.3677], [7.4867, 80.3777], [7.4807, 80.3777], [7.4807, 80.3677]] },
  { id: 'Z003', label: 'Steep Slope Zone', color: '#f76707', coords: [[7.4747, 80.3517], [7.4747, 80.3617], [7.4687, 80.3617], [7.4687, 80.3517]] },
  { id: 'Z004', label: 'Heritage Buffer', color: '#ae3ec9', coords: [[7.4897, 80.3547], [7.4897, 80.3617], [7.4847, 80.3617], [7.4847, 80.3547]] },
];

export const COMPLIANCE_ALERTS = [
  { id: 'A001', buildingId: 'B008', severity: 'critical', location: 'Lake Reservation Zone, Kurunegala Lake', message: 'Unauthorized structure within 10m lake buffer', lat: 7.4810, lng: 80.3516, iou: 0.12, timestamp: '2026-07-27T14:32:00' },
  { id: 'A002', buildingId: 'B009', severity: 'high', location: 'Wetland Zone, Mallawapitiya', message: 'Footprint exceeds approved plan by 62%', lat: 7.4837, lng: 80.3706, iou: 0.38, timestamp: '2026-07-27T12:15:00' },
  { id: 'A003', buildingId: 'B011', severity: 'critical', location: 'UDA Restricted, Gettuwana', message: 'No permit found for detected structure', lat: 7.4897, lng: 80.3686, iou: 0.05, timestamp: '2026-07-27T10:48:00' },
  { id: 'A004', buildingId: 'B010', severity: 'medium', location: 'Steep Slope, Malkaduwawa', message: 'Height exceeds 3-story limit', lat: 7.4723, lng: 80.3564, iou: 0.45, timestamp: '2026-07-26T16:22:00' },
  { id: 'A005', buildingId: 'B012', severity: 'medium', location: 'Residential Zone, Wilgoda', message: 'Setback violation: 2m instead of 5m', lat: 7.4775, lng: 80.3484, iou: 0.52, timestamp: '2026-07-26T09:10:00' },
];

// ==========================================
// Component 3: Property Valuation
// ==========================================

export const PROPERTY_POINTS = [
  { id: 'P001', lat: 7.4867, lng: 80.3477, value: 18500000, tax: 425000, area: 12.5, perchValue: 1480000, zone: 'Kurunegala Town' },
  { id: 'P002', lat: 7.4797, lng: 80.3557, value: 22000000, tax: 506000, area: 10.0, perchValue: 2200000, zone: 'Wehera' },
  { id: 'P003', lat: 7.4927, lng: 80.3617, value: 8500000, tax: 195500, area: 15.0, perchValue: 566666, zone: 'Gettuwana' },
  { id: 'P004', lat: 7.4737, lng: 80.3697, value: 12000000, tax: 276000, area: 20.0, perchValue: 600000, zone: 'Malkaduwawa' },
  { id: 'P005', lat: 7.4827, lng: 80.3417, value: 35000000, tax: 805000, area: 8.0, perchValue: 4375000, zone: 'Kurunegala Town' },
  { id: 'P006', lat: 7.4897, lng: 80.3527, value: 15500000, tax: 356500, area: 14.0, perchValue: 1107142, zone: 'Uhumiya' },
  { id: 'P007', lat: 7.4697, lng: 80.3597, value: 9800000, tax: 225400, area: 18.0, perchValue: 544444, zone: 'Theliyagonna' },
  { id: 'P008', lat: 7.4947, lng: 80.3547, value: 6200000, tax: 142600, area: 25.0, perchValue: 248000, zone: 'Illuppugedara' },
  { id: 'P009', lat: 7.4767, lng: 80.3647, value: 28000000, tax: 644000, area: 7.5, perchValue: 3733333, zone: 'Yanthampalawa' },
  { id: 'P010', lat: 7.4847, lng: 80.3747, value: 5500000, tax: 126500, area: 30.0, perchValue: 183333, zone: 'Mallawapitiya' },
  { id: 'P011', lat: 7.4727, lng: 80.3477, value: 42000000, tax: 966000, area: 6.0, perchValue: 7000000, zone: 'Bamunawala' },
  { id: 'P012', lat: 7.4887, lng: 80.3377, value: 31500000, tax: 724500, area: 9.0, perchValue: 3500000, zone: 'Kurunegala Town' },
];

export const SHAP_VALUES = {
  P001: [
    { feature: 'Road Width (8m)', value: 2200000, direction: 'positive' },
    { feature: 'Distance to CBD', value: 1800000, direction: 'positive' },
    { feature: 'Proximity to School', value: 950000, direction: 'positive' },
    { feature: 'Flood Risk Zone', value: -1500000, direction: 'negative' },
    { feature: 'Building Age (15yr)', value: -800000, direction: 'negative' },
    { feature: 'Land Shape Factor', value: 350000, direction: 'positive' },
  ],
  P002: [
    { feature: 'Road Width (12m)', value: 3500000, direction: 'positive' },
    { feature: 'Distance to CBD', value: 4200000, direction: 'positive' },
    { feature: 'Proximity to Hospital', value: 1200000, direction: 'positive' },
    { feature: 'Noise Level', value: -2100000, direction: 'negative' },
    { feature: 'Land Area (small)', value: -1800000, direction: 'negative' },
    { feature: 'Corner Plot', value: 1500000, direction: 'positive' },
  ],
  default: [
    { feature: 'Road Width', value: 1500000, direction: 'positive' },
    { feature: 'Distance to CBD', value: 2000000, direction: 'positive' },
    { feature: 'Proximity to School', value: 800000, direction: 'positive' },
    { feature: 'Flood Risk Zone', value: -1200000, direction: 'negative' },
    { feature: 'Building Age', value: -600000, direction: 'negative' },
    { feature: 'Land Shape Factor', value: 400000, direction: 'positive' },
  ],
};

// ==========================================
// Component 4: Infrastructure Optimization
// ==========================================

// Suitability grid points [lat, lng, score(0-1)]
export const SUITABILITY_GRID = (() => {
  const grid = [];
  for (let lat = 7.450; lat <= 7.510; lat += 0.003) {
    for (let lng = 80.330; lng <= 80.400; lng += 0.003) {
      // Generate plausible suitability scores using simple math
      const distFromCenter = Math.sqrt(Math.pow(lat - 7.481, 2) + Math.pow(lng - 80.361, 2));
      const base = Math.max(0, 1 - distFromCenter * 15);
      const noise = Math.sin(lat * 1000) * Math.cos(lng * 1000) * 0.15;
      const score = Math.min(1, Math.max(0, base + noise));
      grid.push([lat, lng, score]);
    }
  }
  return grid;
})();

export const AHP_DEFAULTS = {
  roadAccess: 30,
  populationDensity: 25,
  hydrologyRisk: 20,
  landCost: 15,
  environmentalImpact: 10,
};

export const OPTIMAL_LOCATION = {
  lat: 7.4832, lng: 80.3632,
  score: 0.94,
  breakdown: {
    roadAccess: 0.96,
    populationDensity: 0.92,
    hydrologyRisk: 0.88,
    landCost: 0.91,
    environmentalImpact: 0.97,
  },
};

// ==========================================
// Dashboard Summary KPIs
// ==========================================

export const DASHBOARD_KPIS = {
  urbanGrowth: { label: 'Urban Growth Rate', value: 3.8, unit: '%/yr', trend: 'up', icon: 'TrendingUp' },
  violations: { label: 'Active Violations', value: 5, unit: '', trend: 'down', icon: 'AlertTriangle' },
  avgPropertyValue: { label: 'Avg. Property Value', value: 18500000, unit: 'Rs.', trend: 'up', icon: 'DollarSign' },
  optimizationRuns: { label: 'Optimization Runs', value: 127, unit: '', trend: 'up', icon: 'Target' },
};

// ==========================================
// Component 5: Building Authority
// Unauthorized Building Detection
// ==========================================

export const AUTHORITY_BUILDINGS = [
  // Existing (compliant) buildings — shown in GREEN
  {
    id: 'BA001', name: 'Kurunegala Town Hall', lat: 7.4835, lng: 80.3615,
    coords: [[7.4838, 80.3610], [7.4838, 80.3620], [7.4832, 80.3620], [7.4832, 80.3610]],
    type: 'Government', status: 'existing', permitId: 'UDA-2018-0102', constructionYear: 2018, violation: null
  },
  {
    id: 'BA002', name: 'Wehera Residences', lat: 7.4800, lng: 80.3560,
    coords: [[7.4803, 80.3555], [7.4803, 80.3565], [7.4797, 80.3565], [7.4797, 80.3555]],
    type: 'Residential', status: 'existing', permitId: 'UDA-2019-0445', constructionYear: 2019, violation: null
  },
  {
    id: 'BA003', name: 'Central Commercial Complex', lat: 7.4860, lng: 80.3640,
    coords: [[7.4864, 80.3634], [7.4864, 80.3646], [7.4856, 80.3646], [7.4856, 80.3634]],
    type: 'Commercial', status: 'existing', permitId: 'UDA-2020-0678', constructionYear: 2020, violation: null
  },
  {
    id: 'BA004', name: 'Malkaduwawa Housing', lat: 7.4740, lng: 80.3690,
    coords: [[7.4743, 80.3685], [7.4743, 80.3695], [7.4737, 80.3695], [7.4737, 80.3685]],
    type: 'Residential', status: 'existing', permitId: 'UDA-2017-0312', constructionYear: 2017, violation: null
  },
  {
    id: 'BA005', name: 'Uhumiya School Building', lat: 7.4895, lng: 80.3530,
    coords: [[7.4899, 80.3524], [7.4899, 80.3536], [7.4891, 80.3536], [7.4891, 80.3524]],
    type: 'Educational', status: 'existing', permitId: 'UDA-2016-0089', constructionYear: 2016, violation: null
  },
  {
    id: 'BA006', name: 'Bamunawala Mart', lat: 7.4725, lng: 80.3480,
    coords: [[7.4728, 80.3475], [7.4728, 80.3485], [7.4722, 80.3485], [7.4722, 80.3475]],
    type: 'Commercial', status: 'existing', permitId: 'UDA-2021-0956', constructionYear: 2021, violation: null
  },

  // New construction buildings — shown in YELLOW
  {
    id: 'BA007', name: 'Kandy Rd New Apartments', lat: 7.4870, lng: 80.3585,
    coords: [[7.4874, 80.3579], [7.4874, 80.3591], [7.4866, 80.3591], [7.4866, 80.3579]],
    type: 'Residential', status: 'new_construction', permitId: 'UDA-2026-0201', constructionYear: 2026, violation: null
  },
  {
    id: 'BA008', name: 'Negombo Rd Plaza (Under Construction)', lat: 7.4810, lng: 80.3670,
    coords: [[7.4814, 80.3664], [7.4814, 80.3676], [7.4806, 80.3676], [7.4806, 80.3664]],
    type: 'Commercial', status: 'new_construction', permitId: 'UDA-2026-0315', constructionYear: 2026, violation: null
  },
  {
    id: 'BA009', name: 'Wilgoda Modern Villas', lat: 7.4775, lng: 80.3520,
    coords: [[7.4778, 80.3515], [7.4778, 80.3525], [7.4772, 80.3525], [7.4772, 80.3515]],
    type: 'Residential', status: 'new_construction', permitId: 'UDA-2026-0418', constructionYear: 2026, violation: null
  },
  {
    id: 'BA010', name: 'Industrial Park Extension', lat: 7.4920, lng: 80.3560,
    coords: [[7.4924, 80.3553], [7.4924, 80.3567], [7.4916, 80.3567], [7.4916, 80.3553]],
    type: 'Industrial', status: 'new_construction', permitId: 'UDA-2026-0522', constructionYear: 2026, violation: null
  },

  // Unauthorized buildings — shown in RED with pulsing glow
  {
    id: 'BA011', name: 'Unauthorized Structure A', lat: 7.4815, lng: 80.3505,
    coords: [[7.4819, 80.3499], [7.4819, 80.3511], [7.4811, 80.3511], [7.4811, 80.3499]],
    type: 'Unknown', status: 'unauthorized', permitId: null, constructionYear: null,
    violation: 'No building permit on record. Structure built within 10m lake reservation buffer zone without UDA approval.'
  },
  {
    id: 'BA012', name: 'Unauthorized Structure B', lat: 7.4845, lng: 80.3710,
    coords: [[7.4849, 80.3704], [7.4849, 80.3716], [7.4841, 80.3716], [7.4841, 80.3704]],
    type: 'Residential', status: 'unauthorized', permitId: null, constructionYear: null,
    violation: 'Unauthorized construction on protected wetland zone. No environmental clearance obtained.'
  },
  {
    id: 'BA013', name: 'Unauthorized Structure C', lat: 7.4905, lng: 80.3680,
    coords: [[7.4909, 80.3674], [7.4909, 80.3686], [7.4901, 80.3686], [7.4901, 80.3674]],
    type: 'Commercial', status: 'unauthorized', permitId: null, constructionYear: null,
    violation: 'Illegal commercial building in UDA restricted residential zone. Exceeds permitted floor area ratio.'
  },
  {
    id: 'BA014', name: 'Unauthorized Structure D', lat: 7.4755, lng: 80.3600,
    coords: [[7.4759, 80.3594], [7.4759, 80.3606], [7.4751, 80.3606], [7.4751, 80.3594]],
    type: 'Industrial', status: 'unauthorized', permitId: null, constructionYear: null,
    violation: 'Illegal factory construction on green belt zone. Severe environmental violation. No industrial permit.'
  },
  {
    id: 'BA015', name: 'Unauthorized Structure E', lat: 7.4785, lng: 80.3440,
    coords: [[7.4789, 80.3434], [7.4789, 80.3446], [7.4781, 80.3446], [7.4781, 80.3434]],
    type: 'Residential', status: 'unauthorized', permitId: null, constructionYear: null,
    violation: 'Setback violation and encroachment on public road reservation. Built without any approved plan.'
  },
];

export const AUTHORITY_ROADS = [
  { id: 'R001', name: 'Kandy - Kurunegala Rd (A10)', type: 'Highway', color: '#e2e8f0', width: 4, coords: [[7.4950, 80.3400], [7.4900, 80.3500], [7.4850, 80.3580], [7.4800, 80.3650], [7.4750, 80.3720]] },
  { id: 'R002', name: 'Negombo Rd (A06)', type: 'Highway', color: '#e2e8f0', width: 4, coords: [[7.4830, 80.3400], [7.4830, 80.3500], [7.4825, 80.3600], [7.4820, 80.3700], [7.4815, 80.3800]] },
  { id: 'R003', name: 'Malkaduwawa Rd', type: 'Main', color: '#cbd5e1', width: 3, coords: [[7.4750, 80.3450], [7.4760, 80.3550], [7.4770, 80.3650], [7.4780, 80.3750]] },
  { id: 'R004', name: 'Uhumiya Rd', type: 'Main', color: '#cbd5e1', width: 3, coords: [[7.4880, 80.3500], [7.4870, 80.3570], [7.4860, 80.3640], [7.4855, 80.3710]] },
  { id: 'R005', name: 'Wilgoda Lane', type: 'Secondary', color: '#94a3b8', width: 2, coords: [[7.4790, 80.3480], [7.4780, 80.3530], [7.4770, 80.3580]] },
  { id: 'R006', name: 'Gettuwana Cross Rd', type: 'Secondary', color: '#94a3b8', width: 2, coords: [[7.4920, 80.3550], [7.4910, 80.3620], [7.4900, 80.3700]] },
];

export const AUTHORITY_NATURE_RESERVES = [
  { id: 'NR001', name: 'Kurunegala Lake Buffer (10m)', color: '#339af0', coords: [[7.4827, 80.3377], [7.4827, 80.3517], [7.4777, 80.3517], [7.4777, 80.3377]] },
  { id: 'NR002', name: 'Mallawapitiya Wetland Protection', color: '#20c997', coords: [[7.4867, 80.3690], [7.4867, 80.3760], [7.4820, 80.3760], [7.4820, 80.3690]] },
  { id: 'NR003', name: 'Athugala Forest Reserve', color: '#51cf66', coords: [[7.4940, 80.3610], [7.4940, 80.3700], [7.4890, 80.3700], [7.4890, 80.3610]] },
  { id: 'NR004', name: 'Southern Green Belt Zone', color: '#40c057', coords: [[7.4770, 80.3570], [7.4770, 80.3630], [7.4730, 80.3630], [7.4730, 80.3570]] },
];

export const AUTHORITY_STATS = {
  totalBuildings: 15,
  existingBuildings: 6,
  newConstructions: 4,
  unauthorized: 5,
  natureReserves: 4,
  roadsMonitored: 6,
};
