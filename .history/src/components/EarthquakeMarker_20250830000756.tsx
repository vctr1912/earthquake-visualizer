import React from "react";
import { CircleMarker, Popup, useMap } from "react-leaflet";

type Props = {
  earthquake: Earthquake;
};

const getMarkerColor = (magnitude: number | null) => {
  if (magnitude === null) return "#9ca3af";
  if (magnitude < 3) return "#22c55e";
  if (magnitude < 5) return "#eab308";
  if (magnitude < 7) return "#f97316";
  return "#ef4444";
};

const EarthquakeMarker: React.FC<Props> = ({ earthquake }) => {
  const map = useMap(); // get map instance
  const { position, magnitude, place, time } = earthquake;

  return (
    <CircleMarker
      center={[position[1], position[0]]}
      radius={magnitude ? Math.max(4, magnitude * 1.5) : 4}
      pathOptions={{
        color: getMarkerColor(magnitude),
        fillColor: getMarkerColor(magnitude),
        fillOpacity: 0.7,
        weight: 2,
      }}
    >
      <Popup autoPan={true}>
        <div>
          <h3 className="font-bold text-base text-gray-700 mb-1">
            {place}
          </h3>
          <div className="flex gap-4 mb-1">
            <div className="text-gray-600 text-sm flex gap-1">
              Magnitude:
              <div className="font-bold">
                {magnitude !== null ? magnitude.toFixed(1) : "N/A"}
              </div>
            </div>
            <div className="text-gray-600 text-sm flex gap-1">
              Depth:
              <div className="font-bold">
                {position[2] !== undefined ? position[2].toFixed(1) : "N/A"} km
              </div>
            </div>
          </div>
          <div className="text-gray-600 text-sm">
            {new Date(time).toLocaleString()}
          </div>
        </div>
      </Popup>
    </CircleMarker>
  );
};

export default EarthquakeMarker;
