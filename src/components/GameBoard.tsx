import React, { useState, useEffect } from 'react';
import { Card } from './Card';
import { useGameLogic } from '../hooks/useGameLogic';
import { Timer } from './Timer';
import { Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function GameBoard() {
  const {
    cards,
    flippedCards,
    matchedPairs,
    moves,
    handleCardClick,
    resetGame,
    gameCompleted,
    score
  } = useGameLogic();

  const [currentTime, setCurrentTime] = useState(0);
  const [completionTime, setCompletionTime] = useState(0);
  const [shouldResetTimer, setShouldResetTimer] = useState(false);

  useEffect(() => {
    if (gameCompleted) {
      setCompletionTime(currentTime);
    }
  }, [gameCompleted, currentTime]);

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  const handleReset = () => {
    setShouldResetTimer(true);
    resetGame();
    setCompletionTime(0);
    setCurrentTime(0);
    // Reset the flag after a short delay to allow for future resets
    setTimeout(() => setShouldResetTimer(false), 100);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} minute${minutes !== 1 ? 's' : ''} and ${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`;
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">Memory Game</h2>
            <p className="text-gray-600">Match the pairs to win!</p>
          </div>
          <div className="flex gap-4 items-center">
            <Timer 
              isRunning={!gameCompleted} 
              onTimeUpdate={handleTimeUpdate}
              shouldReset={shouldResetTimer}
            />
            <div className="bg-purple-100 px-4 py-2 rounded-lg">
              <p className="text-purple-800 font-semibold">Moves: {moves}</p>
            </div>
            <div className="bg-indigo-100 px-4 py-2 rounded-lg">
              <p className="text-indigo-800 font-semibold">Score: {score}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {cards.map((card) => (
            <Card
              key={card.id}
              {...card}
              isFlipped={flippedCards.includes(card.id) || card.isMatched}
              onClick={() => handleCardClick(card.id)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {gameCompleted && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="text-center"
            >
              <div className="p-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl shadow-lg text-white mb-6">
                <Trophy className="w-16 h-16 mx-auto mb-6" />
                <h3 className="text-3xl font-bold mb-4">Congratulations!</h3>
                <p className="text-xl mb-2">You completed the game with {moves} moves!</p>
                <p className="text-xl mb-4">Time: {formatTime(completionTime)}</p>
                <p className="text-2xl font-semibold mb-6">Final Score: {score}</p>
                <button
                  onClick={handleReset}
                  className="bg-white text-purple-600 font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-purple-50 transition-colors text-lg"
                >
                  Play Again
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}