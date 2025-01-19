"use client";

import { useSearchParams } from "next/navigation";

const Report = () => {
  const searchParams = useSearchParams();
  const userAnswers = searchParams.get("userAnswers");
  const questions = searchParams.get("questions");

  const parsedQuestions = questions ? JSON.parse(questions) : [];
  const parsedAnswers = userAnswers ? JSON.parse(userAnswers) : [];

  const totalQuestions = parsedQuestions.length;
  const correctAnswersCount = parsedQuestions.reduce(
    (count: number, question: any, index: number) => {
      if (parsedAnswers[index] === question.correct_answer) {
        return count + 1;
      }
      return count;
    },
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Quiz Report</h1>

      {totalQuestions > 0 ? (
        <p className="mb-4 text-xl font-medium">
          Marks: {correctAnswersCount}/{totalQuestions}
        </p>
      ) : (
        <p>No questions found. Please complete the quiz first.</p>
      )}

      {parsedQuestions.map((question: any, index: number) => (
        <div key={index} className="mb-4">
          <h2 className="font-semibold">
            {index + 1}. {question.question}
          </h2>
          <p>
            <strong>Your Answer:</strong>{" "}
            {parsedAnswers[index] || "Not Answered"}
          </p>
          <p>
            <strong>Correct Answer:</strong> {question.correct_answer}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Report;
