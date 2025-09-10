import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReferenceMenu } from './ReferenceMenu';

interface VoiceInputProps {
  isOpen: boolean;
  onClose: () => void;
  onResult: (text: string) => void;
  context?: 'initial' | 'meal-change' | 'returning';
}

export const VoiceInput: React.FC<VoiceInputProps> = ({ 
  isOpen, 
  onClose, 
  onResult,
  context = 'initial'
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Simulate starting voice recognition
      setTimeout(() => {
        setIsListening(true);
        setTranscript('');
      }, 500);
    } else {
      setIsListening(false);
      setTranscript('');
      setIsProcessing(false);
    }
  }, [isOpen]);

  const handleStartListening = () => {
    setIsListening(true);
    setTranscript('');
    
    // Simulate voice recognition with sample text based on context
    const sampleText = context === 'meal-change' ? 'Yes confirmed' : 
                      context === 'returning' ? 'Change to aisle seat and add one more bag' : 
                      'Front window seat. Veg meal. Two bags.';
    
    setTimeout(() => {
      setTranscript(sampleText);
      setIsListening(false);
      setIsProcessing(true);
      
      // Simulate processing delay
      setTimeout(() => {
        onResult(sampleText);
        onClose();
      }, 1000);
    }, 2000);
  };

  const handleStopListening = () => {
    setIsListening(false);
    setIsProcessing(true);
    
    const fallbackText = context === 'meal-change' ? 'Yes confirmed' : 
                        context === 'returning' ? 'Change to aisle seat and add one more bag' : 
                        'Front window seat. Veg meal. Two bags.';
    
    setTimeout(() => {
      onResult(transcript || fallbackText);
      onClose();
    }, 500);
  };

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
            className="bg-white rounded-2xl p-8 max-w-sm w-full text-center relative mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Reference Menu for returning travelers and new travelers */}
            {(context === 'returning' || context === 'initial') && (
              <ReferenceMenu isVisible={true} />
            )}
            <div className="mb-6">
              {isListening && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-20 h-20 bg-red-500 rounded-full mx-auto flex items-center justify-center mb-4"
                >
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                  </svg>
                </motion.div>
              )}
              
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-20 h-20 bg-blue-500 rounded-full mx-auto flex items-center justify-center mb-4"
                >
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </motion.div>
              )}
              
              {!isListening && !isProcessing && (
                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                  </svg>
                </div>
              )}
            </div>
            
            <h3 className="text-lg font-semibold mb-2">
              {isListening ? 'Listening...' : isProcessing ? 'Processing...' : 'Voice Input'}
            </h3>
            
            <p className="text-gray-600 mb-6">
              {isListening 
                ? 'Speak your preferences now' 
                : isProcessing 
                ? 'Converting speech to text...' 
                : 'Tap to start voice input'
              }
            </p>
            
            {transcript && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-100 rounded-lg p-4 mb-6"
              >
                <p className="text-sm text-gray-700">"{transcript}"</p>
              </motion.div>
            )}
            
            <div className="flex space-x-3">
              {!isListening && !isProcessing && (
                <button
                  onClick={handleStartListening}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  Start Listening
                </button>
              )}
              
              {isListening && (
                <button
                  onClick={handleStopListening}
                  className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                >
                  Stop Listening
                </button>
              )}
              
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
