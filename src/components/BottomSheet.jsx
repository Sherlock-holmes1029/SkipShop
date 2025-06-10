import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function BottomSheet({ open, skip, onBack, onContinue }) {
  const root =
    document.getElementById("bottom-sheet") ||
    (() => {
      const el = document.createElement("div");
      el.id = "bottom-sheet";
      document.body.appendChild(el);
      return el;
    })();

  if (!open || !skip) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed bottom-0 inset-x-0 z-50 animate-slideUp
                 bg-green-700 border-t border-[#2A2A2A] p-4"
    >
      <div className="max-w-7xl mx-auto text-white">
        <p className="mb-3 text-xs text-white text-center leading-snug">
          Imagery and information shown throughout this website may not reflect
          the exact shape or size specification, colours may vary, options
          and/or accessories may be featured at additional cost.
        </p>

        <div className="lg:hidden">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium bg-green-500 rounded-2xl p-2 ">
              {skip.size}
            </h3>
            <div>
              <span className="text-xl font-bold text-green-500">
                {skip.price}
              </span>
              <span className="text-sm text-white ml-2">{skip.hirePeriod}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Back button */}
            <button
              onClick={onBack}
              className="w-full px-4 py-2 rounded-md font-medium
             bg-green-500 text-white
             hover:bg-green-600
             focus:outline-none focus:ring-2 focus:ring-green-400
             transition-colors duration-200
             cursor-pointer"
            >
              Back
            </button>

            {/* Continue button */}
            <button
              onClick={() => onContinue(skip)}
              className="w-full px-4 py-2 rounded-md font-medium
             bg-white text-green-600 border-2 border-green-600
             hover:bg-green-600 hover:text-white
             focus:outline-none focus:ring-2 focus:ring-green-400
             transition-colors duration-200
             cursor-pointer flex items-center justify-center gap-2"
            >
              Continue
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-between">
          <div className="flex items-center gap-6">
            <p className="text-sm text-white">{skip.size}</p>
            <div>
              <span className="text-2xl font-bold text-green-500">
                {skip.price}
              </span>
              <span className="text-sm text-white ml-2">
                {skip.hirePeriod} hire
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Back button */}
            <button
              onClick={onBack}
              className="w-full px-4 py-2 rounded-md font-medium
             bg-green-500 text-white
             hover:bg-green-600
             focus:outline-none focus:ring-2 focus:ring-green-400
             transition-colors duration-200
             cursor-pointer"
            >
              Back
            </button>

            {/* Continue button */}
            <button
              onClick={() => onContinue(skip)}
              className="w-full px-4 py-2 rounded-md font-medium
             bg-white text-green-600 border-2 border-green-600
             hover:bg-green-600 hover:text-white
             focus:outline-none focus:ring-2 focus:ring-green-400
             transition-colors duration-200
             cursor-pointer flex items-center justify-center gap-2"
            >
              Continue
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>,
    root
  );
}
