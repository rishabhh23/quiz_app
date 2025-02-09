"use client";
// card has a question, index, answer and users answer
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

//render the card component
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
    <div className="flex flex-col my-10 pb-3 w-2/3 mx-auto items-center justify-center card">
      {/* question displays here */}
      <h2 className="text-md md:text-xl font-md mb-6 px-5 pt-5 text-center">
        {question.question}
      </h2>

      {/* display all the choices */}
      <div className="flex flex-col items-center">
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onAnswer(option)}
            className={`md:w-[360px] w-[180px] block mb-2 px-4 py-2 rounded-xl outline-none hover:bg-gradient-to-r hover:from-green-900 hover:to-green-600 ${
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
