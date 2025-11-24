import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(true); // Toggle to enable/disable signup

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const endpoint =
        currentState === "Login"
          ? backendUrl + "/api/user/admin"
          : backendUrl + "/api/user/admin/register";

      const body =
        currentState === "Login"
          ? { email, password }
          : { name, email, password };

      const response = await axios.post(endpoint, body);

      if (response.data.success) {
        setToken(response.data.token);
        toast.success(
          currentState === "Login"
            ? "Login successful."
            : "Account created successfully.",
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="max-w-md px-8 py-6 bg-white rounded-lg shadow-md">
        <div className="mb-3 w-fit">
          <img src={assets.logo} alt="Trendify" />
        </div>
        <h1 className="mb-4 text-2xl font-bold">Admin {currentState}</h1>
        <form onSubmit={onSubmitHandler}>
          {currentState === "Sign Up" && (
            <div className="mb-3 min-w-72">
              <p className="mb-2 text-sm font-medium text-gray-700">Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
                type="text"
                placeholder="John Doe"
                required
              />
            </div>
          )}
          <div className="mb-3 min-w-72">
            <p className="mb-2 text-sm font-medium text-gray-700">Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-gray-700">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          {showSignup && (
            <div className="flex justify-between mt-3 text-sm">
              {currentState === "Login" ? (
                <p
                  className="text-black cursor-pointer hover:underline"
                  onClick={() => setCurrentState("Sign Up")}
                >
                  Create admin account
                </p>
              ) : (
                <p
                  className="text-black cursor-pointer hover:underline"
                  onClick={() => setCurrentState("Login")}
                >
                  Already have an account? Login
                </p>
              )}
            </div>
          )}

          <button
            className="w-full px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-gray-800"
            type="submit"
          >
            {currentState === "Login" ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
