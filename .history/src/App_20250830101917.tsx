import { useState, useEffect } from 'react';
import { Layers, CalendarDays, Activity } from 'lucide-react';
import MapComponent from './components/MapView';
import { mapLayers, timeRangeOptions, magnitudeOptions } from './data/data';
import { fetchEarthquakes } from './api/fetchEarthquakes';

const App = () => {
  // ---- State Management ----

  // Map Layer (default: first layer in list)
  const [activeLayer, setActiveLayer] = useState<MapLayer>(mapLayers[0]);
  const [isLayerSelectorOpen, setIsLayerSelectorOpen] = useState<boolean>(false);

  // Time Range (default: "day")
  const [activeTimeRange, setActiveTimeRange] = useState<string>('day');
  const [isTimeRangeOpen, setIsTimeRangeOpen] = useState<boolean>(false);

  // Magnitude filter (default: "all")
  const [activeMagnitude, setActiveMagnitude] = useState<string>('all');
  const [isMagnitudeOpen, setIsMagnitudeOpen] = useState<boolean>(false);

  // Earthquake Data
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);

  // Loading + Error state for API requests
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false); // Controls visual loading display
  const [error, setError] = useState<string | null>(null);

  // ---- Fetch Earthquake Data ----
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setShowLoading(true);
      setError(null);
      
      const startTime = Date.now();
      
      try {
        // Fetch earthquakes based on selected magnitude & time range
        const data = await fetchEarthquakes(activeMagnitude, activeTimeRange);
        setEarthquakes(data);
        
        // Only apply 4-second minimum loading time for large datasets
        if (data.length > 5000) {
          // Calculate remaining time to reach 4 seconds minimum
          const elapsedTime = Date.now() - startTime;
          const minLoadingTime = 3000;
          const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
          console.log(remainingTime)
          // Keep showing loading for the remaining time
          setTimeout(() => {
            setShowLoading(false);
          }, remainingTime);
        } else {
          // For smaller datasets, hide loading immediately
          setShowLoading(false);
        }
      } catch (err: any) {
        // Handle API error
        setError(err.message || "Something went wrong while fetching earthquakes");
        setShowLoading(false);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [activeMagnitude, activeTimeRange]); // Runs whenever filters change

  // ---- Utility: Close all dropdown menus ----
  const closeAllDropdowns = () => {
    setIsLayerSelectorOpen(false);
    setIsTimeRangeOpen(false);
    setIsMagnitudeOpen(false);
  };

  return (
    <div className="relative w-full h-screen">

      {/* ---- App Logo + Title ---- */}
      <div 
        className={`absolute top-4 left-4 flex items-center justify-center gap-2 font-bold text-xl sm:text-2xl sm:px-4 py-1 z-10 ${
          activeLayer.id === 'openstreetmap' ? 'text-gray-700' : 'text-white'
        }`}
      >
        {/* Logo image (inverts on maps other than street map) */}
        <img 
          src="logo.png" 
          alt="Logo" 
          className={`w-7 h-7 sm:w-8 sm:h-8 ${activeLayer.id !== 'openstreetmap' ? 'invert' : ''}`} 
        />
        <div>GeoQuake</div>
      </div>

      {/* ---- Map Component ---- */}
      <MapComponent
        activeLayer={activeLayer}
        earthquakes={earthquakes}
      />

      {/* ---- Loader ---- */}
      {showLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/5 backdrop-blur-xs z-20">
          <div className="h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-600 font-medium">Loading Earthquakes...</p>
        </div>
      )}

      {/* ---- Error Message ---- */}
      {error && !showLoading && (
        <div className="absolute bottom-4 left-4 z-10 text-red-600 bg-slate-50 border border-gray-300 rounded-lg px-4 py-2 shadow-lg">
          {error}
        </div>
      )}

      {/* ---- Dropdown Controls (Map Layer, Time Range, Magnitude) on top right ---- */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-3">

        {/* Map Layer Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setIsLayerSelectorOpen(!isLayerSelectorOpen);
              setIsTimeRangeOpen(false);
              setIsMagnitudeOpen(false);
            }}
            className="bg-slate-50 hover:bg-slate-100 border border-gray-300 rounded-lg p-3 shadow-lg transition-all duration-200 hover:shadow-xl"
            title="Change map layer"
          >
            <Layers className="w-5 h-5 text-gray-700" />
          </button>

          {/* Dropdown Menu */}
          {isLayerSelectorOpen && (
            <div className="absolute top-0 right-12 mt-0 bg-slate-50 border border-gray-200 rounded-lg shadow-lg overflow-hidden min-w-42">
              <div className="px-4 py-2 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-700">Map Layers</span>
              </div>
              {mapLayers.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => {
                    setActiveLayer(layer);
                    setIsLayerSelectorOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-150 ${
                    activeLayer === layer 
                      ? 'bg-indigo-50 text-indigo-600' 
                      : 'text-gray-700'
                  }`}
                >
                  <span className="text-sm font-medium">{layer.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Time Range Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setIsTimeRangeOpen(!isTimeRangeOpen);
              setIsLayerSelectorOpen(false);
              setIsMagnitudeOpen(false);
            }}
            className="bg-slate-50 hover:bg-slate-100 border border-gray-300 rounded-lg p-3 shadow-lg transition-all duration-200 hover:shadow-xl"
            title="Select time range"
          >
            <CalendarDays className="w-5 h-5 text-gray-700" />
          </button>

          {/* Dropdown Menu */}
          {isTimeRangeOpen && (
            <div className="absolute top-0 right-12 mt-0 bg-slate-50 border border-gray-200 rounded-lg shadow-lg overflow-hidden min-w-42">
              <div className="px-4 py-2 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-700">Time Range</span>
              </div>
              {timeRangeOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setActiveTimeRange(option.id);
                    setIsTimeRangeOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-150 ${
                    activeTimeRange === option.id 
                      ? 'bg-indigo-50 text-indigo-600' 
                      : 'text-gray-700'
                  }`}
                >
                  <span className="text-sm font-medium">{option.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Magnitude Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setIsMagnitudeOpen(!isMagnitudeOpen);
              setIsLayerSelectorOpen(false);
              setIsTimeRangeOpen(false);
            }}
            className="bg-slate-50 hover:bg-slate-100 border border-gray-300 rounded-lg p-3 shadow-lg transition-all duration-200 hover:shadow-xl"
            title="Select magnitude"
          >
            <Activity className="w-5 h-5 text-gray-700" />
          </button>

          {/* Dropdown Menu */}
          {isMagnitudeOpen && (
            <div className="absolute top-0 right-12 mt-0 bg-slate-50 border border-gray-200 rounded-lg shadow-lg overflow-hidden min-w-42">
              <div className="px-4 py-2 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-700">Magnitude</span>
              </div>
              {magnitudeOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setActiveMagnitude(option.id);
                    setIsMagnitudeOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-150 ${
                    activeMagnitude === option.id 
                      ? 'bg-indigo-50 text-indigo-600' 
                      : 'text-gray-700'
                  }`}
                >
                  <span className="text-sm font-medium">{option.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

 {/* Map Layer Selector */}
        <div className="relative">
          <button
            onClick={() => {
              setIsLayerSelectorOpen(!isLayerSelectorOpen);
              setIsTimeRangeOpen(false);
              setIsMagnitudeOpen(false);
            }}
            className="bg-slate-50 hover:bg-slate-100 border border-gray-300 rounded-lg p-3 shadow-lg transition-all duration-200 hover:shadow-xl"
            title="Change map layer"
          >
            <Layers className="w-5 h-5 text-gray-700" />
          </button>

          {/* Dropdown Menu */}
          {isLayerSelectorOpen && (
            <div className="absolute top-0 right-12 mt-0 bg-slate-50 border border-gray-200 rounded-lg shadow-lg overflow-hidden min-w-42">
              <div className="px-4 py-2 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-700">Map Layers</span>
              </div>
              {mapLayers.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => {
                    setActiveLayer(layer);
                    setIsLayerSelectorOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-150 ${
                    activeLayer === layer 
                      ? 'bg-indigo-50 text-indigo-600' 
                      : 'text-gray-700'
                  }`}
                >
                  <span className="text-sm font-medium">{layer.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

      {/* ---- Click Outside to Close Menus ---- */}
      {(isLayerSelectorOpen || isTimeRangeOpen || isMagnitudeOpen) && (
        <div
          className="fixed inset-0 z-5"
          onClick={closeAllDropdowns}
        />
      )}
    </div>
  );
};

export default App;