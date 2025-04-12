
import React from "react";

const EmptyMosqueState = () => {
  return (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-2">No mosques found</h3>
      <p className="text-gray-500">Try adjusting your search or filter criteria</p>
    </div>
  );
};

export default EmptyMosqueState;
