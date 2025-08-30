import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { Map, Layers, Satellite, Globe } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

interface MapLayer {
  id: string;
  name: string;
  url: string;
  attribution: string;
  icon: React.ReactNode;
}

interface MarkerData {
  id: string;
  position: [number, number];
  title: string;
  description: string;
  color?: string;
  size?: number;
}

const MapWithLayers: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<string>('openstreetmap');
  const [isLayerSelectorOpen, setIsLayerSelectorOpen] = useState<boolean>(false);

  // Define available map layers
  const mapLayers: MapLayer[] = [
    {
      id: 'openstreetmap',
      name: 'Street Map',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      icon: <Map className="w-4 h-4" />
    },
    {
      id: 'satellite',
      name: 'Satellite',
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '&copy; <a href="https://www.esri.com/">Esri</a>, Maxar, Earthstar Geographics',
      icon: <Satellite className="w-4 h-4" />
    },
    {
      id: 'terrain',
      name: 'Terrain',
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors',
      icon: <Globe className="w-4 h-4" />
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      icon: <Layers className="w-4 h-4" />
    }
  ];

  // Sample markers data
  const markers: MarkerData[] = [
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
const currentLayer = mapLayers.find(layer => layer.id === activeLayer) || mapLayers[0];
  // Sample marker position (San Francisco)
  const position: [number, number] = [0, 500];

  return (
    <div className="relative w-full h-screen">
      {/* Map Container */}
      <MapContainer
        center={position}
        zoom={2}
        className="w-full h-full z-0"
        maxBounds={[[-90, -180], [90, 180]]}
        maxBoundsViscosity={1.0}
        minZoom={2.3}
        maxZoom={18}
      >
        {/* Active Tile Layer */}
        <TileLayer
          key={currentLayer.id}
          url={currentLayer.url}
          attribution={currentLayer.attribution}
          noWrap={true}
        />
        
        {/* Circle Markers */}
        {markers.map((marker) => (
          <CircleMarker
            key={marker.id}
            center={marker.position}
            radius={marker.size || 10}
            pathOptions={{
              color: marker.color || '#3b82f6',
              fillColor: marker.color || '#3b82f6',
              fillOpacity: 0.7,
              weight: 2,
            }}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold text-lg text-gray-800 mb-1">
                  {marker.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {marker.description}
                </p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Layer Selector Button */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setIsLayerSelectorOpen(!isLayerSelectorOpen)}
          className="bg-white hover:bg-gray-50 border border-gray-300 rounded-lg p-3 shadow-lg transition-all duration-200 hover:shadow-xl"
          title="Change map layer"
        >
          <Layers className="w-5 h-5 text-gray-700" />
        </button>

        {/* Layer Options Dropdown */}
        {isLayerSelectorOpen && (
          <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden min-w-48">
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
              <span className="text-sm font-medium text-gray-700">Map Layers</span>
            </div>
            {mapLayers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => {
                  setActiveLayer(layer.id);
                  setIsLayerSelectorOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 ${
                  activeLayer === layer.id 
                    ? 'bg-blue-50 border-r-2 border-blue-500 text-blue-700' 
                    : 'text-gray-700'
                }`}
              >
                <span className={activeLayer === layer.id ? 'text-blue-500' : 'text-gray-500'}>
                  {layer.icon}
                </span>
                <span className="text-sm font-medium">{layer.name}</span>
                {activeLayer === layer.id && (
                  <span className="ml-auto text-blue-500 text-xs">✓</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Current Layer Indicator */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">{currentLayer.icon}</span>
            <span className="text-sm font-medium text-gray-700">
              {currentLayer.name}
            </span>
          </div>
        </div>
      </div>

      {/* Click outside handler */}
      {isLayerSelectorOpen && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setIsLayerSelectorOpen(false)}
        />
      )}
    </div>
  );
};

export default MapWithLayers;