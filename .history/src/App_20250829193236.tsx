import { useState, useEffect } from 'react';
import { Layers, CalendarDays, Activity, Earth } from 'lucide-react';
import MapComponent from './components/MapView';
import { mapLayers, timeRangeOptions, magnitudeOptions } from './data/data';
import { fetchEarthquakes } from './api/fetchEarthquakes';

const App = () => {
  const [activeLayer, setActiveLayer] = useState<MapLayer>(mapLayers[0]);
  const [isLayerSelectorOpen, setIsLayerSelectorOpen] = useState<boolean>(false);
  const [activeTimeRange, setActiveTimeRange] = useState<string>('day');
  const [activeMagnitude, setActiveMagnitude] = useState<string>('all');
  const [isTimeRangeOpen, setIsTimeRangeOpen] = useState<boolean>(false);
  const [isMagnitudeOpen, setIsMagnitudeOpen] = useState<boolean>(false);

  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchEarthquakes(activeMagnitude, activeTimeRange);
        setEarthquakes(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong while fetching earthquakes");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [activeMagnitude, activeTimeRange]);



  const closeAllDropdowns = () => {
    setIsLayerSelectorOpen(false);
    setIsTimeRangeOpen(false);
    setIsMagnitudeOpen(false);
  };

  return (
    <div className="relative w-full h-screen">

        <div 
        className={`absolute top-4 left-4 flex items-center justify-center gap-2 font-bold text-2xl px-4 py-1 z-10 ${activeLayer.id === 'satelite'}?'text-gray-700':'text-gray-700'`}>
          <Earth />
          <div>GeoQuake</div>
        </div>

      {/* Map Component */}
      <MapComponent
        activeLayer={activeLayer}
        earthquakes={earthquakes}
      />

            {/* Loader Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/5 backdrop-blur-xs z-20">
          <div className="h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {/* Error */}
      {error && !loading && (
        <div 
            className="absolute bottom-4 left-4 z-10 text-red-600 bg-slate-50 border border-gray-300 rounded-lg px-4 py-2 shadow-lg"
        >
          {error}
        </div>
      )}


      {/* Controls Container */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-3">
        
        {/* Layer Selector Button */}
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

          {/* Layer Options Dropdown */}
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

          {/* Time Range Options Dropdown */}
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

          {/* Magnitude Options Dropdown */}
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

      {/* Click outside handler */}
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