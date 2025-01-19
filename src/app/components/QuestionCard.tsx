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
  onAnswer,
  userAnswer,
}) => {
  const options = [
    ...question.incorrect_answers,
    question.correct_answer,
  ].sort();

  return (
    <div className="flex flex-col my-10 h-[480px] md:h-[400px] w-2/3 mx-auto items-center justify-center card">
      <h2 className="text-xl font-semi-bold mb-10 p-3 text-center">
        {question.question}
      </h2>
      <div className="flex flex-col items-center">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(option)}
            className={`md:w-[360px] w-[240px] block mb-2 px-4 py-2 rounded-xl border-2 hover:bg-gradient-to-r hover:from-green-900 hover:to-green-600 ${
              userAnswer === option
                ? "bg-gradient-to-r from-green-900 to-green-600"
                : "bg-gradient-to-r from-violet-900 to-blue-600"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
