"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const LandingPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  // function for alerting the user is no email address is entered
  const notify = () =>
    toast.error("Please enter your email address!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

  //checking if email is entered or not, if yes then proceed to quiz page
  const startQuiz = () => {
    if (!email) {
      notify();
      return;
    }
    router.push(`/quiz?email=${email}`);
  };

  //component for the initial landing page which prompts the user to enter their email address.
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />

      <h1 className="text-2xl md:text-5xl font-bold mb-6">
        Welcome to the Quiz App
      </h1>

      <h1 className="text-xl md:text-3xl font-bold mb-6">
        Enter Your Email to start
      </h1>

      {/* input box for the user to enter their email */}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-2 bg-[#e2e5e5] border rounded-lg mb-4 w-80 outline-none text-black"
      />

      {/* button to start the quiz */}
      <button onClick={startQuiz} className="card py-3 px-6 m-5 w-[200px]">
        Start Quiz
      </button>
    </div>
  );
};

export default LandingPage;
