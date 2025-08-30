import React from "react";
import { CircleMarker, Popup } from "react-leaflet";

type EarthquakeMarkerProps = {
  earthquake: Earthquake;
};

const getColorByMagnitude = (magnitude: number) => {
  if (magnitude < 3) return "#22c55e"; // green
  if (magnitude < 5) return "#eab308"; // yellow
  if (magnitude < 7) return "#f97316"; // orange
  return "#dc2626"; // red
};

const EarthquakeMarker: React.FC<EarthquakeMarkerProps> = ({ earthquake }) => {
  return (
    <CircleMarker
      center={earthquake.position}
      radius={5}
      pathOptions={{
        color: "#3b82f6",
        fillColor: "#3b82f6",
        fillOpacity: 0.7,
        weight: 2,
      }}
    >
      <Popup>
        <div>
          <h3 className="font-bold text-base text-gray-700 mb-1">
            {earthquake.place}
          </h3>
          <div className="flex gap-4 mb-1">
            <div className="text-gray-600 text-sm flex gap-1">Magnitude: <div className="font-bold"> {earthquake.magnitude} </div></div>
            <div className="text-gray-600 text-sm flex gap-1">Depth: <div className="font-bold"> {earthquake.position[2]} km</div> </div>
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
