import { useState, useEffect } from 'react';
import MapView from './components/MapView';
import { mapLayers } from './data/data';
import { fetchEarthquakes } from './api/fetchEarthquakes';
import TopRightControls from './components/TopRightControls';

const App = () => {
  // ---- State Management ---- 

  // Current map layer (default: first layer in the list)
  const [activeLayer, setActiveLayer] = useState<MapLayer>(mapLayers[0]);

  // Time range filter for earthquakes (default: 'day')
  const [activeTimeRange, setActiveTimeRange] = useState<string>('day');

  // Magnitude filter for earthquakes (default: 'all')
  const [activeMagnitude, setActiveMagnitude] = useState<string>('all');

  // Store earthquake data fetched from API
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);

  // Loading and error states for API requests
  const [showLoading, setShowLoading] = useState(false); // Controls visual spinner overlay
  const [error, setError] = useState<string | null>(null); // Holds API error messages

  // ---- Fetch Earthquake Data ----
  useEffect(() => {
    const loadData = async () => {
      setShowLoading(true); // Show loading spinner
      setError(null); // Reset any previous errors
      
      const startTime = Date.now(); // Record request start time

      try {
        // Fetch earthquakes filtered by magnitude and time range
        const data = await fetchEarthquakes(activeMagnitude, activeTimeRange);
        setEarthquakes(data);

        // Ensure spinner shows for at least 3 seconds for large datasets
        if (data.length > 5000) {
          const elapsedTime = Date.now() - startTime;
          const minLoadingTime = 2000; // Minimum loading display in ms
          const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

          setTimeout(() => {
            setShowLoading(false); // Hide spinner after remaining time
          }, remainingTime);
        } else {
          // Hide spinner immediately for smaller datasets
          setShowLoading(false);
        }
      } catch (err: any) {
        // Handle API errors gracefully
        setError(err.message || "Something went wrong while fetching earthquakes");
        setShowLoading(false);
      }
    };

    loadData();
  }, [activeMagnitude, activeTimeRange]); // Re-run whenever filters change

  return (
    <div className="relative w-full h-screen">

        {/* ---- App Logo + Title ---- */}
        <div 
          className={`absolute top-4 left-4 flex items-center justify-center gap-2 font-bold text-xl sm:text-2xl sm:px-4 py-1 z-10 
            ${activeLayer.id === 'openstreetmap' ? 'text-gray-700' : 'text-white'}`}
        >
            {/* Logo image */}
            <img 
              src="logo.png" 
              alt="Logo" 
              className={`w-7 h-7 sm:w-8 sm:h-8 ${activeLayer.id !== 'openstreetmap' ? 'invert' : ''}`} 
            />
            <div>GeoQuake</div>
        </div>

        {/* ---- Map Component ---- */}
        {/* Displays the interactive map and earthquake markers */}
        <MapView
          activeLayer={activeLayer}
          earthquakes={earthquakes}
        />

        {/* ---- Loader Overlay ---- */}
        {/* Displays a spinner while data is being fetched */}
        {showLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/5 backdrop-blur-xs z-20">
            <div className="h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-600 font-medium">Loading Earthquakes...</p>
          </div>
        )}

        {/* ---- Error Message ---- */}
        {/* Displays API error messages */}
        {error && !showLoading && (
          <div className="absolute bottom-4 left-4 z-10 text-red-600 bg-slate-50 border border-gray-300 rounded-lg px-4 py-2 shadow-lg">
            {error}
          </div>
        )}

        {/* ---- Top Right Controls ---- */}
        {/* Contains dropdowns for map layer, time range, and magnitude filters */}
        <TopRightControls
          activeLayer={activeLayer}
          setActiveLayer={setActiveLayer}
          activeTimeRange={activeTimeRange}
          setActiveTimeRange={setActiveTimeRange}
          activeMagnitude={activeMagnitude}
          setActiveMagnitude={setActiveMagnitude}
        />
      
    </div>
  );
};

export default App;
