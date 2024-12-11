import { useState, useEffect } from 'react';

const EMOJIS = ['🌟', '🎨', '🎮', '🎯', '🎲', '🎸', '🎭', '🎪'];

interface Card {
  id: number;
  emoji: string;
  isMatched: boolean;
}

export function useGameLogic() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const shuffleCards = () => {
    const shuffledCards = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isMatched: false,
      }));
    setCards(shuffledCards);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(id) || cards[id].isMatched) {
      return;
    }

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstId, secondId] = newFlippedCards;
      
      if (cards[firstId].emoji === cards[secondId].emoji) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isMatched: true }
              : card
          )
        );
        setMatchedPairs((prev) => prev + 1);
        setScore((prev) => prev + 100);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setScore((prev) => Math.max(0, prev - 10));
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setScore(0);
    shuffleCards();
  };

  return {
    cards,
    flippedCards,
    matchedPairs,
    moves,
    score,
    handleCardClick,
    resetGame,
    gameCompleted: matchedPairs === EMOJIS.length,
  };
}