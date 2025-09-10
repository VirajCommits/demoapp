import React from 'react';
import { motion } from 'framer-motion';

interface FlightDetailsProps {
  flightNumber: string;
  departureDate: string;
  gate: string;
}

export const FlightDetails: React.FC<FlightDetailsProps> = ({ 
  flightNumber, 
  departureDate, 
  gate 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 mx-3 mb-2"
    >
      {/* Line 1: Route */}
      <div className="text-center text-sm font-semibold text-gray-800 mb-2">
        YYZ → JFK
      </div>
      
      {/* Line 2: Flight info with airplane icon */}
      <div className="flex items-center justify-center space-x-2 mb-2">
        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">✈️</span>
        </div>
        <div className="text-xs text-gray-600">
          {departureDate} • Flight {flightNumber}
        </div>
      </div>
      
    </motion.div>
  );
};
