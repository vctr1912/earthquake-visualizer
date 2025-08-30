import React, { useState, useMemo } from 'react';
import { Layers, CalendarDays, Activity } from 'lucide-react';
import MapComponent from './components/MapView';

const MapWithFilters: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<string>('openstreetmap');
  const [isLayerSelectorOpen, setIsLayerSelectorOpen] = useState<boolean>(false);

  const [activeTimeRange, setActiveTimeRange] = useState<string>('1week');
  const [isTimeRangeOpen, setIsTimeRangeOpen] = useState<boolean>(false);

  const [activeMagnitude, setActiveMagnitude] = useState<string>('moderate');
  const [isMagnitudeOpen, setIsMagnitudeOpen] = useState<boolean>(false);

  // Define time range options
  const timeRangeOptions = [
    { id: 'day', name: '1 Day' },
    { id: 'week', name: '1 Week' },
    { id: 'month', name: '1 Month' }
  ];

  // Define magnitude options
  const magnitudeOptions = [
    { id: 'minor', name: 'Minor (0.0 - 3.9)' },
    { id: 'moderate', name: 'Moderate (4.0 - 5.9)' },
    { id: 'major', name: 'Major (6.0 & above)' }
  ];

  // Define available map layers
  const mapLayers: MapLayer[] = [
    {
      id: 'openstreetmap',
      name: 'Street Map',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    {
      id: 'satellite',
      name: 'Satellite',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '&copy; <a href="https://www.esri.com/">Esri</a>, Maxar, Earthstar Geographics',
    },
    {
      id: 'terrain',
      name: 'Terrain',
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors',
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }
  ];

  // All markers data
  const allMarkers: MarkerData[] = [
    {
      id: '1',
      position: [37.7749, -122.4194],
      title: 'San Francisco',
      description: 'Golden Gate Bridge area',
      color: '#3b82f6',
      size: 5
    },
    {
      id: '2',
      position: [37.7849, -122.4094],
      title: 'North Beach',
      description: 'Italian district with great restaurants',
      color: '#ef4444',
      size: 5
    },
    {
      id: '3',
      position: [37.7649, -122.4294],
      title: 'Mission District',
      description: 'Vibrant neighborhood with street art',
      color: '#10b981',
      size: 5
    },
    {
      id: '4',
      position: [37.7949, -122.4094],
      title: 'Fisherman\'s Wharf',
      description: 'Tourist area with sea lions and shops',
      color: '#f59e0b',
      size: 5
    },
    {
      id: '5',
      position: [37.7549, -122.4494],
      title: 'Golden Gate Park',
      description: 'Large urban park with museums',
      color: '#8b5cf6',
      size: 5
    }
  ];

  // Get current layer object
  const currentLayer = useMemo(() => 
    mapLayers.find(layer => layer.id === activeLayer) || mapLayers[0], 
    [activeLayer, mapLayers]
  );

  // Filter markers based on selected criteria
  const filteredMarkers = useMemo(() => {
    // In a real implementation, you would filter based on activeTimeRange and activeMagnitude
    // For now, returning all markers as the sample data doesn't have time/magnitude properties
    return allMarkers;
  }, [allMarkers, activeTimeRange, activeMagnitude]);

  const closeAllDropdowns = () => {
    setIsLayerSelectorOpen(false);
    setIsTimeRangeOpen(false);
    setIsMagnitudeOpen(false);
  };

  return (
    <div className="relative w-full h-screen">
      {/* Map Component */}
      <MapComponent
        activeLayer={currentLayer}
        markers={filteredMarkers}
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
                    setActiveLayer(layer.id);
                    setIsLayerSelectorOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-150 ${
                    activeLayer === layer.id 
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