import React from 'react';
import { motion } from 'framer-motion';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-80 h-[600px] bg-black rounded-[2.5rem] p-2 shadow-2xl"
      >
        <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative flex flex-col">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
          
          {/* Screen content */}
          <div className="w-full h-full bg-gray-50 flex flex-col pt-8">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
