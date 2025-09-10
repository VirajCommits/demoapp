import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SeatMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSeat: (seat: string) => void;
  selectedSeat?: string | null;
}

export const SeatMapModal: React.FC<SeatMapModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectSeat, 
  selectedSeat 
}) => {
  const rows = ['12', '11', '10', '9'];
  const seats = ['A', 'B', 'C', 'D', 'E', 'F'];
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Choose Your Seat</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
                aria-label="Close seat map"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-2">
              {rows.map((row) => (
                <div key={row} className="flex items-center justify-center space-x-2">
                  <span className="text-sm font-medium text-gray-600 w-6">{row}</span>
                  {seats.map((seat) => {
                    const seatId = `${row}${seat}`;
                    const isSelected = selectedSeat === seatId;
                    const isRecommended = seatId === '12A' || seatId === '11C';
                    
                    return (
                      <button
                        key={seatId}
                        onClick={() => onSelectSeat(seatId)}
                        className={`w-8 h-8 rounded text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : isRecommended
                            ? 'bg-green-100 text-green-800 border border-green-300'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        aria-label={`Seat ${seatId}`}
                      >
                        {seat}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
            
            <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                <span>Recommended</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-600 rounded"></div>
                <span>Selected</span>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Choose {selectedSeat || '12A'}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
