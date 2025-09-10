import React from 'react';
import { motion } from 'framer-motion';

interface BoardingPassCardProps {
  boardingPass: {
    pnr: string;
    name: string;
    seat: string;
    meal: string;
    bags: number;
    flight: string;
    gate: string;
    group: string;
  };
  onSaveToWallet: () => void;
}

export const BoardingPassCard: React.FC<BoardingPassCardProps> = ({ 
  boardingPass, 
  onSaveToWallet 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 mx-4 mb-4"
    >
      {/* Airline Logo Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">BZ</span>
          </div>
          <span className="font-semibold text-gray-800">Breeze Airways</span>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Flight</div>
          <div className="font-semibold text-gray-800">{boardingPass.flight}</div>
        </div>
      </div>
      
      {/* Passenger Info */}
      <div className="mb-4">
        <div className="text-sm text-gray-500">Passenger</div>
        <div className="font-semibold text-gray-800">{boardingPass.name}</div>
      </div>
      
      {/* Flight Details Grid */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <div className="text-sm text-gray-500">Seat</div>
          <div className="font-semibold text-gray-800">{boardingPass.seat}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Gate</div>
          <div className="font-semibold text-gray-800">{boardingPass.gate}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Group</div>
          <div className="font-semibold text-gray-800">{boardingPass.group}</div>
        </div>
      </div>
      
      {/* QR Code */}
      <div className="flex items-center justify-center mb-4">
        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="w-20 h-20 bg-gray-300 rounded flex items-center justify-center">
            <span className="text-xs text-gray-500">QR Code</span>
          </div>
        </div>
      </div>
      
      {/* Save to Wallet Button */}
      <button
        onClick={onSaveToWallet}
        className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      >
        Save to Wallet
      </button>
    </motion.div>
  );
};
