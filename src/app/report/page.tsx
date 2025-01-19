"use client";
import { useSearchParams } from "next/navigation";

interface Question {
  question: string;
  correct_answer: string;
}

const Report = () => {
  const searchParams = useSearchParams();
  const userAnswers = searchParams.get("userAnswers");
  const questions = searchParams.get("questions");

  const parsedQuestions: Question[] = questions ? JSON.parse(questions) : [];
  const parsedAnswers: string[] = userAnswers ? JSON.parse(userAnswers) : [];

  const totalQuestions = parsedQuestions.length;
  const correctAnswersCount = parsedQuestions.reduce(
    (count, question, index) =>
      parsedAnswers[index] === question.correct_answer ? count + 1 : count,
    0
  );

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-5xl font-semibold">Quiz Report</h1>
      {totalQuestions > 0 ? (
        <p className="px-6 text-2xl font-bold my-8">
          Marks: {correctAnswersCount}/{totalQuestions}
        </p>
      ) : (
        <p>No questions found. Please complete the quiz first.</p>
      )}

      {parsedQuestions.map((question, index) => (
        <div
          key={index}
          className="card mb-2 p-4 rounded-lg w-4/5 shadow-lg text-center"
        >
          <h2 className="font-md text-lg font-semibold">
            {index + 1}. {question.question}
          </h2>
          <p className="text-sm">
            <strong className="text-blue-500">Your Answer:</strong>{" "}
            {parsedAnswers[index] || "Not Answered"}
          </p>
          <p className="text-sm">
            <strong className="text-green-600">Correct Answer:</strong>{" "}
            {question.correct_answer}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Report;
