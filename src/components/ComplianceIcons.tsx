import React from 'react';
import { motion } from 'framer-motion';

interface ComplianceIconsProps {
  onIconClick?: (item: string) => void;
}

export const ComplianceIcons: React.FC<ComplianceIconsProps> = ({ onIconClick }) => {
  const restrictedItems = [
    { emoji: '🔫', name: 'Firearms', description: 'Weapons & firearms' },
    { emoji: '💧', name: 'Liquids', description: 'Over 100ml' },
    { emoji: '🔪', name: 'Sharp Objects', description: 'Knives & tools' },
    { emoji: '🔥', name: 'Flammable', description: 'Flammable materials' },
    { emoji: '💥', name: 'Explosives', description: 'Explosive devices' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
    >
      <p className="text-xs text-gray-600 mb-2 font-medium">🚫 Restricted Items:</p>
      <div className="flex flex-wrap gap-2">
        {restrictedItems.map((item, index) => (
          <motion.button
            key={item.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onIconClick?.(item.name)}
            className="flex items-center space-x-1 px-2 py-1 bg-white rounded-full border border-gray-300 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            title={item.description}
          >
            <span className="text-sm">{item.emoji}</span>
            <span className="text-xs text-gray-700">{item.name}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
