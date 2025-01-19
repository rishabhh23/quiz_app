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
    <div className="flex pt-5 items-center justify-center gap-2 text-gray-200">
      {questions.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentQuestionIndex(index)}
          className={`grid-col-15 md:grid-col-5 md:grid-row-2 w-10 h-10 rounded ${
            currentIndex === index
              ? "bg-blue-500"
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
