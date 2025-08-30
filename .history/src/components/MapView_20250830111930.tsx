import { useMemo } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet"; // Core Leaflet components for React
import "leaflet/dist/leaflet.css"; // Leaflet CSS for map styling
import EarthquakeMarker from "./EarthquakeMarker"; // Custom marker component for earthquakes

// Props for the MapView component
type MapViewProps = {
  activeLayer: MapLayer; // Currently selected map layer (TileLayer)
  earthquakes: Earthquake[]; // Array of earthquake data to display as markers
};

// Component rendering the interactive map
const MapView = ({ activeLayer, earthquakes } : MapViewProps) => {

  // ---- Memoize earthquake markers for performance ----
  // Re-renders markers only when 'earthquakes' array changes
  const earthquakeMarkers = useMemo(() => {
    return earthquakes.map((eq) => (
      <EarthquakeMarker key={eq.id} earthquake={eq} />
    ));
  }, [earthquakes]);

  return (
    <MapContainer
      center={[20, 0]} // Default map center (latitude, longitude)
      zoom={2.5} // Initial zoom level
      zoomSnap={0.1} // Incremental zoom precision
      className="w-full h-full z-0" // Full container sizing
      maxBounds={[[-90, -180], [90, 180]]} // Restrict map panning to world bounds
      maxBoundsViscosity={1} // Prevent map from moving outside bounds
      minZoom={2.5} // Minimum zoom
      maxZoom={18} // Maximum zoom
      zoomControl={false} // Disable default zoom control (custom control added later)
    >

      {/* ---- Tile Layer ---- */}
      {/* Displays the map tiles for the selected activeLayer */}
      <TileLayer
        key={activeLayer.id} // Re-render when the active layer changes
        url={activeLayer.url} // Tile URL
        attribution={activeLayer.attribution} // Map attribution
        noWrap={true} // Prevent map tiles from repeating horizontally
      />

      {/* ---- Zoom Control ---- */}
      <ZoomControl position={"bottomright"} /> {/* Custom zoom control at bottom-right */}

      {/* ---- Earthquake Markers ---- */}
      {earthquakeMarkers}

    </MapContainer>
  );
};

export default MapView;
