import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";

const MapView = () => {
  // Default position (latitude, longitude) - here it's centered at [0,0]
  const position: LatLngExpression = [20, 0];

  return (
    <MapContainer
      center={position}
      zoom={2}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[37.7749, -122.4194]}>
        <Popup>San Francisco, Example Marker</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
