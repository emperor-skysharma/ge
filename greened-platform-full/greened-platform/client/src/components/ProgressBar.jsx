import React from 'react';

const ProgressBar = ({ value, max, label }) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
      <div 
        className="bg-green-600 h-2 rounded-full" 
        style={{ width: `${percentage}%`}}
      ></div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>{label}</span>
        <span>{value}/{max}</span>
      </div>
    </div>
  );
};

export default ProgressBar;