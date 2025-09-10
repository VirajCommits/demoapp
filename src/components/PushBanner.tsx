import React from 'react';
import { motion } from 'framer-motion';

interface PushBannerProps {
  message: string;
  onTap: () => void;
}

export const PushBanner: React.FC<PushBannerProps> = ({ message, onTap }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-600 text-white p-4 mx-4 rounded-2xl shadow-lg cursor-pointer hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
      onClick={onTap}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onTap();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label="Tap to open secure link"
    >
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <span className="text-sm">📱</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium leading-relaxed">{message}</p>
        </div>
        <div className="text-white opacity-80">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};
