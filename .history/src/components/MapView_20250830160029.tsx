import { useMemo, useState, useEffect } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import EarthquakeMarker from "./EarthquakeMarker";

type MapViewProps = {
  activeLayer: MapLayer;
  earthquakes: Earthquake[];
};

// In MapView.js
const MapView = ({ activeLayer, earthquakes }: MapViewProps) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const earthquakeMarkers = useMemo(
    () => earthquakes.map((eq) => <EarthquakeMarker key={eq.id} earthquake={eq} />),
    [earthquakes]
  );

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[20, 0]}
        zoom={2.7}
        zoomSnap={0.1}
        className="w-full h-full z-0"
        maxBounds={[[-90, -180], [90, 180]]}
        maxBoundsViscosity={1}
        minZoom={2.7}
        maxZoom={18}
        zoomControl={false}
        style={{ transformOrigin: 'center center' }} // Add this to contain transforms
      >
        <TileLayer
          key={activeLayer.id}
          url={activeLayer.url}
          attribution={activeLayer.attribution}
          noWrap={true}
        />
        {!isMobile && <ZoomControl position="bottomright" />}
        {earthquakeMarkers}
      </MapContainer>
    </div>
  );
};

export default MapView;
