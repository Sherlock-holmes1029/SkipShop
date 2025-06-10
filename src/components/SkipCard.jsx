import React, { useState } from "react";

function SkipCard({ skip, isSelected, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => onSelect(); // delegate to parent

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative bg-white rounded-lg shadow-md overflow-hidden border-2 flex flex-col h-full cursor-pointer
        ${
          isSelected
            ? "border-green-400 shadow-lg"
            : "border-transparent hover:border-green-200"
        }
        transition-all duration-300 ease-in-out transform
        ${isHovered && !isSelected ? "-translate-y-1 scale-[1.02]" : ""}
      `}
    >
      {/* image */}
      <div className="overflow-hidden flex-shrink-0 relative">
        <img
          src={skip.image}
          alt={skip.description}
          className={`w-full h-48 object-cover transition-transform duration-500 ${
            isHovered && !isSelected ? "scale-110" : ""
          }`}
        />
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xl font-bold px-3 py-1 rounded-lg">
          {skip.size.split(" ")[0]} YD
        </div>
      </div>

      {/* hover overlay */}
      {!isSelected && (
        <div
          className={`absolute inset-0 rounded-lg pointer-events-none transition-all duration-300 ${
            isHovered
              ? "opacity-100 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              : "opacity-0"
          }`}
        />
      )}

      {/* card body */}
      <div className="p-4 relative z-10 bg-white flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3
            className={`text-xl font-bold transition-colors duration-300 ${
              isHovered && !isSelected ? "text-green-500" : ""
            }`}
          >
            {skip.size}
          </h3>

          {skip.tagline && (
            <span
              className={`bg-yellow-200 text-yellow-800 text-xs font-bold px-2 py-1 rounded transition-transform duration-300 ${
                isHovered && !isSelected ? "scale-110" : ""
              }`}
            >
              {skip.tagline}
            </span>
          )}
        </div>

        <p
          className={`font-medium transition-colors duration-300 ${
            isHovered && !isSelected ? "text-gray-800" : ""
          }`}
        >
          {skip.description}
        </p>
        <p
          className={`text-gray-500 text-sm mb-3 transition-colors duration-300 ${
            isHovered && !isSelected ? "text-gray-700" : ""
          }`}
        >
          {skip.hirePeriod}
        </p>

        {!skip.allowsHeavyWaste && (
          <p className="text-red-500 text-sm mb-2 animate-pulse">
            * No heavy waste allowed
          </p>
        )}

        {!skip.allowedOnRoad && (
          <p className="text-orange-500 text-sm mb-2 animate-pulse">
            * Not allowed on road
          </p>
        )}
      </div>

      {/* footer */}
      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="flex justify-between items-center">
          <span
            className={`font-bold text-lg transition-colors duration-300 ${
              isHovered && !isSelected ? "text-green-500" : ""
            }`}
          >
            {skip.price}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(skip);
            }}
            className={`${
              isSelected
                ? "bg-green-600 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            } font-medium py-2 px-4 rounded transition-all duration-300 cursor-pointer ${
              isHovered && !isSelected ? "scale-105 shadow-lg" : "shadow-md"
            }`}
          >
            {isSelected ? "Selected" : "Select This Skip"}
          </button>
        </div>
      </div>

      {/* status indicators */}
      {skip.allowedOnRoad && !isSelected && (
        <div className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75" />
      )}

      {isSelected && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white">
          ✓
        </div>
      )}
    </div>
  );
}

export default SkipCard;
