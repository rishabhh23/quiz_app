"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const LandingPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const startQuiz = () => {
    if (!email) {
      alert("Please enter your email address.");
      return;
    }
    router.push(`/quiz?email=${email}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Quiz App</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 border rounded mb-4 w-80"
      />
      <button
        onClick={startQuiz}
        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default LandingPage;
