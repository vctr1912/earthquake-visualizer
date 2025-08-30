import React from "react";
import { CircleMarker, Popup } from "react-leaflet";

type EarthquakeMarkerProps = {
  earthquake: Earthquake;
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
        <div className="text-center">
          <h3 className="font-bold text-lg text-gray-800 mb-1">
            {earthquake.place}
          </h3>
          <p className="text-gray-600 text-sm">Magnitude: {earthquake.magnitude}</p>
          <p className="text-gray-500 text-xs">
            {new Date(earthquake.time).toLocaleString()}
          </p>
        </div>
      </Popup>
    </CircleMarker>
  );
};

export default EarthquakeMarker;
