import { Layers, CalendarDays, Activity, Info } from "lucide-react";
import { mapLayers, timeRangeOptions, magnitudeOptions, markerInfo } from "../data/data";
import { useState } from "react";

type TopRightControlsProps = {
  activeLayer: MapLayer;
  setActiveLayer: (layer: MapLayer) => void;
  activeTimeRange: string;
  setActiveTimeRange: (range: string) => void;
  activeMagnitude: string;
  setActiveMagnitude: (mag: string) => void;
}

const TopRightControls = ({
  activeLayer, 
  setActiveLayer, 
  activeTimeRange, 
  setActiveTimeRange, 
  activeMagnitude, 
  setActiveMagnitude
}: TopRightControlsProps) => {

  const [isLayerSelectorOpen, setIsLayerSelectorOpen] = useState(false);
  const [isTimeRangeOpen, setIsTimeRangeOpen] = useState(false);
  const [isMagnitudeOpen, setIsMagnitudeOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const closeAllDropdowns = () => {
    setIsLayerSelectorOpen(false);
    setIsTimeRangeOpen(false);
    setIsMagnitudeOpen(false);
    setIsInfoOpen(false);
  };

  return (
    <>
      {/* Container for the top-right buttons */}
      <div className="absolute top-4 right-4 2xl:top-8 2xl:right-8 z-10 flex flex-col gap-3">

        {/* ---------------- Map Layer Selector ---------------- */}
        <div className="relative">
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
            <Layers className={`w-5 h-5 ${isLayerSelectorOpen ? 'text-indigo-600' : ' text-gray-700'}`} />
          </button>

          {/* Fixed positioned dropdown to prevent zoom scaling */}
          {isLayerSelectorOpen && (
            <div className="fixed top-4 right-16 2xl:top-8 2xl:right-20 bg-slate-50 border border-gray-200 rounded-lg shadow-lg overflow-hidden min-w-42 z-50">
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
            <CalendarDays className={`w-5 h-5 ${isTimeRangeOpen ? 'text-indigo-600' : ' text-gray-700'}`} />
          </button>

          {/* Fixed positioned dropdown */}
          {isTimeRangeOpen && (
            <div className="fixed top-16 right-16 2xl:top-20 2xl:right-20 bg-slate-50 border border-gray-200 rounded-lg shadow-lg overflow-hidden min-w-42 z-50">
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
            <Activity className={`w-5 h-5 ${isMagnitudeOpen ? 'text-indigo-600' : ' text-gray-700'}`} />
          </button>

          {/* Fixed positioned dropdown */}
          {isMagnitudeOpen && (
            <div className="fixed top-28 right-16 2xl:top-32 2xl:right-20 bg-slate-50 border border-gray-200 rounded-lg shadow-lg overflow-hidden min-w-42 z-50">
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
            <Info className={`w-5 h-5 ${isInfoOpen ? 'text-indigo-600' : ' text-gray-700'}`} />
          </button>

          {/* Fixed positioned dropdown */}
          {isInfoOpen && (
            <div className="fixed top-40 right-16 2xl:top-44 2xl:right-20 bg-slate-50 border border-gray-200 rounded-lg shadow-lg overflow-hidden min-w-42 z-50">
              <div className="px-4 py-2 border-b border-gray-200">
                <span className="text-sm font-medium text-gray-700">Marker Info</span>
              </div>
              {markerInfo.map((layer) => (
                <div
                  key={layer.color}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left text-gray-700"
                >
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

      {/* Overlay to close dropdowns when clicking outside */}
      {(isLayerSelectorOpen || isTimeRangeOpen || isMagnitudeOpen || isInfoOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={closeAllDropdowns}
        />
      )}
    </>
  );
};

export default TopRightControls;