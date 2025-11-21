import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // State variables for tracking form values and form mode (Login or Sign Up)
  const [currentState, setCurrentState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useNavigate hook to programmatically navigate to other routes
  const navigate = useNavigate();

  // Form submission handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Define the API endpoint based on the current form state
    const endpoint =
      currentState === "Login"
        ? "http://localhost:3000/api/user/login"
        : "http://localhost:3000/api/user/register";

    // Set the request body based on the current form state
    const body =
      currentState === "Login"
        ? { email, password }
        : { name, email, password };

    // Send the request to the backend API
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    // Handle the response: if login/register fails, show an alert
    if (!data.success) {
      alert(data.message);
      return;
    }

    // If successful, store the JWT token and navigate to the home page
    localStorage.setItem("token", data.token);
    navigate("/");
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-[90%] sm:max-w-96 m-auto mt-14 gap-4"
    >
      {/* Display the form header based on current state */}
      <p className="text-3xl text-center">{currentState}</p>

      {/* Conditionally render 'name' input if it's a "Sign Up" form */}
      {currentState !== "Login" && (
        <input
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2"
        />
      )}

      {/* Email and password inputs */}
      <input
        type="email"
        placeholder="hello@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border px-3 py-2"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border px-3 py-2"
      />

      {/* Link to switch between "Login" and "Sign Up" */}
      <div className="flex justify-between text-sm">
        {currentState === "Login" ? (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Sign Up")}
          >
            Create account
          </p>
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Login")}
          >
            Login here
          </p>
        )}
      </div>

      {/* Submit button text changes based on form state */}
      <button className="bg-black text-white py-2">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
