import React from "react";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import EarthquakeMarker from "./EarthquakeMarker";

type Props = {
  activeLayer: MapLayer;
  earthquakes: Earthquake[];
};

const ReusableMap: React.FC<Props> = ({ activeLayer, earthquakes }) => {
  return (
    <MapContainer
      center={[20, 0]}
      zoom={2.5}
      className="w-full h-full z-0"
      maxBounds={[[-90, -180], [90, 180]]}   // world bounds
      maxBoundsViscosity={1.0}               // lock map strictly inside
      minZoom={2.5}
      maxZoom={18}
      zoomControl={false}
    >
      <TileLayer
        key={activeLayer.id}
        url={activeLayer.url}
        attribution={activeLayer.attribution}
        noWrap={true} // don't repeat tiles horizontally
      />

      <ZoomControl position={"bottomright"} />

      {earthquakes.map((eq) => (
        <EarthquakeMarker key={eq.id} earthquake={eq} />
      ))}
    </MapContainer>
  );
};

export default ReusableMap;
