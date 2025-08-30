import { CircleMarker, Popup } from "react-leaflet";
import { useState } from "react";

type EarthquakeMarkerProps = {
  earthquake: Earthquake;
};

const getColorByMagnitude = (magnitude: number) => {
  if (magnitude < 3) return "#00bf00";
  if (magnitude < 5) return "#FFEA00";
  if (magnitude < 7) return "#FFA100";
  return "#FF0000";
};

const EarthquakeMarker = ({ earthquake }: EarthquakeMarkerProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const baseColor = getColorByMagnitude(earthquake.magnitude);

  return (
    <CircleMarker
      center={earthquake.position}
      radius={6}
      pathOptions={{
        color: isPopupOpen ? "#3d3d3d" : baseColor, // Change border color when popup is open
        fillColor: baseColor,
        fillOpacity: 0.7,
        weight: 2,
      }}
      eventHandlers={{
        popupopen: () => setIsPopupOpen(true),
        popupclose: () => setIsPopupOpen(false),
      }}
    >
      <Popup>
        <div>
          <h3 className="font-bold text-base text-gray-700 mb-1">{earthquake.place}</h3>
          <div className="flex gap-4 mb-1">
            <div className="text-gray-600 text-sm flex gap-1">
              Magnitude: <div className="font-bold">{earthquake.magnitude?.toFixed(1) ?? "N/A"}</div>
            </div>
            <div className="text-gray-600 text-sm flex gap-1">
              Depth: <div className="font-bold">{earthquake.position[2]?.toFixed(1) ?? "N/A"} km</div>
            </div>
          </div>
          <div className="text-gray-600 text-sm">{new Date(earthquake.time).toLocaleString()}</div>
        </div>
      </Popup>
    </CircleMarker>
  );
};

export default EarthquakeMarker;
