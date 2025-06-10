// Header.jsx
import React, { useState, useEffect, useRef } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Header = () => {
  const sections = [
    {
      icon: <i className="fas fa-map-marker-alt" />,
      name: "Postcode",
      active: true,
    },
    {
      icon: <i className="fas fa-trash-can" />,
      name: "Waste Type",
      active: true,
    },
    { icon: <i className="fas fa-truck" />, name: "Select Skip", active: true },
    {
      icon: <i className="fas fa-shield-halved" />,
      name: "Permit Check",
      active: false,
    },
    {
      icon: <i className="fas fa-calendar" />,
      name: "Choose Date",
      active: false,
    },
    {
      icon: <i className="far fa-credit-card" />,
      name: "Payment",
      active: false,
    },
  ];
  const useIsMobile = (bp = 640) => {
    const [mobile, setMobile] = useState(() => window.innerWidth < bp);
    useEffect(() => {
      const onResize = () => setMobile(window.innerWidth < bp);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, [bp]);
    return mobile;
  };
  const isMobile = useIsMobile();
  const currentIdx = Math.max(
    0,
    sections.map((s) => s.active).lastIndexOf(true)
  );
  let visibleSteps, firstVisibleIdx;
  if (isMobile) {
    const start = Math.min(
      Math.max(currentIdx - 1, 0),
      Math.max(sections.length - 3, 0)
    );
    firstVisibleIdx = start;
    visibleSteps = sections.slice(start, start + 3);
  } else {
    firstVisibleIdx = 0;
    visibleSteps = sections;
  }
  return (
    <div className="bg-white p-4 pt-11">
      <svg
      className="absolute top-0 left-0 w-full h-20 "
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 48L120 45.35C240 42.5 480 37 720 42.65C960 48 1200 64 1320 72L1440 80V0H0Z"
          fill="#6CEA9A"
        />

        <path
          d="M0 48L120 45.35C240 42.5 480 37 720 42.65C960 48 1200 64 1320 72L1440 80V0H0Z"
          fill="#22c55e"
          transform="translate(1440,0)"
        />
      </svg>

      <div className="relative flex justify-between items-center">
        <div className="absolute top-4 left-10 right-10 h-0.5 bg-gray-200 -z-10" />

        {visibleSteps.map((step, i) => {
          const globalIdx = firstVisibleIdx + i;
          const isCurrent = globalIdx === currentIdx;
          return (
            <div
              key={globalIdx}
              className="relative flex flex-col items-center z-10"
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center mb-2 transition
                  ${
                    isCurrent
                      ? "bg-green-600 text-white ring-4 ring-green-200 scale-110"
                      : step.active
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
              >
                {step.icon}
              </div>
              <span
                className={`text-xs font-medium transition
                  ${
                    isCurrent
                      ? "text-green-600"
                      : step.active
                      ? "text-green-500"
                      : "text-gray-400"
                  }`}
              >
                {step.name}
              </span>
              {globalIdx > 0 && (
                <div
                  className={`absolute top-4 -left-1/2 w-1/2 h-0.5
                    ${step.active ? "bg-green-500" : "bg-gray-200"} -z-20`}
                />
              )}
              {globalIdx < sections.length - 1 && (
                <div
                  className={`absolute top-4 -right-1/2 w-1/2 h-0.5
                    ${
                      sections[globalIdx + 1].active
                        ? "bg-green-500"
                        : "bg-gray-200"
                    } -z-20`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
