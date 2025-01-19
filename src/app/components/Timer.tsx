"use client";
import { useEffect, useState } from "react";

interface TimerProps {
  duration: number;
  onTimeout: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeout();
      return;
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onTimeout]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="text-lg font-semibold">
      Time Left: {formatTime(timeLeft)}
    </div>
  );
};

export default Timer;
