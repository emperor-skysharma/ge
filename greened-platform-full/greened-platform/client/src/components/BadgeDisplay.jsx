import React from 'react';

const BadgeDisplay = ({ badges }) => {
  if (!badges || badges.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge, index) => (
        <span 
          key={index} 
          className={`badge px-3 py-1 rounded-full text-sm font-medium ${badge.color}`}
        >
          {badge.name}
        </span>
      ))}
    </div>
  );
};

export default BadgeDisplay;