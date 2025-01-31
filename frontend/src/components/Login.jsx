import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../context/provider";
const Login = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const googleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (e) {
      console.log(e);
      alert("Google signin failed");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    if (!email || !password) {
      setMessage("Please fill in all fields.");
    } else if (!passwordRegex.test(password)) {
      setMessage(
        "Password must be 8+ characters, with 1 uppercase, 1 lowercase, and 1 special character"
      );
    } else {
      setMessage(""); 
      await loginUser(email, password);
      navigate("/");
    }
  };
  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm shadow-md rounded-md px-8 pt-6 pb-8 bg-white mb-4">
        <h3 className="font-semibold mb-4 text-xl">Login Please</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="appearance-none focus:outline-none w-full border focus:shadow rounded leading-tight py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="Enter password"
              className="appearance-none focus:outline-none w-full border focus:shadow rounded leading-tight py-2 px-3"
            />
          </div>
          {message && (
            <p className="text-red-500 text-xs italic mb-3">{message}</p>
          )}
          <div>
            <button className="font-bold px-4 py-1 bg-blue-500 hover:bg-slate-700 focus:outline-none text-white rounded">
              Login
            </button>
          </div>
        </form>
        <p className="font-medium mt-4 text-sm align-baseline ">
          Have'nt an account? Please{" "}
          <Link
            to="/register"
            className="underline text-blue-500 hover:text-blue-700"
          >
            Register
          </Link>
        </p>
        <div className="mt-4">
          <button
            className="bg-secondary rounded-md py-2 px-4 text-white w-full flex justify-center items-center gap-2 hover:text-blue-700 focus:outline-none"
            onClick={() => googleSignIn()}
          >
            <FaGoogle />
            Sign in with Google
          </button>
          <p className="text-xs text-center mt-4">
            ©2025 Book Store. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
