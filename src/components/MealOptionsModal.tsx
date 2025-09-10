import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MealOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMeal: (meal: string) => void;
  selectedMeal?: string;
}

export const MealOptionsModal: React.FC<MealOptionsModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectMeal, 
  selectedMeal 
}) => {
  const mealOptions = [
    { id: 'veg', name: 'Vegetarian', emoji: '🥗', description: 'Fresh vegetables and grains' },
    { id: 'non-veg', name: 'Non-Vegetarian', emoji: '🍗', description: 'Chicken or fish options' },
    { id: 'vegan', name: 'Vegan', emoji: '🌱', description: 'Plant-based meals only' },
    { id: 'gluten-free', name: 'Gluten-Free', emoji: '🌾', description: 'No gluten ingredients' },
    { id: 'kosher', name: 'Kosher', emoji: '✡️', description: 'Kosher certified meals' },
    { id: 'halal', name: 'Halal', emoji: '☪️', description: 'Halal certified meals' },
    { id: 'none', name: 'No Meal', emoji: '❌', description: 'Skip meal service' }
  ];

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
            className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">🍽️ Meal Options</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
                aria-label="Close meal options"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-3">
              {mealOptions.map((meal) => (
                <motion.button
                  key={meal.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectMeal(meal.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedMeal === meal.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{meal.emoji}</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{meal.name}</h4>
                      <p className="text-sm text-gray-600">{meal.description}</p>
                    </div>
                    {selectedMeal === meal.id && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (selectedMeal) {
                    onSelectMeal(selectedMeal);
                  }
                  onClose();
                }}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                disabled={!selectedMeal}
              >
                Select Meal
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
