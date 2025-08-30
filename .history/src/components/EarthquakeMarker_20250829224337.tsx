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
        <div className="">
          <h3 className="font-bold text-base text-gray-700 mb-1">
            {earthquake.place}
          </h3>
          <div className="flex gap-4 mb-1">
            <div className="text-gray-600 text-sm flex">Magnitude: <div className="font-bold"> {earthquake.magnitude} </div></div>
            <div className="text-gray-600 text-sm flex">Depth: <div className="font-bold"> {earthquake.position[2]} km</div> </div>
          </div>
          
          <div className="text-gray-500 text-xs">
            {new Date(earthquake.time).toLocaleString()}
          </div>
        </div>
      </Popup>
    </CircleMarker>
  );
};

export default EarthquakeMarker;
