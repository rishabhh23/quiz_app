"use client";
interface QuestionCardProps {
  question: {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  };
  currentIndex: number;
  onAnswer: (answer: string) => void;
  userAnswer: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  onAnswer,
  userAnswer,
}) => {
  const options = [
    ...question.incorrect_answers,
    question.correct_answer,
  ].sort();

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">
        {currentIndex + 1}. {question.question}
      </h2>
      {options.map((option, idx) => (
        <button
          key={idx}
          onClick={() => onAnswer(option)}
          className={`block mb-2 px-4 py-2 rounded border ${
            userAnswer === option ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default QuestionCard;
