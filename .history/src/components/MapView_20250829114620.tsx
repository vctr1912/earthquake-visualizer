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
  <BaseLayer checked name="Street">
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OSM" />
  </BaseLayer>

  <BaseLayer name="Dark">
    <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" attribution="&copy; Carto" />
  </BaseLayer>

  <BaseLayer name="Satellite">
    <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" attribution="&copy; Esri" />
  </BaseLayer>

  <BaseLayer name="Terrain">
    <TileLayer url="https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg" attribution="Map tiles by Stamen" />
  </BaseLayer>

  <BaseLayer name="Watercolor">
    <TileLayer url="https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg" attribution="Map tiles by Stamen" />
  </BaseLayer>
</LayersControl>

    </MapContainer>
  );
};

export default MapView;
