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
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl md:text-5xl font-bold mb-6">
        Welcome to the Quiz App
      </h1>
      <h1 className="text-xl md:text-3xl font-bold mb-6">
        Enter Your Email to start
      </h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 bg-[#e2e5e5] border rounded-lg mb-4 w-80 outline-none text-black"
      />
      <button onClick={startQuiz} className="card py-3 px-6 m-5 w-[200px]">
        Start Quiz
      </button>
    </div>
  );
};

export default LandingPage;
