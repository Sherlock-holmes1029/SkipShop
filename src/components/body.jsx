import React, { useState, useEffect } from "react";
import axios from "axios";
import dummy from "../assets/dummy.jpg";
import SkipCard from "./SkipCard";
import BottomSheet from "./BottomSheet";

const SkipSizeSelector = () => {
  const [skipSizes, setSkipSizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleSelect = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));
    setSheetOpen(true);
  };
  const handleBack = () => setSheetOpen(false);

  const handleContinue = (skip) => {
    console.log("Continuing with", skip);
    setSheetOpen(false);
  };

  useEffect(() => {
    const fetchSkipSizes = async () => {
      try {
        const response = await axios.get(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
        );

        const transformedData = response.data.map((skip) => {
          const totalPrice =
            skip.price_before_vat + skip.price_before_vat * (skip.vat / 100);
          return {
            id: skip.id,
            size: `${skip.size} Yards`,
            description: `${skip.size} Yard Skip`,
            hirePeriod: `${skip.hire_period_days} day hire period`,
            price: `£${Math.round(totalPrice)}`,
            allowsHeavyWaste: skip.allows_heavy_waste,
            allowedOnRoad: skip.allowed_on_road,
            image: dummy,
          };
        });

        transformedData.sort((a, b) => parseInt(a.size) - parseInt(b.size));

        setSkipSizes(transformedData);
      } catch (err) {
        setError("Failed to load skip sizes. Please try again later.");
        console.error("Error fetching skip sizes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkipSizes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-6xl mx-auto my-6">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 ">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Choose Your Skip Size</h1>
        <p className="text-gray-600">
          Select the skip size that best suits your needs
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skipSizes.map((skip) => (
          <SkipCard
            key={skip.id}
            skip={skip}
            isSelected={skip.id === selectedId}
            onSelect={() => handleSelect(skip.id)}
          />
        ))}
      </div>
       <BottomSheet
        open={sheetOpen}
        skip={skipSizes.find((s) => s.id === selectedId)}
        onBack={handleBack}
        onContinue={handleContinue}
      />
    </div>
  );
};

export default SkipSizeSelector;
