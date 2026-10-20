# Urbanscapes-LK: Multi-Criteria Spatial Optimization for Infrastructure Site Selection
## Component 4: Spatial Decision Support System (SDSS)
**Target Region:** Matale District, Central Province, Sri Lanka ($7.35^\circ - 8.05^\circ\text{N}$, $80.45^\circ - 81.00^\circ\text{E}$)  
**Institution:** Sri Lanka Institute of Information Technology (SLIIT)  
**Project ID:** TAF_J26 – IT – 337 | **Student ID:** IT23170902  

---

### Project Overview
This repository contains the standalone, autonomous Python-based spatial optimization engine for public infrastructure site selection (Schools, Hospitals, Transport Hubs, and Commercial Centers) across Matale District.

The system combines:
1. **Analytic Hierarchy Process (AHP)** for multi-criteria weighting ($CR < 0.032$, Saaty-validated).
2. **Topographic Digital Elevation Models (DEM)** from NASA SRTM 30m radar data (`data/matale_dem.tif`).
3. **OpenStreetMap GIS Layers** (Road network, water bodies, protected conservation areas, existing infrastructure).
4. **Dual Metaheuristic Optimizers**: Spatial Genetic Algorithm (GA) and Particle Swarm Optimization (PSO).
5. **Interactive 3D WebGL Dashboard**: Powered by Three.js and Leaflet with Google Satellite / Hybrid / Streets base layers.
6. **Highest & Best Use (HBU) Reverse Siting Engine**: Evaluates any user-selected coordinates and predicts optimal infrastructure, capacity, structural floors, foundation type, and rooftop solar PV potential.

---

### Project Structure
```text
reasearch/
├── proposal_component4.md       # SLIIT Research Proposal Document
├── spatial_optimization/        # Core Research & Implementation Code
│   ├── ahp_engine.py            # Analytic Hierarchy Process matrix evaluator & CR validator
│   ├── genetic_algorithm.py     # Continuous 2D/3D Spatial Genetic Algorithm optimizer
│   ├── pso_optimizer.py         # Continuous Spatial Particle Swarm Optimization engine
│   ├── real_data_loader.py      # Real GIS, DEM & OpenStreetMap parser & rasterizer
│   ├── suitability_surface.py   # Penalty-masked multi-criteria suitability landscape
│   ├── building_feature_predictor.py # Demographic, structural & solar capacity predictor
│   ├── interactive_dashboard.py # Main interactive web dashboard (Google Maps + 3D WebGL)
│   ├── facility_validation.py   # Empirical validation against historical facilities
│   ├── statistical_benchmark.py # GA vs PSO convergence & statistical rigor benchmarks
│   ├── sensitivity_analysis.py  # Criteria weight robustness & spatial sensitivity tests
│   ├── requirements.txt         # Python dependencies
│   ├── data/                    # NASA SRTM GeoTIFF, road & boundary shapefiles
│   └── outputs/                 # Benchmark charts, heatmaps, and validation JSONs
├── AGENTS.md
├── CLAUDE.md
└── README.md
```

---

### Quick Start

1. **Install Dependencies:**
   ```bash
   cd spatial_optimization
   pip install -r requirements.txt
   ```

2. **Launch the Interactive 3D WebGL Dashboard:**
   ```bash
   python interactive_dashboard.py
   ```
   Open your browser at: **`http://localhost:8050`**

3. **Run Statistical Benchmarks & Validation:**
   ```bash
   python statistical_benchmark.py
   python facility_validation.py
   ```
