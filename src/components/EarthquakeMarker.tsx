import { CircleMarker, Popup } from "react-leaflet";

// Props for the EarthquakeMarker component
type EarthquakeMarkerProps = {
  earthquake: Earthquake; // Individual earthquake data
};

// ---- Helper Function ----
// Determines the marker color based on earthquake magnitude
const getColorByMagnitude = (magnitude: number) => {
  if (magnitude < 3) return "#00bf00"; // Green for minor quakes
  if (magnitude < 5) return "#FFEA00"; // Yellow for light quakes
  if (magnitude < 7) return "#FFA100"; // Orange for moderate quakes
  return "#FF0000"; // Red for major quakes
};

// Component to render a single earthquake as a CircleMarker on the map
const EarthquakeMarker = ({ earthquake }: EarthquakeMarkerProps) => {
  const color = getColorByMagnitude(earthquake.magnitude); // Determine marker color

  return (
    <CircleMarker
      center={earthquake.position} // [latitude, longitude, depth]
      radius={5} // Fixed radius for the circle marker
      pathOptions={{
        color: color,       
        fillColor: color,  
        fillOpacity: 0.7,  
        weight: 2,   
      }}
    >
      {/* Popup that appears when marker is clicked */}
      <Popup>
        <div>
          {/* Earthquake location */}
          <h3 className="font-bold text-base text-gray-700 mb-1">
            {earthquake.place}
          </h3>

          {/* Magnitude and Depth Info */}
          <div className="flex gap-4 mb-1">
            <div className="text-gray-600 text-sm flex gap-1">
              Magnitude: 
              <div className="font-bold">
                {/* Display magnitude rounded to 1 decimal, or N/A */}
                {earthquake.magnitude !== null ? earthquake.magnitude.toFixed(1) : "N/A"}
              </div>
            </div>
            <div className="text-gray-600 text-sm flex gap-1">
              Depth: 
              <div className="font-bold">
                {/* Display depth (third element in position array) in km */}
                {earthquake.position[2] !== undefined ? earthquake.position[2].toFixed(1) : "N/A"} km
              </div>
            </div>
          </div>

          {/* Timestamp of the earthquake */}
          <div className="text-gray-600 text-sm">
            {new Date(earthquake.time).toLocaleString()}
          </div>
        </div>
      </Popup>
    </CircleMarker>
  );
};

export default EarthquakeMarker;
