"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Timer from "../components/Timer";
import QuestionCard from "../components/QuestionCard";
import NavigationPanel from "../components/NavigationPanel";

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=15")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Failed to fetch questions");
        }
        const data = response.data.results;
        setQuestions(data);
        setUserAnswers(new Array(data.length).fill("")); // Initialize empty answers
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAnswer = (answer: string) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    setUserAnswers(updatedAnswers);
  };

  const submitQuiz = () => {
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    localStorage.setItem("questions", JSON.stringify(questions));
    router.push("/report");
  };

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-lg">Loading questions...</span>
      </div>
    );
  }

  return (
    <div className="items-center p-6 h-screen text-gray-200">
      <div className="flex justify-between items-center mb-4">
        <Timer duration={30 * 60} onTimeout={submitQuiz} />
        <button
          onClick={submitQuiz}
          className="bg-gradient-to-r from-violet-900 to-blue-600 text-white px-6 py-3 rounded-lg hover:bg-gradient-to-r hover:from-green-900 hover:to-green-600"
        >
          Submit Quiz
        </button>
      </div>
      <QuestionCard
        question={questions[currentQuestionIndex]}
        currentIndex={currentQuestionIndex}
        onAnswer={handleAnswer}
        userAnswer={userAnswers[currentQuestionIndex]}
      />
      <NavigationPanel
        questions={questions}
        currentIndex={currentQuestionIndex}
        userAnswers={userAnswers}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
      />
    </div>
  );
};

export default Quiz;
