import React, { useMemo } from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import EarthquakeMarker from "./EarthquakeMarker";

type MapViewProps = {
  activeLayer: MapLayer;
  earthquakes: Earthquake[];
};

const MapView: React.FC<MapViewProps> = ({ activeLayer, earthquakes }) => {
  const earthquakeMarkers = useMemo(() => {
    return earthquakes.map((eq) => (
      <EarthquakeMarker key={eq.id} earthquake={eq} />
    ));
  }, [earthquakes]);

  return (
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
  );
};

export default MapView;
