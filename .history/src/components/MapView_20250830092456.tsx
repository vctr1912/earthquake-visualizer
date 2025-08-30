import React, { useMemo, useState, useEffect } from "react";
import { MapContainer, TileLayer, ZoomControl, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import EarthquakeMarker from "./EarthquakeMarker";

type Props = {
  activeLayer: MapLayer;
  earthquakes: Earthquake[];
};

const ReusableMap: React.FC<Props> = ({ activeLayer, earthquakes }) => {
  const [markersReady, setMarkersReady] = useState(false);

  // Memoize markers to avoid unnecessary re-renders
  const earthquakeMarkers = useMemo(() => {
    return earthquakes.map((eq) => (
      <EarthquakeMarker key={eq.id} earthquake={eq} />
    ));
  }, [earthquakes]);

  // Approximate marker readiness using requestAnimationFrame
  useEffect(() => {
    setMarkersReady(false);
    const raf = requestAnimationFrame(() => setMarkersReady(true));
    return () => cancelAnimationFrame(raf);
  }, [earthquakes]);

  return (
    <div className="relative w-full h-full">
      {/* Loader overlay while markers are being prepared */}
      {!markersReady && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-white/50">
          <div className="h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
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
