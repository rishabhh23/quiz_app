"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Timer from "../components/Timer";
import QuestionCard from "../components/QuestionCard";
import NavigationPanel from "../components/NavigationPanel";

//Question interface to store all the variables from the API.
interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const Quiz = () => {
  //store the questions
  const [questions, setQuestions] = useState<Question[]>([]);

  //storing the index of the question for navigation purposes
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  //storing the selected answers by the user
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const router = useRouter();

  //fetching the API as soon as the page is mounted.
  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=15")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Failed to fetch questions");
        }
        const data = response.data.results;
        setQuestions(data);
        setUserAnswers(new Array(data.length).fill(""));
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

  //when user submits the quiz and it is stored in the local storage for generating the report
  //and go to the report page.
  const submitQuiz = () => {
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
    localStorage.setItem("questions", JSON.stringify(questions));
    router.push("/report");
  };

  //when the API is still fetching then display this loading page.
  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-4 text-lg">Loading...</span>
      </div>
    );
  }

  //component to display the quiz card containing the question and the 4 choices.
  return (
    <div className="items-center p-6 h-screen text-gray-200">
      <div className="flex justify-between items-center mb-4">
        {/* setting the timer for 30 minutes, after this the quiz is automatically submitted */}
        <Timer duration={30 * 60} onTimeout={submitQuiz} />

        {/* button for submitting the quiz before time */}
        <button
          onClick={submitQuiz}
          className="bg-gradient-to-r from-violet-900 to-blue-600 text-white px-6 py-3 rounded-lg hover:bg-gradient-to-r hover:from-green-900 hover:to-green-600"
        >
          Submit Quiz
        </button>
      </div>

      {/* using external component to render the quiz card */}
      <QuestionCard
        question={questions[currentQuestionIndex]}
        currentIndex={currentQuestionIndex}
        onAnswer={handleAnswer}
        userAnswer={userAnswers[currentQuestionIndex]}
      />

      {/* rendering the navigation panel to navigate between questions */}
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
