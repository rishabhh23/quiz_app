"use client";

import { useState, useEffect } from "react";

// Question interface to store the question and the right answer
interface Question {
  question: string;
  correct_answer: string;
}

const Report = () => {
  // storing the selecting user answers
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  //storing the questions
  const [questions, setQuestions] = useState<Question[]>([]);

  //as soon as the page mounts, extract the questions and answers from the local storage
  useEffect(() => {
    const savedUserAnswers = localStorage.getItem("userAnswers");
    const savedQuestions = localStorage.getItem("questions");

    if (savedUserAnswers) {
      setUserAnswers(JSON.parse(savedUserAnswers));
    }

    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  //storing the total questions
  const totalQuestions = questions.length;

  //counting correct answers to display the final marks
  const correctAnswersCount = questions.reduce(
    (count, question, index) =>
      userAnswers[index] === question.correct_answer ? count + 1 : count,
    0
  );

  //component to display the question, correct answer and the user answer
  return (
    <div className="flex flex-col items-center p-6 mb-10">
      <h1 className="text-5xl font-semibold">Quiz Report</h1>

      {/* showing the marks obtained by the user */}
      {totalQuestions > 0 ? (
        <p className="px-6 text-2xl font-bold my-8">
          Marks: {correctAnswersCount}/{totalQuestions}
        </p>
      ) : (
        <p>No questions found. Please complete the quiz first.</p>
      )}

      {/* displaying the question, correct answer and the user selected answer */}
      {questions.map((question: Question, index: number) => (
        <div
          key={index}
          className="card mb-2 p-4 rounded-lg w-4/5 shadow-lg text-center"
        >
          <h2 className="font-md text-lg font-semibold">
            {index + 1}. {question.question}
          </h2>
          <p className="text-sm">
            <strong className="text-blue-500">Your Answer:</strong>{" "}
            {userAnswers[index] || "Not Answered"}
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
