"use client";
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
  return (
    <div className="flex flex-wrap gap-2">
      {questions.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentQuestionIndex(index)}
          className={`w-10 h-10 rounded ${
            currentIndex === index
              ? "bg-blue-500 text-white"
              : userAnswers[index]
              ? "bg-green-500"
              : "bg-gray-300"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default NavigationPanel;
