import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  isRunning: boolean;
  onTimeUpdate?: (time: number) => void;
  shouldReset?: boolean;
}

export function Timer({ isRunning, onTimeUpdate, shouldReset }: TimerProps) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (shouldReset) {
      setTime(0);
    }
  }, [shouldReset]);

  useEffect(() => {
    let interval: number;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          onTimeUpdate?.(newTime);
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, onTimeUpdate]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-green-100 px-4 py-2 rounded-lg flex items-center gap-2">
      <Clock className="w-5 h-5 text-green-600" />
      <span className="text-green-800 font-semibold">{formatTime(time)}</span>
    </div>
  );
}