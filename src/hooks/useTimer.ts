import { useState, useEffect, useRef } from 'react';

export const useTimer = (
  initialSeconds: number,
  onTimeUp: () => void,
  isPaused: boolean = false
) => {
  const [remainingTime, setRemainingTime] = useState(initialSeconds);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isPaused || remainingTime <= 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, remainingTime, onTimeUp]);

  const updateRemainingTime = (newTime: number) => {
    setRemainingTime(newTime);
  };

  return { remainingTime, updateRemainingTime };
};
