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


<TileLayer
  url="https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
  attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="https://www.openstreetmap.org/">OSM</a>'
/>

</LayersControl>

    </MapContainer>
  );
};

export default MapView;
