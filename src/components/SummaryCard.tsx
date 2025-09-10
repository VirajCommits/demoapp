import React from 'react';
import { motion } from 'framer-motion';

interface SummaryCardProps {
  seat: string;
  meal: string;
  bags: number;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ seat, meal, bags }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mx-4 mb-4"
    >
      <h3 className="font-semibold text-gray-800 mb-3">Check-in Summary</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Seat:</span>
          <span className="font-medium text-gray-800">{seat}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Meal:</span>
          <span className="font-medium text-gray-800">{meal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Bags:</span>
          <span className="font-medium text-gray-800">{bags}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Name & Document:</span>
          <span className="font-medium text-green-600">✓ Verified</span>
        </div>
      </div>
    </motion.div>
  );
};
