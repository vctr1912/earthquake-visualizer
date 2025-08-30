import { useState, useEffect } from 'react';
import { Layers, CalendarDays, Activity, Info } from 'lucide-react';
import MapComponent from './components/MapView';
import { mapLayers, timeRangeOptions, magnitudeOptions, markerInfo } from './data/data';
import { fetchEarthquakes } from './api/fetchEarthquakes';
import TopRightControls from './components/TopRightControls';

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

  // Info button status (default: false)
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);

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
    setIsInfoOpen(false);
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

     <TopRightControls
        activeLayer={activeLayer}
        setActiveLayer={setActiveLayer}
        activeTimeRange={activeTimeRange}
        setActiveTimeRange={setActiveTimeRange}
        activeMagnitude={activeMagnitude}
        setActiveMagnitude={setActiveMagnitude}
      />


      {/* ---- Click Outside to Close Menus ---- */}
      {(isLayerSelectorOpen || isTimeRangeOpen || isMagnitudeOpen || isInfoOpen) && (
        <div
          className="fixed inset-0 z-5"
          onClick={closeAllDropdowns}
        />
      )}
    </div>
  );
};

export default App;