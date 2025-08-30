import React from "react";
import { CircleMarker, Popup, useMap } from "react-leaflet";

type EarthquakeMarkerProps = {
  earthquake: Earthquake;
};

const getColorByMagnitude = (magnitude: number) => {
  if (magnitude < 3) return "#00bf00";
  if (magnitude < 5) return "#FFEA00";
  if (magnitude < 7) return "#FFA100";
  return "#FF0000";
};

const EarthquakeMarker: React.FC<EarthquakeMarkerProps> = ({ earthquake }) => {
  const map = useMap();
  const color = getColorByMagnitude(earthquake.magnitude);

  const handleMarkerClick = () => {
    // Fly to the earthquake location with smooth animation
    map.flyTo(earthquake.position, 5, {
      duration: 1.5
    });
  };

  return (
    <CircleMarker
      center={earthquake.position}
      radius={5}
      pathOptions={{
        color: color,
        fillColor: color,
        fillOpacity: 0.7,
        weight: 2,
      }}
      eventHandlers={{
        click: handleMarkerClick
      }}
    >
      <Popup>
        <div>
          <h3 className="font-bold text-base text-gray-700 mb-1">
            {earthquake.place}
          </h3>
          <div className="flex gap-4 mb-1">
            <div className="text-gray-600 text-sm flex gap-1">
              Magnitude: 
              <div className="font-bold">
                {earthquake.magnitude !== null ? earthquake.magnitude.toFixed(1) : "N/A"}
              </div>
            </div>
            <div className="text-gray-600 text-sm flex gap-1">
              Depth: 
              <div className="font-bold">
                {earthquake.position[2] !== undefined ? earthquake.position[2].toFixed(1) : "N/A"} km
              </div>
            </div>
          </div>

          <div className="text-gray-600 text-sm">
            {new Date(earthquake.time).toLocaleString()}
          </div>
        </div>
      </Popup>
    </CircleMarker>
  );
};

export default EarthquakeMarker;