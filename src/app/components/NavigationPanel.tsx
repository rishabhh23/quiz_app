"use client";

import React, { useState } from "react";

// Navigation interface to store the question, current index of the page,
// user answers and setting the question index.
interface NavigationPanelProps {
  questions: { question: string }[];
  currentIndex: number;
  userAnswers: string[];
  setCurrentQuestionIndex: (index: number) => void;
}

const NavigationPanel: React.FC<NavigationPanelProps> = ({
  questions,
  currentIndex,
  userAnswers,
  setCurrentQuestionIndex,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  //code for animation with delay of 0.2 s
  const handleButtonClick = (index: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentQuestionIndex(index);
      setIsAnimating(false);
    }, 200);
  };

  return (
    <div className="flex flex-wrap p-3 mt-5 gap-2 justify-center">
      {questions.slice(0, 15).map((_, index) => (
        <button
          key={index}
          onClick={() => handleButtonClick(index)}
          className={`w-10 h-10 rounded transition-transform duration-300 ${
            currentIndex === index
              ? isAnimating
                ? "bg-blue-500 scale-110"
                : "bg-blue-500"
              : userAnswers[index]
              ? "bg-green-600"
              : "bg-violet-600"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default NavigationPanel;
