import { useMemo, useState, useEffect } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import EarthquakeMarker from "./EarthquakeMarker";

type MapViewProps = {
  activeLayer: MapLayer;
  earthquakes: Earthquake[];
};

const MapView = ({ activeLayer, earthquakes }: MapViewProps) => {
  const [isMobile, setIsMobile] = useState(false);

  // ---- Detect mobile screen ----
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 640); // Tailwind sm breakpoint
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const earthquakeMarkers = useMemo(
    () => earthquakes.map((eq) => <EarthquakeMarker key={eq.id} earthquake={eq} />),
    [earthquakes]
  );

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2.7}
      zoomSnap={0.1}
      className="w-full h-full"
      maxBounds={[[-90, -180], [90, 180]]}
      maxBoundsViscosity={1}
      minZoom={2.7}
      maxZoom={18}
      zoomControl={false} // disable default Leaflet zoom control
    >
      <TileLayer
        key={activeLayer.id}
        url={activeLayer.url}
        attribution={activeLayer.attribution}
        noWrap={true}
      />

      {/* Only show custom ZoomControl on non-mobile screens */}
      {!isMobile && <ZoomControl position="bottomright" />}

      {earthquakeMarkers}
    </MapContainer>
  );
};

export default MapView;
