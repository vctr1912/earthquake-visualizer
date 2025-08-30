import { CircleMarker, Popup } from "react-leaflet";
import { useState } from "react";

// ---- Props for the EarthquakeMarker component ----
type EarthquakeMarkerProps = {
  earthquake: Earthquake; // An individual earthquake object
};

// ---- Helper function ----
// Determines the color of the marker based on earthquake magnitude
const getColorByMagnitude = (magnitude: number) => {
  if (magnitude < 3) return "#00bf00"; // Green for minor earthquakes
  if (magnitude < 5) return "#FFEA00"; // Yellow for light earthquakes
  if (magnitude < 7) return "#FFA100"; // Orange for moderate earthquakes
  return "#FF0000"; // Red for major earthquakes
};

// ---- EarthquakeMarker Component ----
// This component renders a single earthquake as a CircleMarker on the map
const EarthquakeMarker = ({ earthquake }: EarthquakeMarkerProps) => {
  // State to track whether the popup is open
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Base color based on earthquake magnitude
  const baseColor = getColorByMagnitude(earthquake.magnitude);

  return (
    <CircleMarker
      center={earthquake.position} // Marker position: [latitude, longitude, depth]
      radius={6} // Fixed radius of the circle marker
      pathOptions={{
        color: isPopupOpen ? "#3d3d3d" : baseColor, // Change border color if popup is open
        fillColor: baseColor, // Fill color stays based on magnitude
        fillOpacity: 0.7, // Transparency of the fill
        weight: 2, // Border width
      }}
      eventHandlers={{
        popupopen: () => setIsPopupOpen(true),  // Set state to true when popup opens
        popupclose: () => setIsPopupOpen(false), // Set state to false when popup closes
      }}
    >
      {/* Popup displayed when marker is clicked */}
      <Popup>
        <div>
          {/* Display earthquake location */}
          <h3 className="font-bold text-base text-gray-700 mb-1">{earthquake.place}</h3>

          {/* Display magnitude and depth info */}
          <div className="flex gap-4 mb-1">
            <div className="text-gray-600 text-sm flex gap-1">
              Magnitude: 
              <div className="font-bold">{earthquake.magnitude?.toFixed(1) ?? "N/A"}</div>
            </div>
            <div className="text-gray-600 text-sm flex gap-1">
              Depth: 
              <div className="font-bold">{earthquake.position[2]?.toFixed(1) ?? "N/A"} km</div>
            </div>
          </div>

          {/* Display the timestamp of the earthquake */}
          <div className="text-gray-600 text-sm">{new Date(earthquake.time).toLocaleString()}</div>
        </div>
      </Popup>
    </CircleMarker>
  );
};

export default EarthquakeMarker;
