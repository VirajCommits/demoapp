import React from 'react';
import { motion } from 'framer-motion';

interface ReferenceMenuProps {
  isVisible: boolean;
}

export const ReferenceMenu: React.FC<ReferenceMenuProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="absolute -top-40 left-0 right-0 mx-auto bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-10 w-64"
    >
      <div className="text-xs text-gray-600 mb-2 font-medium text-center">Quick Reference</div>
      
      <div className="grid grid-cols-3 gap-2 text-xs">
        {/* Seat Options */}
        <div className="text-center">
          <div className="font-semibold text-gray-800 mb-1">Seats</div>
          <div className="text-gray-600">Window</div>
          <div className="text-gray-600">Aisle</div>
          <div className="text-gray-600">Front/Back</div>
        </div>
        
        {/* Meal Options */}
        <div className="text-center">
          <div className="font-semibold text-gray-800 mb-1">Meals</div>
          <div className="text-gray-600">Veg</div>
          <div className="text-gray-600">Non-veg</div>
          <div className="text-gray-600">Vegan</div>
        </div>
        
        {/* Luggage Options */}
        <div className="text-center">
          <div className="font-semibold text-gray-800 mb-1">Bags</div>
          <div className="text-gray-600">1-3 bags</div>
          <div className="text-gray-600">No bags</div>
          <div className="text-gray-600">Extra bag</div>
        </div>
      </div>
      
      <div className="mt-2 pt-2 border-t border-gray-100">
        <div className="text-xs text-gray-500 text-center">
          Just say what you want!
        </div>
      </div>
    </motion.div>
  );
};
