import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export function Card({ emoji, isFlipped, isMatched, onClick }: CardProps) {
  return (
    <motion.div
      className="relative w-24 h-24 cursor-pointer"
      whileHover={{ scale: isFlipped ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <motion.div
        className={`absolute w-full h-full rounded-xl transition-all duration-300 transform preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        initial={false}
      >
        <div className="absolute w-full h-full backface-hidden">
          <div className={`w-full h-full rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg ${isMatched ? 'opacity-0' : ''}`}>
            <div className="text-white text-2xl font-bold">?</div>
          </div>
        </div>
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className={`w-full h-full rounded-xl bg-white flex items-center justify-center shadow-lg ${isMatched ? 'opacity-0' : ''}`}>
            <span className="text-4xl">{emoji}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}