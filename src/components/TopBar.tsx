import React from 'react';
import { Toggle } from './Toggle';

interface TopBarProps {
  isReturningTraveler: boolean;
  onToggleTravelerType: (isReturning: boolean) => void;
  onReset: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ 
  isReturningTraveler, 
  onToggleTravelerType, 
  onReset 
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
      <Toggle
        leftLabel="New traveler"
        rightLabel="Returning traveler"
        isRight={isReturningTraveler}
        onChange={onToggleTravelerType}
      />
      <button
        onClick={onReset}
        className="px-2 py-1 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Reset
      </button>
    </div>
  );
};
