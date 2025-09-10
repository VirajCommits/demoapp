import React from 'react';
import { motion } from 'framer-motion';

interface ToggleProps {
  leftLabel: string;
  rightLabel: string;
  isRight: boolean;
  onChange: (isRight: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({ 
  leftLabel, 
  rightLabel, 
  isRight, 
  onChange 
}) => {
  return (
    <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
      <button
        onClick={() => onChange(false)}
        className={`relative px-2 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md ${
          !isRight ? 'text-white' : 'text-gray-600'
        }`}
        aria-pressed={!isRight}
      >
        {!isRight && (
          <motion.div
            layoutId="toggle-bg"
            className="absolute inset-0 bg-blue-600 rounded-md"
            initial={false}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        <span className="relative z-10">{leftLabel}</span>
      </button>
      
      <button
        onClick={() => onChange(true)}
        className={`relative px-2 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md ${
          isRight ? 'text-white' : 'text-gray-600'
        }`}
        aria-pressed={isRight}
      >
        {isRight && (
          <motion.div
            layoutId="toggle-bg"
            className="absolute inset-0 bg-blue-600 rounded-md"
            initial={false}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
        <span className="relative z-10">{rightLabel}</span>
      </button>
    </div>
  );
};
