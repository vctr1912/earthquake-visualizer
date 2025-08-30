import { useState, useEffect } from 'react';
import { Layers, CalendarDays, Activity } from 'lucide-react';
import MapComponent from './components/MapView';
import { mapLayers, timeRangeOptions, magnitudeOptions } from './data/data';
import { fetchEarthquakes } from './api/fetchEarthquakes';

const MapWithFilters = () => {
  const [activeLayer, setActiveLayer] = useState<MapLayer>(mapLayers[0]);
  const [isLayerSelectorOpen, setIsLayerSelectorOpen] = useState<boolean>(false);
  const [activeTimeRange, setActiveTimeRange] = useState<string>('day');
  const [activeMagnitude, setActiveMagnitude] = useState<string>('all');
  const [isTimeRangeOpen, setIsTimeRangeOpen] = useState<boolean>(false);
  const [isMagnitudeOpen, setIsMagnitudeOpen] = useState<boolean>(false);
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchEarthquakes(activeMagnitude, activeTimeRange);
      setEarthquakes(data);
    };

    loadData();
  }, [activeMagnitude, activeTimeRange]);

  // All markers data
  const earthquakesData: Earthquake[] = [
    {
      id: '1',
      magnitude: 3.3,
      place: 'Golden Gate Park',
      time: 1756467975460,
      position: [8.61, 77.23, 60],
    },
    {
      id: '2',
      magnitude: 3.3,
      place: 'Golden Gate Park',
      time: 1756467975460,
      position: [50.61, 77.23, 60],
    },
    {
      id: '3',
      magnitude: 3.3,
      place: 'Golden Gate Park',
      time: 1756467975460,
      position: [18.61, 77.23, 60],
    },
    {
      id: '4',
      magnitude: 3.3,
      place: 'Golden',
      time: 1756467975460,
      position: [37.7949, 122.4094, 40],

    },
    {
      id: '5',
      magnitude: 3.9,
      place: 'Delhi',
      time: 1756467975460,
      position: [28.61, 77.23, 60],
    }
  ];


  const closeAllDropdowns = () => {
    setIsLayerSelectorOpen(false);
    setIsTimeRangeOpen(false);
    setIsMagnitudeOpen(false);
  };

  return (
    <div className="relative w-full h-screen">
      {/* Map Component */}
      <MapComponent
        activeLayer={activeLayer}
        earthquakes={earthquakesData}
      />

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

export default MapWithFilters;