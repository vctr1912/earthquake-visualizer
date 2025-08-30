import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';



interface ReusableMapProps {
  activeLayer: MapLayer;
  markers: MarkerData[];
  className?: string;
}

const ReusableMap: React.FC<ReusableMapProps> = ({
  activeLayer,
  markers,
}) => {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2.5}
  className = "w-full h-full z-0"
      maxBounds={[[-90, -180], [90, 180]]}
      maxBoundsViscosity={1}
      minZoom={2.5}
      maxZoom={18}
      zoomControl={false}
    >
      {/* Active Tile Layer */}
      <TileLayer
        key={activeLayer.id}
        url={activeLayer.url}
        attribution={activeLayer.attribution}
        noWrap={true}
      />

      <ZoomControl position={'bottomright'} />
      
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
  );
};

export default ReusableMap;