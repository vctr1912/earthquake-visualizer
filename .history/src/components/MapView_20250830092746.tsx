import React, { useMemo, useState, useEffect } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import EarthquakeMarker from "./EarthquakeMarker";

type Props = {
  activeLayer: MapLayer;
  earthquakes: Earthquake[];
};

const ReusableMap: React.FC<Props> = ({ activeLayer, earthquakes }) => {
  const [isLoadingMarkers, setIsLoadingMarkers] = useState(true);

  const earthquakeMarkers = useMemo(() => {
    return earthquakes.map((eq) => (
      <EarthquakeMarker key={eq.id} earthquake={eq} />
    ));
  }, [earthquakes]);

  useEffect(() => {
    if (earthquakes.length > 0) {
      // Small delay to ensure markers are processed
      const timer = setTimeout(() => {
        setIsLoadingMarkers(false);
      }, 100);
      
      return () => clearTimeout(timer);
    } else {
      setIsLoadingMarkers(false);
    }
  }, [earthquakes]);

  return (
    <div className="relative w-full h-full">
      {isLoadingMarkers && earthquakes.length > 0 && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="text-sm text-gray-600 font-medium">Loading earthquake markers...</p>
          </div>
        </div>
      )}
      
      <MapContainer
        center={[20, 0]}
        zoom={2.5}
        zoomSnap={0.1}
        className="w-full h-full z-0"
        maxBounds={[[-90, -180], [90, 180]]}
        maxBoundsViscosity={1}
        minZoom={2.5}
        maxZoom={18}
        zoomControl={false}
      >
        <TileLayer
          key={activeLayer.id}
          url={activeLayer.url}
          attribution={activeLayer.attribution}
          noWrap={true}
        />

        <ZoomControl position={"bottomright"} />

        {earthquakeMarkers}
      </MapContainer>
    </div>
  );
};

export default ReusableMap;