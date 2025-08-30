import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import { LatLngExpression } from "leaflet";

const { BaseLayer } = LayersControl;

const MapView = () => {
  const position: LatLngExpression = [20, 0]; // Center of the map

  return (
    <MapContainer
      center={position}
      zoom={2}
      style={{ height: "100vh", width: "100%" }}
    >
      <LayersControl position="topright">
        {/* Street Map */}
        <BaseLayer checked name="Street">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />
        </BaseLayer>

        {/* Satellite Map */}
        <BaseLayer name="Satellite">
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            attribution='Tiles &copy; Esri &mdash; Source: Esri, NASA, USGS'
          />
        </BaseLayer>

        {/* Dark Map */}
        <BaseLayer name="Dark">
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          />
        </BaseLayer>
      </LayersControl>
    </MapContainer>
  );
};

export default MapView;
