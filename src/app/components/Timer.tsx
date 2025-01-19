"use client";
import { useEffect, useState } from "react";

// Timer interface to store the duration.
interface TimerProps {
  duration: number;
  onTimeout: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeout }) => {
  // state to track the time left
  const [timeLeft, setTimeLeft] = useState(duration);

  // start timer as soon as the page is mounted
  useEffect(() => {
    if (timeLeft === 0) {
      onTimeout();
      return;
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onTimeout]);

  // formatting the time in HH:MM
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  //render the component
  return (
    <div className="text-2xl text-gray-200 font-semibold">
      Time Left: {formatTime(timeLeft)}
    </div>
  );
};

export default Timer;
