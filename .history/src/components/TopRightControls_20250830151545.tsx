import { Layers, CalendarDays, Activity, Info } from "lucide-react"; // Importing icons
import { mapLayers, timeRangeOptions, magnitudeOptions, markerInfo } from "../data/data"; // Importing buttons data
import { useState } from "react";

// Props definition for the TopRightControls component
type TopRightControlsProps = {
  activeLayer: MapLayer; // Currently selected map layer
  setActiveLayer: (layer: MapLayer) => void; // Function to update map layer
  activeTimeRange: string; // Currently selected time range
  setActiveTimeRange: (range: string) => void; // Function to update time range
  activeMagnitude: string; // Currently selected magnitude filter
  setActiveMagnitude: (mag: string) => void; // Function to update magnitude filter
}

// Component for the top-right controls of the map
const TopRightControls = ({
  activeLayer, 
  setActiveLayer, 
  activeTimeRange, 
  setActiveTimeRange, 
  activeMagnitude, 
  setActiveMagnitude
}: TopRightControlsProps) => {

  // State to manage dropdown visibility for each control
  const [isLayerSelectorOpen, setIsLayerSelectorOpen] = useState(false);
  const [isTimeRangeOpen, setIsTimeRangeOpen] = useState(false);
  const [isMagnitudeOpen, setIsMagnitudeOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  // Helper function to close all dropdowns at once
  const closeAllDropdowns = () => {
    setIsLayerSelectorOpen(false);
    setIsTimeRangeOpen(false);
    setIsMagnitudeOpen(false);
    setIsInfoOpen(false);
  };

  return (
    <>
      {/* Container for the top-right buttons */}
      <div className="absolute top-4 right-4  2xl:top-8 2xl:right-8 z-10 flex flex-col gap-3">

        {/* ---------------- Map Layer Selector ---------------- */}
        <div className="relative">
          {/* Button to toggle layer selector dropdown */}
          <button
            onClick={() => {
              setIsLayerSelectorOpen(!isLayerSelectorOpen);
              setIsTimeRangeOpen(false);
              setIsMagnitudeOpen(false);
              setIsInfoOpen(false);
            }}
            className="bg-slate-50 hover:bg-slate-100 border border-gray-300 rounded-lg p-3 shadow-lg transition-all duration-200 hover:shadow-xl"
            title="Change map layer"
          >
            <Layers className={`w-5 h-5  ${isLayerSelectorOpen?'text-indigo-600':' text-gray-700 '}`} />
          </button>

          {/* Dropdown menu for map layers */}
          {isLayerSelectorOpen && (
            <div className="absolute top-0 right-12 mt-0 bg-slate-50 border border-gray-200 rounded-lg shadow-lg overflow-hidden min-w-42">
              <div className="px-4 py-2 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-700">Map Layers</span>
              </div>
              {mapLayers.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => {
                    setActiveLayer(layer);
                    setIsLayerSelectorOpen(false);
                  }}
                  className={`w-full cursor-pointer flex items-center gap-3 px-4 py-2 text-left hover:bg-indigo-50 transition-colors duration-150 ${
                    activeLayer === layer 
                      ? 'bg-indigo-50 text-indigo-600' 
                      : 'text-gray-700'
                  }`}
                >
                  <span className="text-sm font-medium">{layer.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ---------------- Time Range Selector ---------------- */}
        <div className="relative">
          {/* Button to toggle time range dropdown */}
          <button
            onClick={() => {
              setIsTimeRangeOpen(!isTimeRangeOpen);
              setIsLayerSelectorOpen(false);
              setIsMagnitudeOpen(false);
              setIsInfoOpen(false);
            }}
            className="bg-slate-50 hover:bg-slate-100 border border-gray-300 rounded-lg p-3 shadow-lg transition-all duration-200 hover:shadow-xl"
            title="Select time range"
          >
            <CalendarDays className="w-5 h-5 text-gray-700" />
          </button>

          {/* Dropdown menu for time ranges */}
          {isTimeRangeOpen && (
            <div className="absolute top-0 right-12 mt-0 bg-slate-50 border border-gray-200 rounded-lg shadow-lg overflow-hidden min-w-42">
              <div className="px-4 py-2 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-700">Time Range</span>
              </div>
              {timeRangeOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setActiveTimeRange(option.id);
                    setIsTimeRangeOpen(false);
                  }}
                  className={`w-full cursor-pointer flex items-center justify-between px-4 py-2 text-left hover:bg-indigo-50 transition-colors duration-150 ${
                    activeTimeRange === option.id 
                      ? 'bg-indigo-50 text-indigo-600' 
                      : 'text-gray-700'
                  }`}
                >
                  <span className="text-sm font-medium">{option.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ---------------- Magnitude Selector ---------------- */}
        <div className="relative">
          {/* Button to toggle magnitude dropdown */}
          <button
            onClick={() => {
              setIsMagnitudeOpen(!isMagnitudeOpen);
              setIsLayerSelectorOpen(false);
              setIsTimeRangeOpen(false);
              setIsInfoOpen(false);
            }}
            className="bg-slate-50 hover:bg-slate-100 border border-gray-300 rounded-lg p-3 shadow-lg transition-all duration-200 hover:shadow-xl"
            title="Select magnitude"
          >
            <Activity className="w-5 h-5 text-gray-700" />
          </button>

          {/* Dropdown menu for magnitude options */}
          {isMagnitudeOpen && (
            <div className="absolute top-0 right-12 mt-0 bg-slate-50 border border-gray-200 rounded-lg shadow-lg overflow-hidden min-w-42">
              <div className="px-4 py-2 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-700">Magnitude</span>
              </div>
              {magnitudeOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setActiveMagnitude(option.id);
                    setIsMagnitudeOpen(false);
                  }}
                  className={`w-full cursor-pointer flex items-center justify-between px-4 py-2 text-left hover:bg-indigo-50 transition-colors duration-150 ${
                    activeMagnitude === option.id 
                      ? 'bg-indigo-50 text-indigo-600' 
                      : 'text-gray-700'
                  }`}
                >
                  <span className="text-sm font-medium">{option.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ---------------- Marker Info Display ---------------- */}
        <div className="relative">
          {/* Button to toggle marker info dropdown */}
          <button
            onClick={() => {
              setIsInfoOpen(!isInfoOpen);
              setIsLayerSelectorOpen(false);
              setIsTimeRangeOpen(false);
              setIsMagnitudeOpen(false);
            }}
            className="bg-slate-50 hover:bg-slate-100 border border-gray-300 rounded-lg p-3 shadow-lg transition-all duration-200 hover:shadow-xl"
            title="Marker information"
          >
            <Info className="w-5 h-5 text-gray-700" />
          </button>

          {/* Dropdown menu showing marker colors and descriptions */}
          {isInfoOpen && (
            <div className="absolute top-0 right-12 mt-0 bg-slate-50 border border-gray-200 rounded-lg shadow-lg overflow-hidden min-w-42">
              <div className="px-4 py-2 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-700">Marker Info</span>
              </div>
              {markerInfo.map((layer) => (
                <div
                  key={layer.color}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700"
                >
                  {/* Display the color associated with each marker */}
                  <div
                    className="rounded-full w-3 h-3"
                    style={{ backgroundColor: layer.color }}
                  ></div>
                  <span className="text-sm font-medium">{layer.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ---------------- Overlay to close dropdowns when clicking outside ---------------- */}
      {(isLayerSelectorOpen || isTimeRangeOpen || isMagnitudeOpen || isInfoOpen) && (
        <div
          className="fixed inset-0 z-5"
          onClick={closeAllDropdowns} // Clicking anywhere outside closes all dropdowns
        />
      )}
    </>
  );
};

export default TopRightControls;
