import React from 'react';
import { motion } from 'framer-motion';
import { TypingAnimation } from './TypingAnimation';

interface ChatBubbleProps {
  message: {
    id: string;
    type: 'assistant' | 'traveler';
    content: string;
    timestamp: number;
  };
  showTyping?: boolean;
  useTypingAnimation?: boolean;
  onTypingComplete?: () => void;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ 
  message, 
  showTyping = false, 
  useTypingAnimation = false, 
  onTypingComplete 
}) => {
  const isAssistant = message.type === 'assistant';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
          isAssistant
            ? 'bg-gray-100 text-gray-800'
            : 'bg-brand-red-light text-gray-800'
        }`}
      >
        {showTyping ? (
          <div className="flex space-x-1">
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
              className="w-2 h-2 bg-gray-400 rounded-full"
            />
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              className="w-2 h-2 bg-gray-400 rounded-full"
            />
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              className="w-2 h-2 bg-gray-400 rounded-full"
            />
          </div>
        ) : (
          <p className="text-sm leading-relaxed">
            {useTypingAnimation && isAssistant ? (
              <TypingAnimation 
                text={message.content} 
                speed={30}
                onComplete={onTypingComplete}
              />
            ) : (
              message.content
            )}
          </p>
        )}
      </div>
    </motion.div>
  );
};
