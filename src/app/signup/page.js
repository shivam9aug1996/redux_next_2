"use client";

import Loader from "@/components/Loader";
import { useSignupMutation } from "@/redux/features/Auth/authSlice";
import React, { useState } from "react";

const Signup = () => {
  const [signup, { isSuccess, data: token, isLoading }] = useSignupMutation();

  const [signupStates, setSignupStates] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(
      JSON.stringify({
        name: signupStates.name,
        email: signupStates.email,
        password: signupStates.password,
      })
    );
  };
  return (
    <>
      <div className="flex flex-col mx-8 flex-1 justify-center items-center">
        <h1 className="text-gray-800 font-bold text-xl mb-3">Signup</h1>
        <form
          className="flex flex-col flex-1 w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              minLength={3}
              required={true}
              type={"text"}
              placeholder="Name"
              className="border rounded focus:outline-none py-2 px-3 mb-2 mt-1"
              value={signupStates.name}
              onChange={(e) =>
                setSignupStates({ ...signupStates, name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name">Email</label>
            <input
              required={true}
              placeholder="Email"
              type={"email"}
              className="border rounded focus:outline-none py-2 px-3 mb-2 mt-1"
              value={signupStates.email}
              onChange={(e) =>
                setSignupStates({ ...signupStates, email: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="name">Password</label>
            <input
              minLength={8}
              required={true}
              placeholder="Password"
              type={"password"}
              className="border rounded focus:outline-none py-2 px-3 mb-2 mt-1"
              value={signupStates.password}
              onChange={(e) =>
                setSignupStates({ ...signupStates, password: e.target.value })
              }
            />
          </div>
          <button
            disabled={isLoading}
            className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-slate-700 hover:bg-slate-600 mt-2"
            type="submit"
          >
            {isLoading ? <Loader /> : "Signup"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
