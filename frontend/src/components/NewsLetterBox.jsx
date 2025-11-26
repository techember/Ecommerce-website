import React, { useState } from "react";

const NewsLetterBox = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (email && validateEmail(email)) {
      setIsSubmitted(true);
    } else {
      alert("Please enter a valid email address");
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEmail("");
  };

  return (
    <div className="relative mt-10 text-center overflow-hidden">
      {/* Original Subscribe Form */}
      <div
        className={`transition-all duration-500 transform ${
          isSubmitted
            ? "opacity-0 -translate-x-full absolute w-full"
            : "opacity-100 translate-x-0"
        }`}
      >
        <p className="text-2xl font-medium text-gray-800">
          Unlock 20% Off | Subscribe Today!
        </p>
        <p className="mt-3 text-gray-400">
          Don't miss out—unlock your savings now by subscribing below!
        </p>
        <div className="flex items-center w-full gap-3 pl-3 mx-auto my-6 border sm:w-1/2">
          <input
            className="w-full outline-none sm:flex-1"
            type="email"
            placeholder="hello@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                onSubmitHandler(e);
              }
            }}
          />
          <button
            onClick={onSubmitHandler}
            className="px-10 py-4 text-xs text-white bg-black hover:bg-gray-800 transition-colors"
          >
            SUBSCRIBE
          </button>
        </div>
      </div>

      {/* Success Screen */}
      <div
        className={`transition-all duration-500 transform ${
          isSubmitted
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full absolute w-full pointer-events-none"
        }`}
      >
        <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl shadow-lg max-w-md mx-auto">
          {/* Success Icon */}
          <div className="mb-4 flex justify-center">
            <div className="bg-green-500 rounded-full p-3">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            🎉 Congratulations!
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            You've Won{" "}
            <span className="font-bold text-green-600 text-2xl">20% OFF</span>!
          </p>

          {/* Discount Code */}
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-600 mb-1">Your Discount Code:</p>
            <p className="text-2xl font-mono font-bold text-black tracking-wider">
              WELCOME20
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Use this code at checkout
            </p>
          </div>

          {/* Confirmation Email */}
          <div className="bg-blue-50 rounded-lg p-3 mb-4">
            <p className="text-sm text-gray-700">
              📧 Confirmation sent to:{" "}
              <span className="font-semibold break-all">{email}</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 flex-col sm:flex-row">
            <button
              onClick={handleReset}
              className="flex-1 px-6 py-3 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Subscribe Another
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText("WELCOME20");
              }}
              className="flex-1 px-6 py-3 text-sm text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
            >
              Copy Code
            </button>
          </div>

          {/* Additional Info */}
          <p className="text-xs text-gray-500 mt-4">
            * Valid for your first purchase only. Expires in 30 days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsLetterBox;
